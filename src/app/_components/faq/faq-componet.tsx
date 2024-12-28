'use client'

import Image from 'next/image'

import { duvidas } from '@/images'

export default function FaqComponent() {
  return (
    <div
      className="relative flex min-h-96 w-full items-center bg-color-background py-16 shadow-sm shadow-color-secondary"
      id="faq"
    >
      <section className="container flex flex-col items-center justify-center gap-8 xl:flex-row xl:items-start xl:justify-around">
        <div className="max-w-[600px] text-color-text lg:order-2">
          <h2 className="mb-10 text-center text-3xl font-bold text-color-secondary drop-shadow-md sm:text-left xl:mt-1 xl:text-4xl">
            Perguntas Frequentes
          </h2>
          <div className="flex flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-color-title">
                O que é telemedicina?
              </h3>
              <p className="font-extralight">
                Telemedicina é a prática de fornecer atendimento médico à
                distância através de tecnologias digitais. Isso permite
                consultas, diagnósticos e acompanhamento de saúde sem a
                necessidade de presença física.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-color-title">
                Quais serviços estão incluídos nos planos?
              </h3>
              <p className="font-extralight">
                Nossos planos incluem consultas médicas online, acesso a
                especialistas, exames e acompanhamento de saúde. Consulte a
                tabela de planos para detalhes específicos sobre cada pacote.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-color-title">
                Como posso agendar uma consulta?
              </h3>
              <p className="font-extralight">
                Você pode agendar uma consulta através da nossa plataforma web.
                Basta fazer login, selecionar o serviço desejado e escolher o
                horário que mais lhe convém.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:order-1 lg:flex-row">
          <Image
            src={duvidas}
            alt="Médico segurando o queixo com dúvida"
            className="w-96 rounded-xl border-2 border-color-secondary lg:-translate-y-4"
          />
        </div>
      </section>
    </div>
  )
}
