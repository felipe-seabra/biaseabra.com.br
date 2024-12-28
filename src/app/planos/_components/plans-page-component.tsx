'use client'

import { CardPlan } from './card-plan'

import { plans } from '@/database/plans'

export function PlansPageComponent() {
  return (
    <div className="flex min-h-[84vh] items-center justify-center bg-color-background pt-40">
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
