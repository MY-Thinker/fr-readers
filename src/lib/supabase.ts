import { createClient } from "@supabase/supabase-js";

/**
 * Supabase 客户端
 *
 * 配置来源：项目根目录 .env
 *   VITE_SUPABASE_URL        - 项目 URL
 *   VITE_SUPABASE_ANON_KEY   - anon public key（前端可公开）
 *
 * 注意：anon key 是设计为前端公开使用的，其权限由 RLS（Row Level Security）策略控制。
 * 真正的写入鉴权应在 Supabase 控制台配置 RLS 策略后实现。
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // 不抛错，避免阻塞页面渲染；具体调用时再给出提示
  console.warn(
    "[Supabase] 缺少环境变量 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY，请在 .env 中配置",
  );
}

export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? "",
  {
    auth: { persistSession: false },
  },
);

/** 视频元数据表名 */
export const VIDEOS_TABLE = "expert_videos";
/** 视频文件存储桶名 */
export const VIDEOS_BUCKET = "expert-videos";
/** 封面图存储桶名 */
export const COVERS_BUCKET = "expert-covers";

/** 是否已配置 Supabase */
export const supabaseReady = Boolean(supabaseUrl && supabaseAnonKey);
