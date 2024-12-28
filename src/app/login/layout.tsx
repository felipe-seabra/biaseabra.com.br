import type { Metadata } from 'next'

import { OG_IMAGE } from '@/database/links'
import { COMPANY_NAME, SITE_URL } from '@/constants/constants'

const SITE_TITLE = 'Login'
const SITE_DESCRIPTION = `Faça o login para acessar o painel de controle de ${COMPANY_NAME} e gerenciar suas atividades`

export const metadata: Metadata = {
  title: `${SITE_TITLE} | ${COMPANY_NAME}`,
  description: `${SITE_DESCRIPTION}`,
  openGraph: {
    type: 'website',
    locale: 'pt-BR',
    url: `${SITE_URL}/login`,
    title: `${SITE_TITLE} | ${COMPANY_NAME}`,
    description: `${SITE_DESCRIPTION}`,
    siteName: `${COMPANY_NAME}`,
    images: [
      {
        url: `${OG_IMAGE}`,
        alt: `${COMPANY_NAME}`,
      },
    ],
  },
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main>{children}</main>
}
