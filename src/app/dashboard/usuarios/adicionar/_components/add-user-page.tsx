'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/components/ui/use-toast'

import { GetUserStorage } from '@/utils/get-user-storage'

import { IUser, Role } from '@/interfaces'
import { FormUser } from '../../_components/form-user'

type AddUserPageProps = {
  token: string
}

export function AddUserPage({ token }: AddUserPageProps) {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const user: IUser = GetUserStorage('bf:traits')

    if (user.role !== Role.ADMIN && user.role !== Role.MASTER) {
      router.push('/dashboard')
      toast({
        title: 'Acesso Negado!',
        description: 'Esta área é restrita aos administradores.',
        variant: 'destructive',
      })
    }
  }, [router, toast])

  return <FormUser token={token} />
}
