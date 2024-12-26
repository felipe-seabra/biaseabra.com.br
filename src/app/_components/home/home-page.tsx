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

import {
  idoso,
  medico,
  mulher,
  medica,
  perfil1,
  perfil2,
  perfil3,
  perfil4,
} from '@/images'

const BANNER = [
  { name: 'Mulher', image: mulher },
  { name: 'Médico', image: medico },
  { name: 'Idoso', image: idoso },
  { name: 'Médica', image: medica },
]

const PROFILES = [perfil1, perfil2, perfil3, perfil4]

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
    <div className="relative flex w-full items-center bg-color-background pb-10 shadow-sm sm:pb-0">
      <section className="container flex flex-wrap items-center pt-24 sm:flex-nowrap md:px-[10%]">
        <div className="max-w-[600px]">
          <Header />
          <Description />
          <ActionButtons />
          <div className="flex w-full justify-center">
            <div className="relative flex h-24 w-80 items-center justify-center rounded-lg border-2 border-white bg-white bg-opacity-40 p-4 shadow-sm sm:bottom-0 sm:left-[50%] sm:z-50">
              {PROFILES.map((profile, index) => (
                <Image
                  key={index}
                  src={profile}
                  alt={`Perfil ${index + 1}`}
                  className="ml-[-10px] h-10 w-10 rounded-full border-2 border-white shadow-md"
                />
              ))}
              <p className="ml-5 text-sm">+7 Mil Profissionais da saúde</p>
            </div>
          </div>
        </div>
        <BannerImage isFading={isFading} currentBanner={currentBanner} />
      </section>
    </div>
  )
}

function Header() {
  return (
    <>
      <h1 className="text-center text-4xl font-bold leading-loose text-color-primary drop-shadow-md sm:text-left md:text-6xl">
        {COMPANY_TITLE}
      </h1>
      <h3 className="text-center text-3xl font-bold text-color-secondary drop-shadow-md sm:text-left md:mt-1 md:text-4xl">
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
    <div className="mb-10 flex h-14 w-full justify-between sm:max-w-[345px]">
      <Link href="/">
        <Button className="relative inline-flex h-full w-40 items-center justify-center overflow-hidden rounded-lg border-2 border-color-secondary bg-color-secondary text-xl font-semibold leading-6 tracking-wide text-white transition-colors duration-500 hover:text-color-secondary">
          Ver Planos
        </Button>
      </Link>
      <Link href="/">
        <Button className="relative inline-flex h-full w-40 items-center justify-center overflow-hidden border-2 border-color-secondary bg-transparent text-xl font-semibold leading-6 tracking-wide text-color-secondary transition-colors duration-500 hover:bg-color-secondary hover:text-white group-hover:border-transparent group-hover:text-color-text">
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
    <div className="relative">
      <div
        className={`transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image src={currentBanner.image} alt={currentBanner.name} />
      </div>
    </div>
  )
}
