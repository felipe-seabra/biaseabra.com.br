'use client'

import { Fragment } from 'react'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

import {
  DashboardSidebarMobile,
  DashboardSidebarMobileNav,
  DashboardSidebarMobileLink,
} from '@/components/dashboard/sidebar'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb'
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetClose,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { PanelLeft, Search } from 'lucide-react'

import { COMPANY_NAME } from '@/constants/constants'
import { avatar, logo } from '@/images'

import { avatarImg } from '@/utils/gravatar'
import { GetUserStorage } from '@/utils/get-user-storage'
import { IUser, Role } from '@/interfaces'
import { ToastAction } from '@/components/ui/toast'
import { DeleteCookie } from '@/components/cookies-auth'
import Link from 'next/link'
import { NAV_LINKS } from './constants'
import { Badge } from '@/components/ui/badge'

export function DashboardHeaderMobile() {
  const router = useRouter()
  const { toast } = useToast()
  const location = usePathname()
  const parts = location.split('/').filter((part) => part !== '')
  const currentLocation = parts[parts.length - 1]

  const user: IUser = GetUserStorage('bf:traits')

  async function HandleLogOut() {
    await DeleteCookie('session-token')
    localStorage.removeItem('bf:traits')

    router.push('/login')

    return toast({
      title: 'Saída do Sistema',
      description:
        'Você clicou em "Sair". Agora você foi desconectado do sistema.',
      action: <ToastAction altText="Botão para fechar">Fechar</ToastAction>,
      variant: 'destructive',
    })
  }

  return (
    <DashboardSidebarMobile>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <DashboardSidebarMobileNav>
            <DashboardSidebarMobileLink
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <SheetClose>
                <Image
                  src={logo}
                  alt={COMPANY_NAME}
                  className="h-5 w-10 transition-all group-hover:scale-110"
                />
              </SheetClose>
              <span className="sr-only">{COMPANY_NAME}</span>
            </DashboardSidebarMobileLink>
            {NAV_LINKS.map((link) => (
              <DashboardSidebarMobileLink
                key={link.text}
                href={link.href}
                active={currentLocation === link.active}
              >
                <SheetClose className="flex w-full items-center gap-3">
                  {link.icon}
                  {link.text}
                </SheetClose>
              </DashboardSidebarMobileLink>
            ))}
          </DashboardSidebarMobileNav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {parts.map((part, index) => {
            const path = parts.slice(0, index + 1).join('/')

            return (
              <Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/${path}`}>
                      {part.charAt(0).toUpperCase() + part.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Pesquisar..."
          disabled
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          title="Pesquisas desabilitadas temporariamente"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            {user ? (
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={avatarImg(user.email)}
                  alt={user.name}
                  className="overflow-hidden rounded-full"
                />
              </Avatar>
            ) : (
              <Image
                src={avatar}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex items-center justify-between text-sm font-medium leading-none">
            {user && user.name}{' '}
            <Badge
              variant="outline"
              className={
                user?.role === Role.MASTER
                  ? 'bg-purple-500 text-gray-100'
                  : user?.role === Role.ADMIN
                    ? 'bg-red-500 text-gray-100'
                    : 'bg-green-500 text-gray-100'
              }
            >
              {user?.role === Role.MASTER
                ? 'S'
                : user?.role === Role.ADMIN
                  ? 'A'
                  : 'M'}
            </Badge>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="text-xs leading-none text-muted-foreground">
            {user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" title="Configurações">
            <Link href="/dashboard/configuracoes">Configurações</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="mailto:contato@felipeseabra.dev.br">Suporte</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:text-red-400"
            onClick={HandleLogOut}
          >
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </DashboardSidebarMobile>
  )
}
