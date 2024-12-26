import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export default class Utils {
  static windowScrollToTop = () => {
    window.scrollTo(0, 0)
  }

  static classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
