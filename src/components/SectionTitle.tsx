import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  /** 主标题 */
  title: string;
  /** 副标题 */
  subtitle?: string;
  /** 印章字 */
  sealChar?: string;
  /** 对齐方式 */
  align?: "left" | "center";
  /** 额外类名 */
  className?: string;
  /** 标题下方的装饰描述 */
  caption?: ReactNode;
}

/**
 * 章节标题
 * - 印章字 + 主副标题
 * - 左对齐或居中
 */
export default function SectionTitle({
  title,
  subtitle,
  sealChar,
  align = "left",
  className,
  caption,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        {sealChar ? (
          <span className="seal h-8 w-8 text-sm">{sealChar}</span>
        ) : null}
        <div className="flex flex-col">
          <h2 className="font-serif font-bold text-xl text-ink-500 tracking-wider title-stroke">
            {title}
          </h2>
          {subtitle ? (
            <span className="text-[11px] text-rouge-500 tracking-[0.2em] font-serif">
              {subtitle}
            </span>
          ) : null}
        </div>
      </div>
      {caption ? (
        <div className="text-sm text-ink-300 leading-relaxed mt-1">{caption}</div>
      ) : null}
    </div>
  );
}
