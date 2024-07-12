import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

export function GlossaryExternalLink({
  className,
  children,
  ...rest
}: {
  children: React.ReactNode
  className?: string
  rest: React.HTMLAttributes<HTMLAnchorElement>
}) {
  return (
    <a
      {...rest}
      className={cn("text-zinc-600 text-xs font-semibold", className)}
    >
      <span className="inline-flex items-center leading-3">
        {children} <ExternalLink className="inline h-3" />
      </span>
    </a>
  )
}
