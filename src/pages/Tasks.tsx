import BackHeader from "@/components/BackHeader";
import PageShell from "@/components/PageShell";
import SectionTitle from "@/components/SectionTitle";
import { jiandaoyunTasks } from "@/data/jiandaoyunLinks";
import type { JiandaoyunTask } from "@/data/types";
import * as Icons from "lucide-react";
import { ExternalLink, Info, ListChecks, Lock } from "lucide-react";

export default function Tasks() {
  return (
    <PageShell>
      <BackHeader
        title="活动任务"
        subtitle="ACTIVITY TASKS"
        sealChar="读"
      />

      <div className="px-5 py-5 space-y-6">
        {/* 引言 */}
        <section className="scroll-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="seal h-7 px-2 text-[10px]">六 题</span>
            <h2 className="font-serif font-bold text-base text-ink-500">
              六大任务 · 一夏共读
            </h2>
          </div>
          <p className="text-xs text-ink-400 leading-relaxed">
            六项阅读任务已就绪，覆盖个人、家庭、社区三个维度。每项任务均通过简道云表单收集，点击下方对应任务卡片即可跳转至填报页面。
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-jade-50/80 border border-jade-200/60 px-3 py-2">
            <Info size={13} className="text-jade-500 shrink-0" />
            <p className="text-[11px] text-jade-600 leading-relaxed">
              任务清单由简道云搭建，点击卡片在新页面打开填报表单。
            </p>
          </div>
        </section>

        {/* 6 个简道云跳转窗口 */}
        <section>
          <SectionTitle
            title="任务清单"
            subtitle="TASK LIST · ×6"
            sealChar="单"
            caption="点击任一任务卡片，二级跳转至简道云表单。"
          />
          <div className="mt-4 grid grid-cols-1 gap-3">
            {jiandaoyunTasks.map((task, idx) => (
              <TaskCard key={task.id} task={task} index={idx} />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

interface TaskCardProps {
  task: JiandaoyunTask;
  index: number;
}

function TaskCard({ task, index }: TaskCardProps) {
  const IconComp = (Icons as unknown as Record<string, Icons.LucideIcon>)[task.icon] ?? ListChecks;
  const enabled = task.url.length > 0;

  const inner = (
    <article
      className="group relative flex items-center gap-3 p-4 rounded-xl bg-xuan-50 border border-gold-200/70 shadow-card overflow-hidden transition-all animate-fade-up"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* 序号水印 */}
      <div
        aria-hidden
        className="absolute -right-2 -top-3 font-serif font-black text-[64px] text-rouge-500/8 leading-none select-none"
      >
        {String(task.index).padStart(2, "0")}
      </div>

      {/* 图标 */}
      <div className="relative shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-rouge-500 to-rouge-700 flex items-center justify-center shadow-seal">
        <IconComp size={20} className="text-xuan-50" strokeWidth={2} />
      </div>

      <div className="flex-1 min-w-0 relative">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-serif font-bold text-base text-ink-500">
            {task.taskName}
          </h4>
          <span className="inline-flex items-center rounded-full bg-jade-50 border border-jade-200/60 px-2 py-0.5 text-[10px] text-jade-600">
            {task.tag}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-ink-400 leading-relaxed line-clamp-2">
          {task.description}
        </p>
      </div>

      {/* 跳转标识 */}
      <div className="shrink-0 self-center">
        {enabled ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-rouge-500 px-3 py-1 text-[11px] text-xuan-50 font-serif font-semibold tracking-wider shadow-seal">
            前往打卡
            <ExternalLink size={12} />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-ink-100/80 px-2 py-0.5 text-[10px] text-ink-300">
            <Lock size={9} />
            待开通
          </span>
        )}
      </div>
    </article>
  );

  if (enabled) {
    return (
      <a
        href={task.url}
        // 同窗口跳转，避免预览 iframe 拦截新窗口
        className="block hover:border-rouge-300 active:translate-y-0.5 transition-all"
      >
        {inner}
      </a>
    );
  }
  return inner;
}
