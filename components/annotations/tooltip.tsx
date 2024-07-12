import { AnnotationHandler, InlineAnnotationComponent } from "codehike/code"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from "@/components/ui/tooltip"

export const tooltip: AnnotationHandler = {
  name: "tooltip",
  Inline: ({ children, annotation }) => {
    const { query, data } = annotation

    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger className="underline decoration-dashed cursor-pointer">
            {children}
          </TooltipTrigger>
          <TooltipContent
            // className="bg-zinc-900"
            className="font-sans prose dark:prose-invert prose-p:mb-0 max-w-[400px] "
            sideOffset={4}
            align="start"
            alignOffset={-8}
          >
            {data?.children || query}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
}
