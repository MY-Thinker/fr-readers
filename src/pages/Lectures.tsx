import { useEffect, useState } from "react";
import BackHeader from "@/components/BackHeader";
import PageShell from "@/components/PageShell";
import SectionTitle from "@/components/SectionTitle";
import { lectureData } from "@/data/lectures";
import type { ExpertVideo } from "@/data/types";
import { loadVideos } from "@/data/videoStore";
import {
  CalendarDays,
  Clock,
  MapPin,
  PlayCircle,
  Video,
  Info,
} from "lucide-react";

export default function Lectures() {
  const [videos, setVideos] = useState<ExpertVideo[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 从 Supabase 异步加载管理员上传的视频
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const list = await loadVideos();
        if (!cancelled) {
          setVideos(list);
          if (list.length > 0) setActiveVideoId(list[0].id);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeVideo = videos.find((v) => v.id === activeVideoId);

  return (
    <PageShell>
      <BackHeader
        title="专家阅读指导讲座"
        subtitle="EXPERT LECTURES"
        sealChar="講"
      />

      <div className="px-5 py-5 space-y-6">
        {/* 引言 */}
        <section className="scroll-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="seal h-7 px-2 text-[10px]">名 家</span>
            <h2 className="font-serif font-bold text-base text-ink-500">
              专家引领 · 共读盛夏
            </h2>
          </div>
          <p className="text-xs text-ink-400 leading-relaxed">
            本届活动将邀请阅读领域专家开展指导讲座，讲座信息由主办方在后台维护后呈现，敬请关注后续发布。
          </p>
        </section>

        {/* 嘉宾介绍 */}
        <section>
          <SectionTitle
            title="主讲嘉宾"
            subtitle="SPEAKERS"
            sealChar="賓"
          />
          <div className="mt-4 space-y-3">
            {lectureData.speakers.length > 0 ? (
              lectureData.speakers.map((speaker, idx) => (
                <article
                  key={speaker.id}
                  className="scroll-card p-4 flex gap-3 animate-fade-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    loading="lazy"
                    className="h-16 w-16 rounded-full object-cover border-2 border-gold-200 shadow-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h4 className="font-serif font-bold text-base text-ink-500">
                        {speaker.name}
                      </h4>
                      <span className="text-[10px] text-rouge-500 tracking-widest">
                        {speaker.title}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-jade-500 font-semibold">
                      研究方向 · {speaker.field}
                    </p>
                    <p className="mt-1.5 text-[11px] text-ink-400 leading-relaxed">
                      {speaker.intro}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className="scroll-card p-6 text-center">
                <div className="mx-auto h-14 w-14 rounded-full border-2 border-dashed border-gold-300/70 flex items-center justify-center mb-3">
                  <Info size={22} className="text-gold-400" strokeWidth={1.5} />
                </div>
                <p className="font-serif font-bold text-sm text-ink-500">
                  嘉宾信息待发布
                </p>
                <p className="mt-1.5 text-[11px] text-ink-300 leading-relaxed">
                  专家姓名、头像与简介
                  <br />
                  将由主办方在后台维护后呈现
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 讲座日程 */}
        <section>
          <SectionTitle
            title="讲座日程"
            subtitle="SCHEDULE"
            sealChar="程"
          />
          <div className="mt-4 relative">
            {lectureData.schedule.length > 0 ? (
              <>
                {/* 时间线 */}
                <div
                  aria-hidden
                  className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-rouge-300/60 via-gold-200 to-jade-300/60"
                />
                <ul className="space-y-3">
                  {lectureData.schedule.map((item, idx) => {
                    const speaker = lectureData.speakers.find(
                      (s) => s.id === item.speakerId,
                    );
                    return (
                      <li
                        key={item.id}
                        className="relative pl-10 animate-fade-up"
                        style={{ animationDelay: `${idx * 80}ms` }}
                      >
                        <span className="absolute left-[7px] top-3 h-4 w-4 rounded-full bg-rouge-500 border-2 border-xuan-50 shadow-seal" />
                        <div className="scroll-card p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-xs text-rouge-600 font-semibold">
                              <CalendarDays size={13} />
                              {item.date} · {item.weekday}
                            </div>
                            <span className="text-[10px] text-ink-300 tracking-widest">
                              {item.time}
                            </span>
                          </div>
                          <h4 className="mt-1.5 font-serif font-bold text-sm text-ink-500 leading-snug">
                            {item.topic}
                          </h4>
                          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-400">
                            <span className="flex items-center gap-1">
                              <span className="h-1 w-1 rounded-full bg-gold-300" />
                              {speaker?.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={11} />
                              {item.location}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <div className="scroll-card p-6 text-center">
                <div className="mx-auto h-14 w-14 rounded-full border-2 border-dashed border-gold-300/70 flex items-center justify-center mb-3">
                  <CalendarDays size={22} className="text-gold-400" strokeWidth={1.5} />
                </div>
                <p className="font-serif font-bold text-sm text-ink-500">
                  讲座日程待发布
                </p>
                <p className="mt-1.5 text-[11px] text-ink-300 leading-relaxed">
                  时间、地点、主题等信息
                  <br />
                  将由主办方在后台维护后呈现
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 视频上传窗口（预留） */}
        <section>
          <SectionTitle
            title="专家视频"
            subtitle="EXPERT VIDEOS"
            sealChar="視"
            caption="主办方在后台维护后，优质专家讲座视频将在此处呈现。"
          />

          {/* 视频播放区 */}
          <div className="mt-4 scroll-card overflow-hidden">
            {activeVideo ? (
              <div>
                <video
                  src={activeVideo.src}
                  poster={activeVideo.cover}
                  controls
                  className="w-full aspect-video bg-ink-500"
                />
                <div className="p-4">
                  <h4 className="font-serif font-bold text-base text-ink-500">
                    {activeVideo.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-ink-300">
                    主讲 · {activeVideo.speaker} · 时长 {activeVideo.duration}
                  </p>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-ink-500/95 flex flex-col items-center justify-center text-xuan-100/80 p-6 text-center">
                <PlayCircle size={40} className="text-gold-200/80 mb-2" strokeWidth={1.5} />
                <p className="font-serif text-sm">视频待上传</p>
                <p className="text-[11px] text-xuan-100/60 mt-1 max-w-[220px]">
                  管理员上传后将在此处播放，敬请期待
                </p>
              </div>
            )}
          </div>

          {/* 视频列表 */}
          <div className="mt-3">
            <div className="flex items-center gap-2 mb-2.5">
              <Video size={14} className="text-rouge-500" />
              <span className="text-xs font-serif font-bold text-ink-500 tracking-wider">
                视频列表
              </span>
              <span className="text-[10px] text-ink-300">
                （共 {videos.length} 条）
              </span>
            </div>
            {videos.length > 0 ? (
              <ul className="space-y-2">
                {videos.map((v) => (
                  <li key={v.id}>
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(v.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-xuan-50 border border-gold-200/60 hover:border-rouge-300 transition-colors text-left"
                    >
                      <PlayCircle size={20} className="text-rouge-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-serif font-semibold text-ink-500 truncate">
                          {v.title}
                        </p>
                        <p className="text-[10px] text-ink-300 mt-0.5">
                          {v.speaker} · {v.duration}
                        </p>
                      </div>
                      <span className="text-[10px] text-ink-300">{v.uploadedAt}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-lg border border-dashed border-ink-200/50 bg-xuan-50/40 p-5 text-center">
                <Info size={20} className="mx-auto text-ink-200 mb-1.5" />
                <p className="text-[11px] text-ink-300 leading-relaxed">
                  视频上传窗口已预留
                  <br />
                  管理员上传后此处将展示视频列表
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 底部说明 */}
        <section className="scroll-card p-4">
          <div className="flex items-start gap-2 text-[11px] text-ink-400 leading-relaxed">
            <Clock size={14} className="text-rouge-500 mt-0.5 shrink-0" />
            <p>
              讲座信息由主办方在后台维护后呈现。视频资料将于活动结束后陆续在本页面上线，敬请关注。
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
