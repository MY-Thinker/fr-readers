import BackHeader from "@/components/BackHeader";
import PageShell from "@/components/PageShell";
import SectionTitle from "@/components/SectionTitle";
import { insightItems, insightTags } from "@/data/insights";
import { BookOpen, Calendar, Database, MessageSquareQuote, Sparkles, User } from "lucide-react";

export default function Insights() {
  return (
    <PageShell>
      <BackHeader
        title="心得展示"
        subtitle="READER INSIGHTS"
        sealChar="心"
      />

      <div className="px-5 py-5 space-y-6">
        {/* 引言 */}
        <section className="scroll-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="seal h-7 px-2 text-[10px]">心 得</span>
            <h2 className="font-serif font-bold text-base text-ink-500">
              千言万卷 · 一城回响
            </h2>
          </div>
          <p className="text-xs text-ink-400 leading-relaxed">
            这里汇聚全区读者的阅读心得，数据与简道云表单实时相通。每一份心得，都是夏日书香在丰润的回响。
          </p>

          {/* 简道云适配说明 */}
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-rouge-50/70 border border-rouge-200/60 px-3 py-2.5">
            <Database size={13} className="text-rouge-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-rouge-600 font-semibold">
                简道云数据适配区（预留）
              </p>
              <p className="text-[10px] text-ink-400 leading-relaxed mt-0.5">
                字段映射：读者姓名 · 推荐书目 · 阅读心得 · 提交时间 · 主题标签
                <br />
                简道云表单数据接入后将自动同步展示。
              </p>
            </div>
          </div>
        </section>

        {/* 心得墙 */}
        <section>
          <SectionTitle
            title="心得墙"
            subtitle="INSIGHT WALL"
            sealChar="墻"
            caption={`当前展示 ${insightItems.length} 条心得`}
          />

          <div className="mt-4">
            {insightItems.length > 0 ? (
              <div className="columns-2 gap-3 space-y-3">
                {insightItems.map((item, idx) => (
                  <InsightCard key={item.id} item={item} index={idx} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </section>

        {/* 提交入口提示 */}
        <section className="scroll-card p-4 text-center">
          <Sparkles size={20} className="mx-auto text-gold-300 mb-1.5" />
          <p className="font-serif font-bold text-sm text-ink-500">
            想要分享你的阅读心得？
          </p>
          <p className="text-[11px] text-ink-400 leading-relaxed mt-1">
            通过『活动任务』中的「好书推荐官」任务，提交你的心得，即可在本页展示。
          </p>
        </section>
      </div>
    </PageShell>
  );
}

interface InsightCardProps {
  item: typeof insightItems[number];
  index: number;
}

function InsightCard({ item, index }: InsightCardProps) {
  const tags = insightTags.filter((t) => item.tagIds.includes(t.id));
  return (
    <article
      className="scroll-card p-3.5 break-inside-avoid mb-3 animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center gap-1.5 text-[10px] text-rouge-500">
        <MessageSquareQuote size={11} />
        <span className="tracking-widest">阅读心得</span>
      </div>
      <h4 className="mt-1.5 font-serif font-bold text-sm text-ink-500 leading-snug">
        《{item.bookTitle}》
      </h4>
      <p className="text-[10px] text-ink-300 mt-0.5">
        {item.bookAuthor} 著
      </p>
      <p className="mt-2 text-[11px] text-ink-400 leading-relaxed line-clamp-5">
        {item.content}
      </p>
      <div className="mt-2.5 pt-2 border-t border-dashed border-ink-200/40 flex items-center justify-between text-[10px] text-ink-300">
        <span className="flex items-center gap-1">
          <User size={10} /> {item.readerName}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={10} /> {item.submittedAt}
        </span>
      </div>
      {tags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((t) => (
            <span
              key={t.id}
              className="inline-flex items-center gap-1 rounded-full bg-jade-50 px-1.5 py-0.5 text-[9px] text-jade-600 border border-jade-200/60"
            >
              <BookOpen size={8} /> {t.name}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border-2 border-dashed border-gold-200/70 bg-xuan-50/60 p-8 text-center">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rouge-50 border border-rouge-200">
        <Database size={22} className="text-rouge-500" />
      </div>
      <p className="font-serif font-bold text-base text-ink-500">
        心得墙正在等待你的回响
      </p>
      <p className="mt-1.5 text-[11px] text-ink-400 leading-relaxed max-w-[260px] mx-auto">
        本区域已按简道云表单字段结构预留适配骨架。
        简道云数据接入后，读者提交的心得将自动在此展示。
      </p>

      {/* 骨架占位 */}
      <div className="mt-5 grid grid-cols-2 gap-3 opacity-50">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gold-200/50 bg-xuan-100/40 p-3 text-left animate-pulse"
          >
            <div className="h-2 w-12 bg-ink-200/40 rounded mb-2" />
            <div className="h-3 w-full bg-ink-200/40 rounded mb-1.5" />
            <div className="h-2 w-2/3 bg-ink-200/30 rounded mb-3" />
            <div className="h-2 w-full bg-ink-200/30 rounded mb-1" />
            <div className="h-2 w-4/5 bg-ink-200/30 rounded" />
          </div>
        ))}
      </div>

      <p className="mt-4 text-[10px] text-ink-200 italic">
        ※ 当前为预留适配区，数据源待接入
      </p>
    </div>
  );
}
