/* eslint-disable @next/next/no-img-element */
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { ChatPopUpComponent } from './chat-pop-up'

import { COMPANY_NAME } from '@/constants/constants'

const currentDate = new Date()
const currentYear = currentDate.getFullYear()

const footer = {
  date: currentYear.toString(),
  COMPANY_NAME,
  description: 'Todos os direitos reservados.',
}

export default function FooterComponent() {
  const location = usePathname()

  return location.startsWith('/dashboard') ? (
    <></>
  ) : location.startsWith('/login') ? (
    <footer className="absolute bottom-0 z-50 w-full pb-2">
      <span className="block text-center text-sm text-color-secondary">
        © {footer.date}{' '}
        <Link href="/" className="hover:underline">
          {footer.COMPANY_NAME}
        </Link>{' '}
        - {footer.description}
      </span>
      <ChatPopUpComponent />
    </footer>
  ) : (
    <footer className="relative z-50 w-full py-2">
      <span className="block text-center text-sm text-color-secondary">
        © {footer.date}{' '}
        <Link href="/" className="hover:underline">
          {footer.COMPANY_NAME}
        </Link>{' '}
        - {footer.description}
      </span>
      <ChatPopUpComponent />
    </footer>
  )
}
