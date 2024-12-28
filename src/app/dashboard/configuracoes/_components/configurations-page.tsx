'use client'

import { useState, useEffect } from 'react'

import { GetUserStorage } from '@/utils/get-user-storage'
import { Loader2 } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { IUser, Role } from '@/interfaces'
import { UpdatePassword } from './update-password'
import { UpdateProfile } from './update-profile'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { avatarImg } from '@/utils/gravatar'

type ConfigurationsPageProps = {
  token: string
}

export function ConfigurationsPage({ token }: ConfigurationsPageProps) {
  const [currentUser, setCurrentUser] = useState<IUser>()
  const [userAPI, setUserAPI] = useState<IUser>()
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsFetching(true)

    const user: IUser = GetUserStorage('bf:traits')
    setCurrentUser(user)

    async function fetchUser() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${user?.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      )
      const data = await response.json()

      setUserAPI(data)
      setIsFetching(false)
    }

    fetchUser()
  }, [token])

  const handlePasswordButtonClick = () => {
    setIsUpdatingPassword(true)
    setIsUpdatingProfile(false)
  }

  const handleProfileButtonClick = () => {
    setIsUpdatingPassword(false)
    setIsUpdatingProfile(true)
  }

  const handleViewProfileButtonClick = () => {
    setIsUpdatingPassword(false)
    setIsUpdatingProfile(false)
  }

  return (
    <>
      {currentUser ? (
        <Card className="flex min-h-full w-full flex-col">
          <div className="flex min-h-[calc(90vh-_theme(spacing.16))] flex-1 flex-col gap-4 bg-gray-100/40 p-4 dark:bg-gray-800/40 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
              <h1 className="text-3xl font-semibold">Configurações</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="grid gap-4 text-sm text-gray-500 dark:text-gray-400">
                <button
                  className="text-left text-gray-500 dark:text-gray-400"
                  onClick={handleViewProfileButtonClick}
                >
                  Ver Perfil
                </button>
                <button
                  className="text-left text-gray-500 dark:text-gray-400"
                  onClick={handlePasswordButtonClick}
                >
                  Alterar Senha
                </button>
                <button
                  className="text-left text-gray-500 dark:text-gray-400"
                  onClick={handleProfileButtonClick}
                >
                  Alterar Perfil
                </button>
              </nav>
              <div className="grid gap-6">
                {!isUpdatingPassword && !isUpdatingProfile && currentUser && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex flex-wrap justify-between">
                        <div>
                          {currentUser.name}{' '}
                          <Badge
                            variant="outline"
                            className={
                              currentUser.role === Role.MASTER
                                ? 'bg-purple-500 text-gray-100'
                                : currentUser.role === Role.ADMIN
                                  ? 'bg-red-500 text-gray-100'
                                  : 'bg-green-500 text-gray-100'
                            }
                          >
                            {currentUser.role === Role.MASTER
                              ? 'Superuser'
                              : currentUser.role === Role.ADMIN
                                ? 'Admin'
                                : 'Member'}
                          </Badge>
                          <CardDescription className="font-normal">
                            {currentUser.email}
                          </CardDescription>
                        </div>
                        <div>
                          <Avatar className="h-20 w-20">
                            <AvatarImage
                              src={avatarImg(currentUser.email)}
                              alt={currentUser.name}
                              className="overflow-hidden rounded-full"
                            />
                          </Avatar>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Data de Criação:{' '}
                      {isFetching ? (
                        <Loader2 className=" animate-spin" />
                      ) : (
                        userAPI?.createdAt &&
                        new Intl.DateTimeFormat('pt-BR').format(
                          new Date(userAPI.createdAt),
                        )
                      )}
                    </CardContent>
                    <CardFooter className="border-t p-6">
                      Última Atualização:{' '}
                      {isFetching ? (
                        <Loader2 className=" animate-spin" />
                      ) : (
                        userAPI?.updatedAt &&
                        new Intl.DateTimeFormat('pt-BR').format(
                          new Date(userAPI.updatedAt),
                        )
                      )}
                    </CardFooter>
                  </Card>
                )}
                {isUpdatingPassword && (
                  <UpdatePassword user={currentUser} token={token} />
                )}
                {isUpdatingProfile && (
                  <UpdateProfile user={currentUser} token={token} />
                )}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </>
  )
}
