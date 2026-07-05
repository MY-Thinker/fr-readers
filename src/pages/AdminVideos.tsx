import { useEffect, useState } from "react";
import BackHeader from "@/components/BackHeader";
import PageShell from "@/components/PageShell";
import type { ExpertVideo } from "@/data/types";
import { deleteVideo, loadVideos, saveVideo } from "@/data/videoStore";
import { supabaseReady } from "@/lib/supabase";
import {
  AlertCircle,
  CheckCircle2,
  Film,
  Loader2,
  Lock,
  Save,
  Upload,
  Video,
  X,
} from "lucide-react";

/**
 * 管理员视频上传页（Supabase 版）
 *
 * 访问方式：
 * - 不在前端任何公开入口展示链接
 * - 浏览器直接访问 /admin/videos，输入密码后进入
 *
 * 后端：Supabase Storage + Postgres
 * - 视频/封面文件 → 存储桶 expert-videos / expert-covers
 * - 元数据（标题、主讲人、路径、时长）→ 表 expert_videos
 * - 鉴权：anon key + RLS（前端密码仅作为额外保护层）
 */

const ADMIN_PASSWORD = "fr2026admin";

export default function AdminVideos() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  if (!unlocked) {
    return (
      <PageShell>
        <BackHeader
          title="管理员入口"
          subtitle="ADMIN · SIGN IN"
          sealChar="禁"
        />
        <div className="px-5 py-8">
          <div className="scroll-card p-6 max-w-sm mx-auto">
            <div className="mx-auto h-14 w-14 rounded-full bg-rouge-50 flex items-center justify-center mb-4 border-2 border-rouge-200">
              <Lock size={22} className="text-rouge-500" strokeWidth={1.8} />
            </div>
            <h2 className="font-serif font-bold text-center text-base text-ink-500 mb-1">
              管理员登录
            </h2>
            <p className="text-center text-[11px] text-ink-300 mb-5 leading-relaxed">
              本页为后台管理页面，仅限管理员访问
              <br />
              请输入管理员密码
            </p>
            <form onSubmit={handleUnlock} className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError(false);
                }}
                placeholder="请输入管理员密码"
                autoFocus
                className="w-full rounded-lg border border-gold-200 bg-xuan-100/60 px-3 py-2.5 text-sm text-ink-500 placeholder:text-ink-200 focus:outline-none focus:border-rouge-400 focus:ring-2 focus:ring-rouge-200/40 transition-all"
              />
              {authError ? (
                <p className="text-[11px] text-rouge-500 text-center">
                  密码错误，请重试
                </p>
              ) : null}
              <button
                type="submit"
                className="btn-seal w-full"
                disabled={!password}
              >
                <Lock size={14} />
                进入管理后台
              </button>
            </form>
          </div>
        </div>
      </PageShell>
    );
  }

  return <AdminVideoPanel />;
}

function AdminVideoPanel() {
  const [videos, setVideos] = useState<ExpertVideo[]>([]);
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [duration, setDuration] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const refresh = async () => {
    const list = await loadVideos();
    setVideos(list);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
  };

  const handleCoverFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVideo(id);
      await refresh();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "删除失败");
      window.setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !speaker || !videoFile) return;
    setSubmitting(true);
    setErrorMsg("");
    try {
      await saveVideo({
        title,
        speaker,
        duration: duration || undefined,
        videoFile,
        coverFile,
      });
      await refresh();
      setTitle("");
      setSpeaker("");
      setDuration("");
      setVideoFile(null);
      setCoverFile(null);
      setCoverPreview("");
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2400);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "上传失败");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell>
      <BackHeader
        title="管理员 · 视频上传"
        subtitle="ADMIN · VIDEO UPLOAD"
        sealChar="管"
      />

      <div className="px-5 py-5 space-y-6">
        {/* Supabase 状态提示 */}
        {!supabaseReady ? (
          <div className="flex items-start gap-2 rounded-lg bg-rouge-50 border border-rouge-200 px-3 py-2">
            <AlertCircle size={13} className="text-rouge-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-rouge-600 leading-relaxed">
              Supabase 未配置。请在项目根目录 .env 中填写
              <br />
              VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY
            </p>
          </div>
        ) : null}

        {/* 说明 */}
        <section className="scroll-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="seal h-7 px-2 text-[10px]">後 台</span>
            <h2 className="font-serif font-bold text-base text-ink-500">
              优质专家视频上传
            </h2>
          </div>
          <p className="text-xs text-ink-400 leading-relaxed">
            管理员可在此上传优质专家讲座视频，文件存储于 Supabase，上传成功后将展示在『专家讲座』页面视频区。
          </p>
        </section>

        {/* 上传表单 */}
        <section>
          <h3 className="font-serif font-bold text-base text-ink-500 mb-3 flex items-center gap-2">
            <Upload size={16} className="text-rouge-500" />
            上传新视频
          </h3>

          <form onSubmit={handleSubmit} className="scroll-card p-4 space-y-4">
            <Field label="视频标题">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例：雪芹笔下的丰润密码（第一讲）"
                className="w-full rounded-lg border border-gold-200 bg-xuan-100/60 px-3 py-2.5 text-sm text-ink-500 placeholder:text-ink-200 focus:outline-none focus:border-rouge-400 focus:ring-2 focus:ring-rouge-200/40 transition-all"
              />
            </Field>

            <Field label="主讲嘉宾">
              <input
                type="text"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                placeholder="请输入主讲嘉宾姓名"
                className="w-full rounded-lg border border-gold-200 bg-xuan-100/60 px-3 py-2.5 text-sm text-ink-500 placeholder:text-ink-200 focus:outline-none focus:border-rouge-400 focus:ring-2 focus:ring-rouge-200/40 transition-all"
              />
            </Field>

            <Field label="时长（可选）">
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="例：1:23:45"
                className="w-full rounded-lg border border-gold-200 bg-xuan-100/60 px-3 py-2.5 text-sm text-ink-500 placeholder:text-ink-200 focus:outline-none focus:border-rouge-400 focus:ring-2 focus:ring-rouge-200/40 transition-all"
              />
            </Field>

            <Field label="视频文件">
              <label className="flex items-center justify-center gap-2 cursor-pointer rounded-lg border-2 border-dashed border-gold-200 bg-xuan-100/40 px-3 py-5 text-center hover:border-rouge-400 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFile}
                  className="hidden"
                />
                {videoFile ? (
                  <span className="flex items-center gap-2 text-xs text-jade-600 font-semibold">
                    <Video size={14} />
                    {videoFile.name}（{(videoFile.size / 1024 / 1024).toFixed(1)} MB）
                  </span>
                ) : (
                  <span className="flex flex-col items-center gap-1.5">
                    <Upload size={18} className="text-rouge-500" />
                    <span className="text-xs text-ink-400">点击上传视频文件</span>
                    <span className="text-[10px] text-ink-200">支持 mp4 / webm / mov 等格式</span>
                  </span>
                )}
              </label>
            </Field>

            <Field label="封面图（可选）">
              <label className="flex items-center justify-center gap-2 cursor-pointer rounded-lg border-2 border-dashed border-gold-200 bg-xuan-100/40 px-3 py-4 text-center hover:border-rouge-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverFile}
                  className="hidden"
                />
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="封面预览"
                    className="max-h-24 rounded-md border border-gold-200"
                  />
                ) : (
                  <span className="flex items-center gap-2 text-xs text-ink-400">
                    <Film size={14} className="text-rouge-500" />
                    点击上传封面图
                  </span>
                )}
              </label>
            </Field>

            <button
              type="submit"
              disabled={!title || !speaker || !videoFile || submitting}
              className="btn-seal w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  上传中...
                </>
              ) : (
                <>
                  <Save size={16} />
                  保存并发布
                </>
              )}
            </button>

            {saved ? (
              <div className="flex items-center justify-center gap-2 text-jade-600 text-xs animate-fade-in">
                <CheckCircle2 size={14} />
                视频已保存，将在专家讲座页展示
              </div>
            ) : null}

            {errorMsg ? (
              <div className="flex items-start gap-2 text-rouge-600 text-xs leading-relaxed">
                <AlertCircle size={13} className="mt-0.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            ) : null}
          </form>
        </section>

        {/* 已上传视频列表 */}
        <section>
          <h3 className="font-serif font-bold text-base text-ink-500 mb-3 flex items-center gap-2">
            <Video size={16} className="text-rouge-500" />
            已上传视频
            <span className="text-[10px] text-ink-300">
              （共 {videos.length} 条）
            </span>
          </h3>
          {videos.length > 0 ? (
            <ul className="space-y-2">
              {videos.map((v) => (
                <li
                  key={v.id}
                  className="scroll-card p-3 flex items-center gap-3"
                >
                  <div className="h-12 w-16 rounded-md overflow-hidden bg-ink-500 shrink-0">
                    {v.cover ? (
                      <img
                        src={v.cover}
                        alt={v.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <Video size={16} className="text-xuan-100/60" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-serif font-semibold text-ink-500 truncate">
                      {v.title}
                    </p>
                    <p className="text-[10px] text-ink-300 mt-0.5">
                      {v.speaker} · {v.duration} · {v.uploadedAt}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(v.id)}
                    className="h-7 w-7 rounded-full bg-rouge-50 text-rouge-500 flex items-center justify-center hover:bg-rouge-100 transition-colors"
                    aria-label="删除"
                  >
                    <X size={13} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-gold-200/70 bg-xuan-50/40 p-6 text-center">
              <Video size={20} className="mx-auto text-ink-200 mb-1.5" />
              <p className="text-[11px] text-ink-300">
                暂无已上传视频
              </p>
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="block text-[11px] font-serif font-semibold text-ink-500 mb-1.5 tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}
