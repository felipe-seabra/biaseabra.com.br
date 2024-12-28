import { cn } from '@/lib/utils'
import Link from 'next/link'

export type DashboardSidebarWebGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
  target?: string
} & T

export function DashboardSidebarWeb({
  className,
  children,
}: DashboardSidebarWebGenericProps) {
  return (
    <aside
      className={cn([
        'fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex',
        className,
      ])}
    >
      {children}
    </aside>
  )
}

export function DashboardSidebarWebNav({
  className,
  children,
}: DashboardSidebarWebGenericProps) {
  return (
    <nav
      className={cn(['flex flex-col items-center gap-4 px-2 py-4', className])}
    >
      {children}
    </nav>
  )
}

type DashboardSidebarWebLinkProps = {
  href: string
  active?: boolean
}

export function DashboardSidebarWebLink({
  className,
  href,
  target = '_self',
  active,
  children,
}: DashboardSidebarWebGenericProps<DashboardSidebarWebLinkProps>) {
  return (
    <Link
      href={href}
      target={target}
      className={cn([
        active && 'bg-accent text-accent-foreground',
        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-accent-foreground md:h-8 md:w-8',
        className,
      ])}
    >
      {children}
    </Link>
  )
}

export function DashboardSidebarWebFooter({
  className,
  children,
}: DashboardSidebarWebGenericProps) {
  return (
    <nav
      className={cn([
        'mt-auto flex flex-col items-center gap-4 px-2 py-4',
        className,
      ])}
    >
      {children}
    </nav>
  )
}

// Mobile sidebar

export type DashboardSidebarMobileGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
  target?: string
} & T

export function DashboardSidebarMobile({
  className,
  children,
}: DashboardSidebarMobileGenericProps) {
  return (
    <header
      className={cn([
        'sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6',
        className,
      ])}
    >
      {children}
    </header>
  )
}

export function DashboardSidebarMobileNav({
  className,
  children,
}: DashboardSidebarMobileGenericProps) {
  return (
    <nav className={cn(['grid gap-6 text-lg font-medium', className])}>
      {children}
    </nav>
  )
}

type DashboardSidebarMobileLinkProps = {
  href: string
  active?: boolean
  onClick?: () => void
}

export function DashboardSidebarMobileLink({
  className,
  children,
  href,
  target = '_self',
  active,
}: DashboardSidebarMobileGenericProps<DashboardSidebarMobileLinkProps>) {
  return (
    <Link
      href={href}
      target={target}
      className={cn([
        'flex items-center gap-4 px-2.5 py-1.5 text-muted-foreground hover:text-foreground',
        active && 'rounded-lg bg-accent text-accent-foreground',
        className,
      ])}
    >
      {children}
    </Link>
  )
}

export function DashboardSidebarMobileFooter({
  className,
  children,
}: DashboardSidebarMobileGenericProps) {
  return (
    <nav
      className={cn([
        'mt-auto flex flex-col items-center gap-4 px-2 py-4',
        className,
      ])}
    >
      {children}
    </nav>
  )
}
