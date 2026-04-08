import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines CSS/Tailwind class values and resolves Tailwind utility conflicts into a single class string.
 *
 * @param inputs - One or more class values (strings, arrays, or conditional objects) to combine.
 * @returns The merged class string with conflicting Tailwind utilities resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
