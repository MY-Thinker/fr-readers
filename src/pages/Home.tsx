import { Link } from "react-router-dom";
import Carousel from "@/components/Carousel";
import PageShell from "@/components/PageShell";
import SectionTitle from "@/components/SectionTitle";
import { carouselItems } from "@/data/carousel";
import { activityInfo } from "@/data/activity";
import { caoXueqinCulture } from "@/data/caoXueqin";
import { localReaders } from "@/data/localReaders";
import { BookOpen, ListChecks, MessageSquareQuote, MapPin, Calendar, Feather, Quote } from "lucide-react";

const quickEntries = [
  {
    route: "/lectures",
    title: "专家讲座",
    subtitle: "名家开卷",
    icon: BookOpen,
    sealChar: "講",
  },
  {
    route: "/tasks",
    title: "活动任务",
    subtitle: "六题共读",
    icon: ListChecks,
    sealChar: "读",
  },
  {
    route: "/insights",
    title: "心得展示",
    subtitle: "一城回响",
    icon: MessageSquareQuote,
    sealChar: "心",
  },
];

export default function Home() {
  return (
    <PageShell>
      {/* 1. 顶部通栏轮播 */}
      <Carousel items={carouselItems} />

      {/* 2. 活动主题区 */}
      <section className="relative px-5 pt-6 pb-5">
        {/* 主标题 */}
        <div className="flex items-start gap-3">
          {/* 竖排印章 */}
          <div className="flex flex-col gap-1 pt-1">
            <span className="seal h-7 w-7 text-[11px] animate-seal-stamp">书</span>
            <span className="seal h-7 w-7 text-[11px] bg-jade-400 animate-seal-stamp" style={{ animationDelay: "120ms" }}>
              香
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] tracking-[0.3em] text-rouge-500 font-serif mb-1 animate-fade-up">
              {activityInfo.edition} · {activityInfo.year}
            </p>
            <h1 className="font-serif font-black text-[28px] leading-tight text-ink-500 tracking-wider title-stroke animate-fade-up" style={{ animationDelay: "80ms" }}>
              {activityInfo.title}
            </h1>
            <p className="mt-2 font-brush text-lg text-rouge-600 animate-fade-up" style={{ animationDelay: "160ms" }}>
              {activityInfo.subtitle}
            </p>
          </div>
        </div>

        {/* 活动信息 */}
        <div className="mt-4 scroll-card p-4 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <div className="flex items-center gap-2 text-xs text-ink-400 mb-2">
            <Calendar size={14} className="text-rouge-500" />
            <span>{activityInfo.period}</span>
          </div>
          <p className="text-sm text-ink-400 leading-relaxed">
            {activityInfo.intro}
          </p>
          <div className="mt-3 pt-3 border-t border-dashed border-ink-200/40 text-[11px] text-ink-300 leading-relaxed">
            <span className="text-rouge-500 font-semibold">主办：</span>
            {activityInfo.host}
          </div>
        </div>
      </section>

      {/* 3. 活动参与入口 */}
      <section className="px-5 pb-6">
        <SectionTitle
          title="活动入口"
          subtitle="QUICK ENTRY"
          sealChar="入"
          caption="点击下方任一入口，开启你的夏日书香之旅。"
        />
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {quickEntries.map((entry, idx) => {
            const Icon = entry.icon;
            return (
              <Link
                key={entry.route}
                to={entry.route}
                className="group relative flex flex-col items-center gap-2 p-3.5 pt-4 rounded-xl bg-xuan-50 border border-gold-200/70 shadow-card overflow-hidden animate-fade-up hover:border-rouge-300 transition-all active:translate-y-0.5"
                style={{ animationDelay: `${280 + idx * 80}ms` }}
              >
                <div
                  aria-hidden
                  className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-rouge-500/8 group-hover:bg-rouge-500/12 transition-colors"
                />
                <span className="seal h-9 w-9 text-sm">{entry.sealChar}</span>
                <Icon size={18} className="text-rouge-500" strokeWidth={2} />
                <div className="text-center">
                  <p className="font-serif font-bold text-sm text-ink-500 tracking-wider">
                    {entry.title}
                  </p>
                  <p className="text-[10px] text-ink-300 tracking-widest mt-0.5">
                    {entry.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. 曹雪芹文化专栏 */}
      <section className="px-5 pb-6">
        <SectionTitle
          title="曹雪芹文化"
          subtitle="CAO XUEQIN"
          sealChar="芹"
          caption={caoXueqinCulture.brief}
        />

        {/* 公园卡片 */}
        <div className="mt-4 scroll-card overflow-hidden animate-fade-up">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={caoXueqinCulture.park.image}
              alt={caoXueqinCulture.park.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-600/70 via-ink-500/10 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin size={12} className="text-gold-200" />
                <span className="text-[10px] text-xuan-100 tracking-widest">
                  {caoXueqinCulture.park.location}
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-xuan-50 tracking-wider title-stroke">
                {caoXueqinCulture.park.name}
              </h3>
            </div>
            <span className="seal absolute top-3 right-3 h-9 w-9 text-sm">
              芹
            </span>
          </div>
          <div className="p-4">
            <p className="text-sm text-ink-400 leading-relaxed">
              {caoXueqinCulture.park.description}
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-1.5">
              {caoXueqinCulture.park.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-1.5 text-[11px] text-ink-300"
                >
                  <span className="h-1 w-1 rounded-full bg-rouge-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 诗文三联 */}
        <div className="mt-3 space-y-3">
          {caoXueqinCulture.poetry.map((poem, idx) => (
            <article
              key={poem.title}
              className="scroll-card p-4 animate-fade-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Feather size={14} className="text-rouge-500" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink-500">
                      {poem.title}
                    </h4>
                    <p className="text-[10px] text-ink-300 tracking-widest">
                      {poem.author}
                    </p>
                  </div>
                </div>
                <span className="seal h-7 px-1.5 text-[10px]">詩</span>
              </div>
              <div className="mt-3 pl-3 border-l-2 border-rouge-300/60">
                <p className="font-brush text-base text-ink-500 leading-relaxed whitespace-pre-line">
                  {poem.content}
                </p>
              </div>
              <p className="mt-2 text-[11px] text-ink-300 leading-relaxed italic">
                {poem.annotation}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. 本土读书名人 */}
      <section className="px-5 pb-6">
        <SectionTitle
          title="本土读书名人"
          subtitle="LOCAL READERS"
          sealChar="讀"
          caption="他们从丰润走出，又把书香带回丰润。听他们讲述阅读的故事。"
        />
        <div className="mt-4 space-y-3">
          {localReaders.map((reader, idx) => (
            <article
              key={reader.id}
              className="scroll-card p-4 flex gap-3 animate-fade-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="relative shrink-0">
                <img
                  src={reader.avatar}
                  alt={reader.name}
                  loading="lazy"
                  className="h-16 w-16 rounded-full object-cover border-2 border-gold-200 shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 seal h-6 w-6 text-[9px]">
                  薦
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h4 className="font-serif font-bold text-base text-ink-500">
                    {reader.name}
                  </h4>
                  <span className="text-[10px] text-rouge-500 tracking-widest">
                    {reader.title}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-ink-400 leading-relaxed line-clamp-2">
                  {reader.bio}
                </p>
                <div className="mt-2 flex items-start gap-1 text-[11px] text-jade-500 italic">
                  <Quote size={11} className="mt-0.5 shrink-0" />
                  <span className="line-clamp-1">{reader.quote}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {reader.recommendedBooks.map((book) => (
                    <span
                      key={book.title}
                      className="inline-flex items-center gap-1 rounded-full bg-jade-50 px-2 py-0.5 text-[10px] text-jade-600 border border-jade-200/60"
                    >
                      <BookOpen size={9} />
                      {book.title}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. 页脚 */}
      <footer className="px-5 pb-8 pt-3">
        <div className="ink-divider" />
        <div className="text-center space-y-2">
          <p className="font-brush text-base text-rouge-500">
            {activityInfo.motto}
          </p>
          <div className="text-[10px] text-ink-300 leading-relaxed space-y-0.5">
            <p className="font-semibold text-ink-400">承办单位</p>
            {activityInfo.organizers.map((org) => (
              <p key={org}>{org}</p>
            ))}
          </div>
          <p className="text-[10px] text-ink-200/80 tracking-widest pt-1">
            © 2026 丰润区全民阅读活动领导小组
          </p>
        </div>
      </footer>
    </PageShell>
  );
}
