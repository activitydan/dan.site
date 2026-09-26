import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// The class-name helper every shadcn-style component imports as `@/lib/utils`.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
