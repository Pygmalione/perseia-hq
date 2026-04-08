"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

/**
 * Renders a styled separator element with configurable orientation and additional props.
 *
 * @param orientation - 'horizontal' or 'vertical'; controls orientation-specific sizing and layout classes.
 * @param className - Additional CSS classes to merge with the component's default styling.
 * @returns The rendered separator JSX element.
 */
function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
