/* eslint-disable @next/next/no-img-element */
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'

import { FormPlan } from '../../_components/form-plan'

import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { GetUserStorage } from '@/utils/get-user-storage'
import { IPlan, IUser, Role } from '@/interfaces'

export default function EditPlanPage({ token }: { token: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const { slug } = useParams<{ slug: string }>()

  const [plan, setPlan] = useState<IPlan>()
  const [error, setError] = useState(false)

  const { data, isFetching } = useQuery(
    `plan-${slug}`,
    async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plan/${slug}`,
      )
      const data: IPlan = await response.json()
      if (data.message) setError(true)
      return data
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )

  useEffect(() => {
    const user: IUser = GetUserStorage('bf:traits')

    if (user.role !== Role.ADMIN && user.role !== Role.MASTER) {
      router.push('/dashboard')
      toast({
        title: 'Acesso Negado!',
        description: 'Esta área é restrita aos administradores.',
        variant: 'destructive',
      })
      return
    }

    if (data) setPlan(data)
  }, [data, router, toast])

  if (plan && !error) {
    return isFetching && plan ? (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    ) : (
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        {plan && <FormPlan plan={plan} token={token} />}
      </div>
    )
  } else {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1>Plano não encontrado</h1>
      </div>
    )
  }
}
