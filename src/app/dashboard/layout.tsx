import type { Metadata } from 'next'

import { OG_IMAGE } from '@/database/links'

import { DashboardHeaderWeb } from './_components/header-web'
import { DashboardHeaderMobile } from './_components/header-mobile'
import { ThemeProvider } from './_components/theme-provider'

import {
  COMPANY_DESCRIPTION,
  COMPANY_NAME,
  SITE_URL,
} from '@/constants/constants'

const SITE_TITLE = 'Dashboard'

export const metadata: Metadata = {
  title: `${SITE_TITLE} | ${COMPANY_NAME}`,
  description: `${COMPANY_DESCRIPTION}`,
  openGraph: {
    type: 'website',
    locale: 'pt-BR',
    url: `${SITE_URL}/dashboard`,
    title: `${SITE_TITLE} | ${COMPANY_NAME}`,
    description: `${COMPANY_DESCRIPTION}`,
    siteName: `${COMPANY_NAME}`,
    images: [
      {
        url: `${OG_IMAGE}`,
        alt: `${COMPANY_NAME}`,
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardHeaderWeb />
      {/* Mobile */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeaderMobile />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </div>
    </div>
  )
}
