"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

/**
 * Render a dialog root element with a `data-slot="dialog"` attribute and forward all props.
 *
 * @param props - Props to pass through to `DialogPrimitive.Root`
 * @returns The rendered `DialogPrimitive.Root` element with forwarded props
 */
function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Renders a dialog trigger element for toggling the dialog.
 *
 * @param props - Props forwarded to the underlying DialogPrimitive.Trigger
 * @returns The rendered DialogPrimitive.Trigger element with `data-slot="dialog-trigger"`
 */
function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Wraps the dialog portal primitive and attaches a `data-slot="dialog-portal"` attribute while forwarding all props.
 *
 * @returns The rendered `DialogPrimitive.Portal` element with `data-slot="dialog-portal"` and any forwarded props
 */
function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * Renders a dialog close control and forwards all received props to the underlying primitive while applying `data-slot="dialog-close"`.
 *
 * @param props - Props forwarded to `DialogPrimitive.Close`
 * @returns The rendered dialog close element
 */
function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Renders the dialog backdrop with default overlay styling and any supplied classes.
 *
 * @param className - Additional CSS classes merged with the component's default overlay styles
 * @returns The backdrop element used as the dialog overlay; includes a `data-slot="dialog-overlay"` attribute
 */
function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders dialog content inside a portal with an overlay and an optional close control.
 *
 * @param showCloseButton - When `true`, includes a positioned close button inside the dialog (default: `true`).
 * @returns The dialog popup element (wrapped in a portal and overlay) ready to be used as dialog content.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

/**
 * Renders a styled header container for a dialog.
 *
 * @param className - Additional CSS classes to merge with the default header layout
 * @returns The dialog header element with default layout and merged classes
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled dialog footer container and optionally includes a close control.
 *
 * The footer applies default layout, border, and background styles and forwards
 * any additional div props. When `showCloseButton` is `true`, a close button
 * is rendered that triggers dialog close behavior.
 *
 * @param showCloseButton - If `true`, render a "Close" button that closes the dialog; defaults to `false`.
 */
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

/**
 * Render the dialog title with default heading typography and a `data-slot="dialog-title"` attribute.
 *
 * @param className - Additional CSS classes to merge with the default title styles
 * @returns The dialog title element with the default classes merged with `className`
 */
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a dialog description element with muted text and enhanced link styling.
 *
 * @returns The dialog description element with default typography and link underline and hover styles; forwards additional props to the underlying primitive.
 */
function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
