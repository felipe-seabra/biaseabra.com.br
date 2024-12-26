import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export default class Utils {
  static windowScrollToTop = () => {
    window.scrollTo(0, 0)
  }

  static classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
  }

  static phoneMask = (value: string | undefined): string => {
    if (!value) return ''

    let newValue = value.replace(/\D/g, '')
    newValue = newValue.replace(/(\d{2})(\d)/, '($1) $2')
    newValue = newValue.replace(/(\d)(\d{4})$/, '$1-$2')

    return newValue
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
