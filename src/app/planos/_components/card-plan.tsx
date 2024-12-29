/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'

import Link from 'next/link'

import { BlurhashCanvas } from 'react-blurhash'
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@radix-ui/react-icons'

import { IPlan } from '@/interfaces'

export function CardPlan(plan: IPlan) {
  const [loadedImage, setLoadedImage] = useState(false)

  const { name, description, benefits, url, buttonName, image, price } = plan

  const handleImageLoad = () => {
    setLoadedImage(true)
  }

  return (
    <div className="flex min-h-[45rem] max-w-[35rem] flex-col justify-between rounded-3xl border-2 border-gray-200 p-4 shadow-lg transition hover:border-color-secondary md:w-[50rem]">
      <div>
        <h2 className="mb-4 text-center text-4xl text-color-title">{name}</h2>
        <p className="text-center font-light text-color-text">{description}</p>
        <div className="relative mt-5 flex justify-center">
          <img
            style={{ display: loadedImage ? 'inline-block' : 'none' }}
            className="img-fluid shadow-custom mb-5 max-w-72 rounded-xl"
            src={image}
            alt={name}
            onLoad={handleImageLoad}
          />
          {!loadedImage && (
            <BlurhashCanvas
              hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
              className="img-fluid shadow-custom mb-5 max-w-72 rounded-xl"
              width={300}
              height={200}
              punch={1}
            />
          )}
        </div>
        <div>
          {benefits?.map((e, index) => (
            <p
              key={index}
              className="mb-2 flex items-center font-light text-color-text md:text-justify"
            >
              <CheckIcon className="h-7 w-7" />
              {e}
            </p>
          ))}
        </div>
        {price && (
          <div className="mt-5 text-center text-color-secondary">
            <div className="flex items-start justify-center">
              <span className="mt-1 text-lg font-light leading-none">R$</span>
              <span className="text-5xl font-semibold">
                {parseFloat(price).toFixed(2).replace('.', ',').split(',')[0]}
                <span className="text-xl font-light">
                  ,{parseFloat(price).toFixed(2).split('.')[1]}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Link href={url} target="_blank">
          <Button className="relative my-5 inline-flex h-full w-full items-center justify-center overflow-hidden border-2 border-color-secondary bg-transparent text-xl font-semibold leading-6 tracking-wide text-color-secondary transition-colors duration-500 hover:bg-color-secondary hover:text-white group-hover:border-transparent group-hover:text-color-text">
            {buttonName}
          </Button>
        </Link>
      </div>
    </div>
  )
}
