import {
  COVERS_BUCKET,
  supabase,
  supabaseReady,
  VIDEOS_BUCKET,
  VIDEOS_TABLE,
} from "@/lib/supabase";
import type { ExpertVideo } from "./types";

/**
 * 专家视频存储（Supabase 版）
 *
 * - 元数据存于数据库表 expert_videos
 * - 视频文件存于 Storage 桶 expert-videos
 * - 封面图存于 Storage 桶 expert-covers
 * - 所有方法均为 async
 *
 * 前置条件：在 Supabase 控制台执行过建表 + 建桶 SQL
 * （见项目根目录 SUPABASE_SETUP.sql）
 *
 * RLS 策略建议：
 * - public read：所有人可读 videos / covers
 * - write：仅鉴权用户可写（这里前端用 anon key，建议在表上开放 insert/delete
 *   或在 AdminVideos 页面通过邮箱密码登录后写入）
 */

/** 数据库行结构 */
interface VideoRow {
  id: string;
  title: string;
  speaker: string;
  video_path: string;
  cover_path: string | null;
  duration: string | null;
  uploaded_at: string;
}

/** 把数据库行映射为前端 ExpertVideo */
function rowToVideo(row: VideoRow): ExpertVideo {
  const { data: videoUrl } = supabase.storage
    .from(VIDEOS_BUCKET)
    .getPublicUrl(row.video_path);

  let cover = "";
  if (row.cover_path) {
    const { data: coverUrl } = supabase.storage
      .from(COVERS_BUCKET)
      .getPublicUrl(row.cover_path);
    cover = coverUrl.publicUrl;
  }

  return {
    id: row.id,
    title: row.title,
    speaker: row.speaker,
    src: videoUrl.publicUrl,
    cover,
    duration: row.duration ?? "—",
    uploadedAt: row.uploaded_at.slice(0, 10),
  };
}

/** 读取所有已上传视频（按上传时间倒序） */
export async function loadVideos(): Promise<ExpertVideo[]> {
  if (!supabaseReady) {
    console.warn("[videoStore] Supabase 未配置，返回空列表");
    return [];
  }
  const { data, error } = await supabase
    .from(VIDEOS_TABLE)
    .select("*")
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error("[videoStore] 读取视频失败:", error.message);
    return [];
  }
  return (data as VideoRow[]).map(rowToVideo);
}

export interface UploadInput {
  title: string;
  speaker: string;
  duration?: string;
  videoFile: File;
  coverFile?: File | null;
}

/** 上传视频 + 封面，并写入元数据。成功返回新视频对象。 */
export async function saveVideo(input: UploadInput): Promise<ExpertVideo> {
  if (!supabaseReady) {
    throw new Error("Supabase 未配置，无法上传");
  }

  const id = `video-${Date.now()}`;
  const videoExt = input.videoFile.name.split(".").pop() || "mp4";
  const videoPath = `${id}.${videoExt}`;

  // 上传视频
  const { error: vErr } = await supabase.storage
    .from(VIDEOS_BUCKET)
    .upload(videoPath, input.videoFile, {
      cacheControl: "3600",
      upsert: false,
      contentType: input.videoFile.type || "video/mp4",
    });
  if (vErr) throw new Error(`视频上传失败: ${vErr.message}`);

  // 上传封面（可选）
  let coverPath: string | null = null;
  if (input.coverFile) {
    const coverExt = input.coverFile.name.split(".").pop() || "jpg";
    coverPath = `${id}.${coverExt}`;
    const { error: cErr } = await supabase.storage
      .from(COVERS_BUCKET)
      .upload(coverPath, input.coverFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: input.coverFile.type || "image/jpeg",
      });
    if (cErr) {
      // 封面失败不阻断，仅提示
      console.warn("[videoStore] 封面上传失败:", cErr.message);
      coverPath = null;
    }
  }

  // 写入元数据
  const row: Omit<VideoRow, "uploaded_at"> & { uploaded_at?: string } = {
    id,
    title: input.title,
    speaker: input.speaker,
    video_path: videoPath,
    cover_path: coverPath,
    duration: input.duration || null,
    uploaded_at: new Date().toISOString(),
  };

  const { error: dbErr } = await supabase.from(VIDEOS_TABLE).insert(row);
  if (dbErr) {
    // 回滚已上传文件
    await supabase.storage.from(VIDEOS_BUCKET).remove([videoPath]);
    if (coverPath) await supabase.storage.from(COVERS_BUCKET).remove([coverPath]);
    throw new Error(`元数据写入失败: ${dbErr.message}`);
  }

  return rowToVideo(row as VideoRow);
}

/** 删除指定 id 的视频（含文件 + 记录） */
export async function deleteVideo(id: string): Promise<void> {
  if (!supabaseReady) return;

  // 查出文件路径
  const { data, error } = await supabase
    .from(VIDEOS_TABLE)
    .select("video_path, cover_path")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`查询失败: ${error.message}`);

  if (data) {
    const row = data as { video_path: string; cover_path: string | null };
    await supabase.storage.from(VIDEOS_BUCKET).remove([row.video_path]);
    if (row.cover_path) {
      await supabase.storage.from(COVERS_BUCKET).remove([row.cover_path]);
    }
  }

  const { error: delErr } = await supabase
    .from(VIDEOS_TABLE)
    .delete()
    .eq("id", id);
  if (delErr) throw new Error(`删除记录失败: ${delErr.message}`);
}
