'use client'

import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { IPlan } from '@/interfaces'

import { CardPlan } from './card-plan'
import { Loading } from '@/components/loading'

export function PlansPageComponent() {
  const [plans, setPlans] = useState<IPlan[]>([])

  const { data, isFetching } = useQuery(
    'projects',
    async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plan`)
      const data: IPlan[] = await response.json()
      return data
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )

  useEffect(() => {
    if (data) {
      setPlans(data.filter((plan) => plan.active))
    }
  }, [data])

  const renderCards = () => {
    if (isFetching) {
      return (
        <div className="relative mt-12">
          <Loading />
        </div>
      )
    }

    return plans
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ) // Converte para Date para comparar
      .map((plan) => <CardPlan key={plan.id} {...plan} />)
  }

  return (
    <div className="flex min-h-[84vh] flex-col items-center justify-center bg-color-background pb-10 pt-32">
      <h1 className="mb-6 text-center text-5xl font-semibold text-color-title">
        Escolha o Plano Ideal!
      </h1>
      <div className="flex max-w-[1800px] flex-wrap items-center justify-center gap-2">
        {renderCards()}
      </div>
    </div>
  )
}
