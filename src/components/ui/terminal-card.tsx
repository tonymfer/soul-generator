import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface TerminalCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional title bar text (shows window dots when set) */
  title?: string;
  /** Enable hover glow effect */
  glow?: boolean;
}

const TerminalCard = forwardRef<HTMLDivElement, TerminalCardProps>(
  ({ className, title, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-card-bg terminal-border rounded-md",
          "transition-all duration-300",
          glow && "hover:glow-purple hover:border-accent-primary/50",
          className,
        )}
        {...props}
      >
        {title && (
          <div className="flex items-center gap-2 px-4 py-2 border-b border-card-border">
            <span className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-red/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent-yellow/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green/80" />
            </span>
            <span className="text-[10px] text-text-secondary tracking-wider uppercase ml-2">
              {title}
            </span>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    );
  },
);

TerminalCard.displayName = "TerminalCard";

export { TerminalCard };
export type { TerminalCardProps };
