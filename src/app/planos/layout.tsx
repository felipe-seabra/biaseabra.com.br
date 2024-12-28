import type { Metadata } from 'next'

import { OG_IMAGE } from '@/database/links'

import {
  COMPANY_NAME,
  SITE_NAME,
  COMPANY_TITLE,
  COMPANY_DESCRIPTION,
} from '@/constants/constants'

export const metadata: Metadata = {
  title: `Planos | ${COMPANY_NAME} | ${COMPANY_TITLE}`,
  description: `${COMPANY_DESCRIPTION}`,
  openGraph: {
    type: 'website',
    locale: 'pt-BR',
    url: `${SITE_NAME}/planos`,
    title: `Planos | ${COMPANY_NAME} | ${COMPANY_TITLE}`,
    description: `${COMPANY_DESCRIPTION}`,
    siteName: `${COMPANY_NAME} | ${COMPANY_TITLE}`,
    images: [
      {
        url: `${OG_IMAGE}`,
        alt: `${COMPANY_NAME} | ${COMPANY_TITLE}`,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main>{children}</main>
}
