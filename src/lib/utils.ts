import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]) {
  return inputs.filter(Boolean).map(i => (typeof i === 'object' ? Object.keys(i!).filter(k => (i as any)[k]).join(' ') : i)).join(' ')
}
