'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { empresarial, familiar } from '@/images'

export default function PlansComponent() {
  return (
    <div
      className="relative z-40 flex min-h-96 w-full items-center bg-color-background py-16 shadow-sm shadow-color-secondary"
      id="planos"
    >
      <section className="container flex flex-col items-center justify-center gap-8 xl:flex-row xl:items-start">
        <div className="max-w-[600px] text-color-text lg:order-2">
          <h2 className="text-center text-3xl font-bold text-color-secondary drop-shadow-md sm:text-left xl:mt-1 xl:text-4xl">
            Planos Personalizados para Empresas e Famílias
          </h2>
          <p className="my-6 text-lg text-color-text">
            A NextGo Saúde oferece soluções sob medida para cuidar da saúde de
            quem você ama e de toda a sua equipe. Seja para garantir o bem-estar
            de sua família ou proporcionar mais saúde e produtividade no
            ambiente corporativo, temos o plano ideal para você.
          </p>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div>
              <h3 className="text-2xl font-semibold text-color-title">
                Para Famílias:
              </h3>
              <p className="font-extralight">
                Garanta o melhor atendimento para todos os membros da sua
                família, com consultas médicas e acompanhamento de saúde sempre
                disponíveis.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-color-title">
                Para Empresas:
              </h3>
              <p className="font-extralight">
                Cuide da saúde de seus colaboradores e aumente a produtividade
                com nossos planos empresariais, que oferecem atendimento médico
                rápido e eficiente.
              </p>
            </div>
          </div>
          <Link href="#planos">
            <Button className="relative mt-5 inline-flex h-full w-40 items-center justify-center overflow-hidden border-2 border-color-secondary bg-transparent text-xl font-semibold leading-6 tracking-wide text-color-secondary transition-colors duration-500 hover:bg-color-secondary hover:text-white group-hover:border-transparent group-hover:text-color-text">
              Ver Planos
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4 lg:order-1 lg:flex-row">
          <Image
            src={familiar}
            alt="Marido, esposa e bebê"
            className="w-64 rounded-xl lg:-translate-y-4"
          />
          <Image
            src={empresarial}
            alt="2 mulheres com notebook"
            className="w-64 rounded-xl lg:translate-y-4"
          />
        </div>
      </section>
    </div>
  )
}
