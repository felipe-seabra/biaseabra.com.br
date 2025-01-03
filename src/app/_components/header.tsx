'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { logo } from '@/images'

import Utils from '@/lib/utils'
import { COMPANY_NAME } from '@/constants/constants'
import React, { useEffect } from 'react'

type NavigationType = { name: string; href: string; target?: string }

const navigation: NavigationType[] = [
  { name: 'Home', href: '/' },
  { name: 'Planos', href: '/planos' },
  {
    name: 'Agendar Atendimento',
    href: 'https://app.nextgosaude.com.br',
    target: '_blank',
  },
  { name: 'FAQ', href: '/#faq' },
]

export default function HeaderComponent(): JSX.Element {
  const location = usePathname()

  useEffect(() => {
    if (location.includes('#faq')) {
      const element = document.getElementById('faq')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <header
          className={Utils.classNames(
            location.startsWith('/dashboard')
              ? 'hidden'
              : location.startsWith('/login')
                ? 'hidden'
                : 'fixed z-50 w-full bg-white pt-2',
          )}
        >
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-color-primary hover:bg-color-secondary hover:text-color-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir Menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="self-center">
                  <Link href="/">
                    <Image
                      className="h-16 w-auto"
                      src={logo}
                      alt={COMPANY_NAME}
                    />
                  </Link>
                </div>
                <div className="hidden self-center sm:ml-6 sm:block">
                  <div className="flex space-x-4 text-center">
                    {navigation.map((item, index) => (
                      <React.Fragment key={item.name}>
                        <Link
                          href={item.href}
                          className={Utils.classNames(
                            item.href === location
                              ? 'border-b-2 border-color-secondary font-bold'
                              : 'font-medium',
                            'm-auto flex min-w-24 justify-center gap-2 p-2 text-sm text-color-secondary transition duration-500 hover:border-b-2 hover:border-color-secondary',
                          )}
                          aria-current={
                            item.href === location ? 'page' : undefined
                          }
                          {...(item.target && { target: item.target })}
                        >
                          {item.name.toUpperCase()}
                        </Link>
                        {index !== navigation.length - 1 && (
                          <div className="border-r-2 border-color-secondary" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  {...(item.target && { target: item.target })}
                >
                  <Disclosure.Button
                    className={Utils.classNames(
                      item.href === location
                        ? 'border-b-4 border-color-secondary font-bold'
                        : 'font-medium',
                      'mb:w-24 m-auto my-1 flex w-full justify-center px-3 py-2 text-color-secondary transition duration-500 hover:border-color-secondary',
                    )}
                    aria-current={item.href === location ? 'page' : undefined}
                  >
                    {item.name.toUpperCase()}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </header>
      )}
    </Disclosure>
  )
}
