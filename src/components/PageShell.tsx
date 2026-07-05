import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * 移动端页面外壳
 * - 最大宽度 480px 居中
 * - 提供宣纸纹理与左右水墨留白（桌面端）
 */
export default function PageShell({ children, className }: PageShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 50);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-[480px] min-h-screen bg-xuan-100/70 backdrop-blur-[2px] shadow-[0_0_40px_rgba(31,26,23,0.08)] transition-opacity duration-700",
          visible ? "opacity-100" : "opacity-0",
          className,
        )}
      >
        {/* 顶部装饰：竹叶纹 */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rouge-500 via-gold-300 to-jade-400"
        />
        {children}
        {/* 底部装饰：水墨 */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-xuan-200/60 to-transparent"
        />
      </div>
    </div>
  );
}
