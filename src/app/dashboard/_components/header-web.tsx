'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

import {
  DashboardSidebarWeb,
  DashboardSidebarWebNav,
  DashboardSidebarWebFooter,
} from '@/components/dashboard/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Settings } from 'lucide-react'

import { COMPANY_NAME } from '@/constants/constants'
import { logoIcon } from '@/images'

import { usePathname } from 'next/navigation'
import { NAV_LINKS } from './constants'
import Link from 'next/link'

export function DashboardHeaderWeb() {
  const location = usePathname()
  const currentLocation = location.split('/').pop()

  return (
    <DashboardSidebarWeb>
      <DashboardSidebarWebNav>
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image
            src={logoIcon}
            alt="Logo"
            className="h-4 w-4 transition-all group-hover:scale-110"
          />
          <span className="sr-only">{COMPANY_NAME}</span>
        </Link>
        {NAV_LINKS.map(
          (link) =>
            link.active !== 'configuracoes' && ( // remove configurations on map
              <Tooltip key={link.text}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn([
                      currentLocation === link.active &&
                        'bg-accent text-accent-foreground',
                      'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-accent-foreground md:h-8 md:w-8',
                    ])}
                  >
                    {link.icon}
                    <span className="sr-only">{link.text}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.text}</TooltipContent>
              </Tooltip>
            ),
        )}
      </DashboardSidebarWebNav>
      <DashboardSidebarWebFooter>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/configuracoes"
              className={cn([
                currentLocation === 'configuracoes' &&
                  'bg-accent text-accent-foreground',
                'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-accent-foreground md:h-8 md:w-8',
              ])}
              title="Configurações"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configurações</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Configurações</TooltipContent>
        </Tooltip>
      </DashboardSidebarWebFooter>
    </DashboardSidebarWeb>
  )
}
