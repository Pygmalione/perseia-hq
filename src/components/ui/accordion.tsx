"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

/**
 * Renders a styled accordion root with default layout classes and a data-slot attribute.
 *
 * @param className - Additional class names to merge with the default "flex w-full flex-col"
 * @returns The accordion root element with merged classes and forwarded props
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

/**
 * Renders an accordion item with a bottom border on all but the last item and accepts additional CSS classes.
 *
 * @param className - Optional additional CSS classes to merge with the default `"not-last:border-b"`.
 * @param props - Remaining props forwarded to the underlying `AccordionPrimitive.Item` component.
 * @returns The rendered accordion item element.
 */
function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

/**
 * Renders an accordion trigger wrapped in a header, displaying chevron icons that toggle visibility based on expansion state and forwarding all trigger props.
 *
 * The trigger includes `data-slot="accordion-trigger"` and each icon uses `data-slot="accordion-trigger-icon"` so consumers can target them. The down chevron is visible when collapsed and the up chevron when expanded.
 *
 * @param className - Additional CSS classes to merge with the component's default classes
 * @param children - Content rendered inside the trigger
 * @returns The rendered accordion trigger element
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * Renders an accordion panel that animates open and closed and wraps children in a styled inner container.
 *
 * @param className - Additional CSS classes merged into the inner content container
 * @param children - Content rendered inside the panel
 * @returns The rendered AccordionPrimitive.Panel element
 */
function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
