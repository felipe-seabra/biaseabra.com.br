'use client'

import { CardPlan } from './card-plan'

import { plans } from '@/database/plans'

export function PlansPageComponent() {
  return (
    <div className="flex min-h-[84vh] flex-col items-center justify-center bg-color-background pb-10 pt-32">
      <h1 className="mb-6 text-center text-5xl font-semibold text-color-title">
        Escolha o Plano Ideal!
      </h1>
      <div className="flex max-w-[1800px] flex-wrap items-center justify-center">
        {plans?.map((plan) => (
          <div className="m-3" key={plan.id}>
            <CardPlan {...plan} />
          </div>
        ))}
      </div>
    </div>
  )
}
