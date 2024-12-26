/* eslint-disable @next/next/no-img-element */
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { ChatPopUp } from './chat-pop-up'
import Image from 'next/image'
import { logoWhite } from '@/images'
import { COMPANY_NAME, linkWhatsapp } from '@/database/constants'
import { MapPin } from 'lucide-react'

const currentDate = new Date()
const currentYear = currentDate.getFullYear()

const footer = {
  date: currentYear.toString(),
  COMPANY_NAME,
  description: 'Todos os direitos reservados.',
}

export default function Footer() {
  const location = usePathname()

  return location === '/' || location.startsWith('/login') ? (
    <footer className="absolute bottom-0 z-50 w-full pb-2">
      <span className="block text-center text-sm text-criarte-secundary">
        © {footer.date}{' '}
        <Link href="/" className="hover:underline">
          {footer.COMPANY_NAME}{' '}
        </Link>
        - {footer.description}
      </span>
      <ChatPopUp />
    </footer>
  ) : location.startsWith('/dashboard') ? (
    <></>
  ) : (
    <footer className="bg-criarte-background px-4 shadow">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="flex flex-wrap items-center justify-center sm:justify-between">
          <Link
            href="/"
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <Image
              src={logoWhite}
              height={64}
              className="h-16"
              alt="Colégio Criarte Logo"
            />
          </Link>

          {/* Navbar */}
          <ul className="mb-6 flex flex-wrap items-center gap-6 text-sm font-medium text-criarte-text sm:mb-0">
            <li>
              <Link href="/" className="hover:underline">
                Início
              </Link>
            </li>
            <li>
              <Link href="cursos" className="hover:underline">
                Cursos
              </Link>
            </li>
            <li>
              <Link href="politica" className="hover:underline">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="contato" className="hover:underline">
                Contato
              </Link>
            </li>
          </ul>
        </div>
        {/* Navbar */}

        {/* Contato */}
        <ul className="mb-6 flex flex-wrap items-center gap-4 text-sm font-medium text-criarte-text sm:mb-0 md:justify-end">
          <li>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 hover:text-criarte-secundary"
            >
              <i className="bx bx-phone text-lg" /> (18) 3222-2682
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 hover:text-criarte-secundary"
            >
              <i className="bx bx-envelope text-lg" />{' '}
              contato@criarteprofissionalizante.com.br
            </Link>
          </li>
          <li>
            <Link
              href={linkWhatsapp}
              target="_blank"
              className="flex items-center justify-center gap-2 hover:text-green-300"
            >
              <i className="bx bxl-whatsapp text-lg" /> (18) 98102-9767
            </Link>
          </li>
        </ul>
        {/* Contato */}

        {/* Localização */}
        <ul className="mb-6 mt-6 flex flex-wrap items-center gap-4 text-sm font-medium text-criarte-text sm:mb-0 md:justify-end">
          <li>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-2 hover:text-green-300"
            >
              <MapPin size={24} />
              R. Antônio Furtado de Miranda, 40 - Vila Industrial, Pres.
              Prudente - SP, 19013-370
            </Link>
          </li>
        </ul>
        {/* Contato */}

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-center text-sm text-gray-500">
          © {footer.date}{' '}
          <Link href="/" className="hover:underline">
            {COMPANY_NAME}{' '}
          </Link>
          - {footer.description}
        </span>
      </div>
      <ChatPopUp />
    </footer>
  )
}
