import * as React from "react"
import { cn } from "@/lib/utils"

export const Avatar = ({ className, src, fallback }: { className?: string, src?: string, fallback: string }) => (
  <div className={cn("relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full border bg-gray-100", className)}>
    {src ? (
      <img src={src} className="h-full w-full aspect-square object-cover" alt="avatar" />
    ) : (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-xl">
        {fallback}
      </div>
    )}
  </div>
)