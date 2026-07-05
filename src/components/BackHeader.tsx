import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackHeaderProps {
  title: string;
  /** 副标题/章节英文 */
  subtitle?: string;
  /** 印章字 */
  sealChar?: string;
  /** 自定义返回路径 */
  backTo?: string;
}

/**
 * 详情页通用顶部栏
 * - 左侧返回按钮
 * - 中央标题（含印章字与副标题）
 */
export default function BackHeader({
  title,
  subtitle,
  sealChar,
  backTo,
}: BackHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-xuan-100/95 backdrop-blur-md border-b border-gold-200/60">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={handleBack}
          aria-label="返回"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-rouge-500 text-xuan-50 shadow-seal active:translate-y-0.5 active:shadow-none transition-all"
        >
          <ChevronLeft size={22} strokeWidth={2.4} />
        </button>

        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {sealChar ? (
            <span className="seal h-9 w-9 text-base animate-seal-stamp">
              {sealChar}
            </span>
          ) : null}
          <div className="flex flex-col min-w-0">
            <h1 className="font-serif font-bold text-lg text-ink-500 tracking-wide truncate">
              {title}
            </h1>
            {subtitle ? (
              <span className="text-[11px] text-ink-300 tracking-wider truncate">
                {subtitle}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
