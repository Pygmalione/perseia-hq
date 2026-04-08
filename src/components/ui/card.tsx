import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Root container for a card UI block that applies size-driven layout and styling variants.
 *
 * Renders a <div> element with `data-slot="card"` and `data-size` set from `size`; merges slot-specific classes with `className` and forwards remaining `div` props to the rendered element.
 *
 * @param size - Controls spacing and layout variants; either `"default"` or `"sm"`. Defaults to `"default"`.
 * @returns A <div> element configured as the card root with the appropriate attributes and classes.
 */
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 transition-transform duration-200 hover:-translate-y-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the header region for a Card with `data-slot="card-header"` and responsive layout classes.
 *
 * The element applies container-query and size-based spacing, grid layout adjustments when child
 * slots like `card-action` or `card-description` are present, and forwards other div props.
 *
 * @returns A `div` element with `data-slot="card-header"` and classes that control header layout, spacing, and responsive sizing.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card title slot used for heading content inside a Card.
 *
 * @returns A `div` element with `data-slot="card-title"` and heading typography classes.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card description slot with muted, small body text styling.
 *
 * @returns A `div` element with `data-slot="card-description"` and muted small-text styling
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * Renders the card's action area positioned on the right and spanning the card's rows.
 *
 * @returns The card action container element.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card's content container.
 *
 * Applies horizontal padding and adjusts padding when the card size is "sm".
 *
 * @returns The rendered `<div>` element with `data-slot="card-content"` and composed class names.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

/**
 * Footer region for a card that provides aligned content, a top border, muted background, rounded bottom corners, and size-aware padding.
 *
 * @returns A `div` element with `data-slot="card-footer"`; padding is reduced when the card's `data-size` is `"sm"`. The element accepts and forwards standard `div` props.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
