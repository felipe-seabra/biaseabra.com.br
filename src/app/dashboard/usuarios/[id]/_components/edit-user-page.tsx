/* eslint-disable @next/next/no-img-element */
'use client'

import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'

import { IUser } from '@/interfaces'
import { FormUser } from '../../_components/form-user'

type UserProps = IUser & { message: string }

export default function EditUserPage({ token }: { token: string }) {
  const { id } = useParams<{ id: string }>()

  const [user, setUser] = useState<IUser>()
  const [error, setError] = useState(false)

  const { data, isFetching } = useQuery(
    `product-${id}`,
    async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      )
      const data: UserProps = await response.json()
      if (data.message) setError(true)
      return data
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )

  useEffect(() => {
    if (data) setUser(data)
  }, [data])

  if (user && !error) {
    return isFetching && user ? (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    ) : (
      <div className="mx-auto grid flex-1 auto-rows-max gap-4 md:w-[59rem]">
        {user && <FormUser user={user} token={token} />}
      </div>
    )
  } else {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1>Usuário não encontrado</h1>
      </div>
    )
  }
}
