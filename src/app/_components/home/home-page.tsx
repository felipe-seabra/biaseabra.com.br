'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'

import { Button } from '@/components/ui/button'

import {
  COMPANY_DESCRIPTION,
  COMPANY_DESCRIPTION_MORE,
  COMPANY_TITLE,
} from '@/database/constants'

import { idoso, medico, mulher, medica } from '@/images'

const BANNER = [
  { name: 'Mulher', image: mulher },
  { name: 'Médico', image: medico },
  { name: 'Idoso', image: idoso },
  { name: 'Médica', image: medica },
]

export default function HomePage() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(handleBannerTransition, 8000)
    return () => clearInterval(interval)
  }, [])

  function handleBannerTransition() {
    setIsFading(true)
    setTimeout(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % BANNER.length)
      setIsFading(false)
    }, 300)
  }

  const currentBanner = BANNER[currentBannerIndex]

  return (
    <div className="relative flex w-screen items-center bg-color-background">
      <section className="container flex min-h-screen items-center md:px-[10%]">
        <div className="max-w-[600px]">
          <Header />
          <Description />
          <ActionButtons />
        </div>
        <BannerImage isFading={isFading} currentBanner={currentBanner} />
      </section>
    </div>
  )
}

function Header() {
  return (
    <>
      <h1 className="text-4xl font-bold leading-loose text-color-primary drop-shadow-md md:text-6xl">
        {COMPANY_TITLE}
      </h1>
      <h3 className="text-3xl font-bold text-color-secundary drop-shadow-md md:mt-1 md:text-4xl">
        {COMPANY_DESCRIPTION}
      </h3>
    </>
  )
}

function Description() {
  return (
    <p className="my-6 text-lg text-color-text">{COMPANY_DESCRIPTION_MORE}</p>
  )
}

function ActionButtons() {
  return (
    <div className="flex h-14 max-w-[345px] justify-between">
      <Link href="/cursos">
        <Button className="relative inline-flex h-full w-40 items-center justify-center overflow-hidden rounded-lg border-2 border-color-secundary bg-color-secundary text-xl font-semibold leading-6 tracking-wide text-white transition-colors duration-500 hover:text-color-secundary">
          Saber Mais
        </Button>
      </Link>
      <Link href="/contato">
        <Button className="relative inline-flex h-full w-40 items-center justify-center overflow-hidden border-2 border-color-secundary bg-transparent text-xl font-semibold leading-6 tracking-wide text-color-secundary transition-colors duration-500 hover:bg-color-secundary hover:text-white group-hover:border-transparent group-hover:text-color-text">
          Contato
        </Button>
      </Link>
    </div>
  )
}

function BannerImage({
  isFading,
  currentBanner,
}: {
  isFading: boolean
  currentBanner: { name: string; image: StaticImageData }
}) {
  return (
    <div className="relative hidden sm:block">
      <div
        className={`transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image src={currentBanner.image} alt={currentBanner.name} />
      </div>
    </div>
  )
}
