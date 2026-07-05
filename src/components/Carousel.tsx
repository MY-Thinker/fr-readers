import { useEffect, useRef, useState } from "react";
import type { CarouselItem } from "@/data/types";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface CarouselProps {
  items: CarouselItem[];
  /** 自动播放间隔（毫秒） */
  interval?: number;
}

/**
 * 顶部通栏轮播
 * - 全宽 16:9
 * - 自动播放 + 手势滑动
 * - 圆点指示器
 * - 点击跳转
 */
export default function Carousel({ items, interval = 5500 }: CarouselProps) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, interval);
    return () => window.clearInterval(t);
  }, [paused, items.length, interval]);

  const goTo = (idx: number) => {
    setActive(((idx % items.length) + items.length) % items.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const delta = touchDeltaX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) goTo(active + 1);
      else goTo(active - 1);
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    window.setTimeout(() => setPaused(false), 1500);
  };

  const handleClick = (item: CarouselItem) => {
    navigate(item.route);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-ink-500 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="活动通栏轮播"
    >
      {/* 轨道 */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {items.map((item, idx) => (
          <Slide
            key={item.id}
            item={item}
            active={idx === active}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>

      {/* 渐变叠层 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-600/80 via-ink-500/30 to-transparent"
      />

      {/* 圆点指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            aria-label={`查看第 ${idx + 1} 屏：${item.title}`}
            onClick={() => goTo(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              idx === active
                ? "w-7 bg-gold-200 shadow-[0_0_8px_rgba(200,169,106,0.7)]"
                : "w-1.5 bg-xuan-100/60 hover:bg-xuan-100",
            )}
          />
        ))}
      </div>
    </section>
  );
}

interface SlideProps {
  item: CarouselItem;
  active: boolean;
  onClick: () => void;
}

function Slide({ item, active, onClick }: SlideProps) {
  return (
    <div
      className="relative w-full shrink-0 aspect-[16/9] cursor-pointer"
      onClick={onClick}
    >
      {/* 图片 */}
      <img
        src={item.image}
        alt={item.title}
        loading={active ? "eager" : "lazy"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out",
          active ? "scale-105" : "scale-100",
        )}
      />

      {/* 色调叠层 */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 mix-blend-multiply",
          item.accent === "rouge" && "bg-rouge-700/35",
          item.accent === "jade" && "bg-jade-700/35",
          item.accent === "ink" && "bg-ink-600/45",
        )}
      />

      {/* 内容 */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 pb-9 z-10">
        <div
          className={cn(
            "transition-all duration-700 ease-out",
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="seal h-8 w-8 text-sm animate-seal-stamp">
              {item.sealChar}
            </span>
            <span className="text-[11px] tracking-[0.25em] text-xuan-100 font-serif">
              {item.subtitle}
            </span>
          </div>
          <h3 className="font-serif font-black text-2xl text-xuan-50 tracking-wider title-stroke leading-tight">
            {item.title}
          </h3>
          <p className="mt-1.5 text-xs text-xuan-100/90 leading-relaxed line-clamp-2 max-w-[90%]">
            {item.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-xuan-50/95 px-3.5 py-1.5 text-xs font-serif font-semibold text-rouge-600 tracking-wider shadow-sm">
            {item.cta}
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
