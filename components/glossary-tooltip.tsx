import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function GlossaryTooltip({
  term,
  className,
  children,
}: {
  term: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "underline decoration-dashed cursor-pointer",
              className,
            )}
          >
            {term}
          </span>
        </TooltipTrigger>
        <TooltipContent align="center" className="max-w-[400px]">
          <div className="border-b border-b-slate-400 py-2 font-semibold w-full">{term}</div>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
