"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

/**
 * Renders a sheet root element that forwards all received props and sets `data-slot="sheet"`.
 *
 * @param props - Props forwarded to the underlying Sheet primitive root.
 * @returns The rendered sheet root element.
 */
function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

/**
 * Renders a sheet trigger element and forwards all received props to the underlying primitive while adding a `data-slot="sheet-trigger"` attribute.
 *
 * @param props - Props to pass through to `SheetPrimitive.Trigger`
 * @returns The rendered trigger element for toggling the sheet
 */
function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

/**
 * Renders the sheet's close trigger by forwarding props to the underlying Close primitive.
 *
 * @returns The Close primitive element with `data-slot="sheet-close"` and any forwarded props
 */
function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

/**
 * Renders a sheet portal element used to host sheet content outside the DOM hierarchy.
 *
 * @param props - Props forwarded to the underlying Portal primitive
 * @returns The rendered portal element with `data-slot="sheet-portal"`
 */
function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

/**
 * Renders the sheet backdrop overlay covering the viewport and applying entrance/exit opacity transitions.
 *
 * @param className - Additional CSS classes merged with the component's default backdrop classes.
 * @returns The backdrop element with fixed fullscreen positioning, opacity transition classes, and optional backdrop-blur styling.
 */
function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

const sheetContentVariants = cva(
  "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 h-auto border-b data-ending-style:translate-y-[-2.5rem] data-starting-style:translate-y-[-2.5rem]",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-ending-style:translate-x-[2.5rem] data-starting-style:translate-x-[2.5rem] sm:max-w-sm",
        bottom:
          "inset-x-0 bottom-0 h-auto border-t data-ending-style:translate-y-[2.5rem] data-starting-style:translate-y-[2.5rem]",
        left:
          "inset-y-0 left-0 h-full w-3/4 border-r data-ending-style:translate-x-[-2.5rem] data-starting-style:translate-x-[-2.5rem] sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

/**
 * Renders the sheet's panel content inside a portal with an overlay and side-specific positioning and animations.
 *
 * @param side - Which screen edge the sheet appears from: `"top"`, `"right"`, `"bottom"`, or `"left"`. Defaults to `"right"`.
 * @param showCloseButton - Whether to render an internal close button. Defaults to `true`.
 * @returns The rendered sheet content element.
 */
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(sheetContentVariants({ side }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

/**
 * Renders a sheet header container with default vertical layout, spacing, and padding.
 *
 * @param className - Additional CSS class names to merge with the default header classes
 * @param props - Additional props spread onto the underlying `div` element
 * @returns The header `div` element with `data-slot="sheet-header"` and merged classes
 */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

/**
 * Footer container for a sheet that sticks to the bottom and provides padding and vertical spacing.
 *
 * Merges any provided `className` with default layout styles and forwards extra `div` props.
 *
 * @param className - Additional CSS class names to merge with the footer's default classes
 * @param props - Additional props passed through to the rendered `div`
 * @returns The rendered sheet footer element
 */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

/**
 * Renders a sheet title with default heading typography and a `data-slot="sheet-title"` attribute.
 *
 * @param className - Additional CSS classes to merge with the default styles.
 * @returns The sheet title element with merged classes and the `data-slot="sheet-title"` attribute.
 */
function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the sheet's descriptive text with default muted styling.
 *
 * @param className - Optional additional CSS classes to merge with the default muted text styles
 * @returns A `SheetPrimitive.Description` element with `data-slot="sheet-description"` and merged classes
 */
function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
