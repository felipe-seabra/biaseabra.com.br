/* eslint-disable @next/next/no-page-custom-font */
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { OG_IMAGE } from '@/database/links'
import { Toaster } from '@/components/ui/toaster'
import { ScrollUpButton } from '@/app/_components/scroll-up-button'
import { CookieConsentComponent } from '@/app/_components/cookie-consent'

import Provider from '@/utils/providers'
import { TooltipProvider } from '@/components/ui/tooltip'

import Header from './_components/header'
import Footer from './_components/footer'
import Analytics from './_components/analytics'

import {
  COMPANY_NAME,
  SITE_NAME,
  COMPANY_TITLE,
  COMPANY_DESCRIPTION,
} from '@/database/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${COMPANY_NAME} | ${COMPANY_TITLE}`,
  description: `${COMPANY_DESCRIPTION}`,
  openGraph: {
    type: 'website',
    locale: 'pt-BR',
    url: `${SITE_NAME}`,
    title: `${COMPANY_NAME} | ${COMPANY_TITLE}`,
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
  return (
    <html lang="pt">
      <head>
        <meta
          name="google-site-verification"
          content="XDxWFYV-iWQl33hU1O9v8XlrMGfzzk4vbxbLc5hsM3U"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Provider>
          <Header />
          <TooltipProvider>{children}</TooltipProvider>
          <Footer />
          <ScrollUpButton />
          <CookieConsentComponent />
          <Toaster />
          <Analytics />
        </Provider>
      </body>
    </html>
  )
}