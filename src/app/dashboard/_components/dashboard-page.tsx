'use client'

import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { Activity, Loader2 } from 'lucide-react'
import { IPlan } from '@/interfaces'

export function DashboardPage() {
  const [plans, setPlans] = useState<IPlan[]>([])
  const [actives, setActives] = useState(0)

  const { data, isFetching } = useQuery(
    'plans',
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
    if (data) setPlans(data)
  }, [data])

  useEffect(() => {
    let calculatedActives = 0

    if (plans && Array.isArray(plans)) {
      plans.forEach((plan) => {
        calculatedActives += plan.active ? 1 : 0
      })
    }

    setActives(calculatedActives)
  }, [plans])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Link
          href="/dashboard/planos"
          className="cursor-pointer transition-all hover:scale-105"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Planos Ativos Agora
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isFetching ? <Loader2 className="animate-spin" /> : actives}
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
