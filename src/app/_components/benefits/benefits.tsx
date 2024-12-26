'use client'

import Image from 'next/image'

import { clock, doctor, phone } from '@/images'

const BENEFICITS = [
  {
    titile: 'Profissionais Qualificados',
    description: 'Conte com uma equipe de médicos especializados',
    image: doctor,
  },
  {
    titile: 'Acesso Fácil pelo Celular',
    description: 'Realize consultas diretamente do seu smartphone',
    image: phone,
  },
  {
    titile: 'Atendimento 24/7',
    description: 'Atendimento 24h por dia, 7 dias por semana',
    image: clock,
  },
]
export default function BenefitsPage() {
  return (
    <div
      className="relative mt-[-45px] flex min-h-80 w-full items-center bg-color-secondary sm:mt-0"
      id="plans"
    >
      <section className="container flex items-center justify-center">
        <div className="flex flex-wrap justify-center gap-4 text-white">
          {BENEFICITS.map((benefit, index) => (
            <div key={index} className="flex items-center justify-center gap-4">
              <div className="mr-3 rounded-full border bg-white">
                <Image
                  src={benefit.image}
                  alt={benefit.titile}
                  className="h-auto w-20 p-3"
                />
              </div>
              <div className="max-w-64">
                <h2 className="text-xl font-bold">{benefit.titile}</h2>
                <p className="text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
