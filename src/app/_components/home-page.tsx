'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import LoadingHomePage from '../loading'
import {
  COMPANY_DESCRIPTION,
  COMPANY_DESCRIPTION_MORE,
  COMPANY_NAME,
  COMPANY_TITLE,
} from '@/database/constants'

export default function HomePage() {
  const [isBackgroundLoaded, setBackgroundLoaded] = useState(false)

  useEffect(() => {
    const bgImage = new Image()
    bgImage.src =
      'https://bkzzcslgcddqtunfwogg.supabase.co/storage/v1/object/public/images/background.webp'
    bgImage.onload = () => {
      setBackgroundLoaded(true)
    }
  }, [])

  return !isBackgroundLoaded ? (
    <LoadingHomePage />
  ) : (
    // <div
    //   className={`flex h-screen w-screen items-center bg-color-background bg-[url('https://bkzzcslgcddqtunfwogg.supabase.co/storage/v1/object/public/images/background.webp')] bg-cover bg-center bg-no-repeat`}
    // >
    <div
      className={`flex h-screen w-screen items-center bg-color-background bg-cover bg-center bg-no-repeat`}
    >
      <section className="container flex h-screen items-center md:px-[10%]">
        <div className="max-w-[600px]">
          <h1 className="text-4xl font-bold leading-loose text-color-primary drop-shadow-md md:text-6xl">
            {COMPANY_NAME}
          </h1>
          <h3 className="text-3xl font-bold text-color-secundary drop-shadow-md md:mt-1 md:text-4xl">
            {COMPANY_TITLE}
          </h3>
          <p className="my-6 text-lg text-color-text">
            {COMPANY_DESCRIPTION}
            <br />
            {COMPANY_DESCRIPTION_MORE}
          </p>
          <div className="flex h-14 max-w-[345px] justify-between">
            <Link href="/cursos">
              <Button
                type="button"
                className="relative inline-flex h-full w-40 items-center justify-center overflow-hidden rounded-lg border-2 border-color-secundary bg-color-secundary text-xl font-semibold leading-6 tracking-wide text-white transition-colors duration-500 hover:text-color-secundary"
              >
                Saber Mais
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                type="button"
                className="relative inline-flex h-full w-40 items-center justify-center overflow-hidden border-2 border-color-secundary bg-transparent text-xl font-semibold leading-6 tracking-wide text-color-secundary transition-colors duration-500 hover:bg-color-secundary hover:text-white group-hover:border-transparent group-hover:text-color-text"
              >
                Contato
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
