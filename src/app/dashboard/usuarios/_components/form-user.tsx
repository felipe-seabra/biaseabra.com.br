/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { ChevronLeft, Loader2 } from 'lucide-react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { queryClient } from '@/utils/queryCLient'

import { IUser, Role } from '@/interfaces'
import { GetUserStorage } from '@/utils/get-user-storage'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

const FormSchema = z.object({
  name: z
    .string()
    .min(8, { message: 'O nome precisa ter no mínmo 8 caracteres' }),
  email: z.string().email({ message: 'O e-mail deve ser válido' }),
  password: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        const uppercaseRegex = /[A-Z]/
        const lowercaseRegex = /[a-z]/
        const numberRegex = /[0-9]/
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
        return (
          value.length >= 8 &&
          uppercaseRegex.test(value) &&
          lowercaseRegex.test(value) &&
          numberRegex.test(value) &&
          specialCharRegex.test(value)
        )
      },
      {
        message:
          'A senha deve ter no mínimo 8 caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      },
    ),
  role: z.string(),
  active: z.boolean(),
})

type FormUserProps = {
  user?: IUser
  token: string
}

export function FormUser({ user, token }: FormUserProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<IUser>()

  useEffect(() => {
    const user: IUser = GetUserStorage('bf:traits')

    setCurrentUser(user)
  }, [router, toast])

  const initialValues = {
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: user?.password ?? undefined,
    role: user?.role ?? Role.USER,
    active: user?.active ?? false,
  }

  if (!user) {
    delete initialValues.password
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    setLoading(true)

    try {
      if (token && user?.id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            },
            method: 'PUT',
            body: JSON.stringify(dataForm),
          },
        )

        if (response) {
          if (response.ok) {
            await queryClient.invalidateQueries('users')
            await queryClient.invalidateQueries(`user-${user.id}`)
            router.push('/dashboard/usuarios')
            return toast({
              title: 'Usuário Alterado com Sucesso',
              description: 'O Usuário foi alterado no sistema com sucesso',
              action: (
                <ToastAction altText="Botão para fechar">Fechar</ToastAction>
              ),
            })
          } else {
            // Trate o caso de exclusão mal-sucedida
            console.error('Erro ao alterar o item:', response.statusText)
            return toast({
              title: 'Erro ao Alterar Usuário',
              description: 'Ocorreu um erro ao tentar alterar o Usuário.',
              variant: 'destructive',
            })
          }
        }
      } else if (token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            },
            method: 'POST',
            body: JSON.stringify(dataForm),
          },
        )

        if (response) {
          if (response.ok) {
            await queryClient.invalidateQueries('users')
            router.push('/dashboard/usuarios')
            return toast({
              title: 'Usuário Adicionado com Sucesso',
              description: 'O Usuário foi adicionado no sistema com sucesso',
              action: (
                <ToastAction altText="Botão para fechar">Fechar</ToastAction>
              ),
            })
          } else {
            // Trate o caso de exclusão mal-sucedida
            console.error('Erro ao adicionar o Usuário:', response.statusText)
            return toast({
              title: 'Erro ao Adicionar Usuário',
              description: 'Ocorreu um erro ao tentar adicionar o Usuário.',
              variant: 'destructive',
            })
          }
        }
      }
    } catch (error) {
      console.error('Erro ao alterar o item:', error)
      return toast({
        title: 'Erro ao Alterar o Usuário',
        description:
          'Estamos enfrentando problemas internos no momento. Por favor, tente novamente mais tarde.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const { handleSubmit } = form

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/usuarios"
              className={
                loading ? 'pointer-events-none cursor-not-allowed' : ''
              }
            >
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                type="button"
                disabled={loading}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Controle Profissional
            </h1>
            <Badge
              variant={
                form.watch('role') === Role.ADMIN ||
                  form.watch('role') === Role.MASTER
                  ? 'outline'
                  : 'destructive'
              }
              className="ml-auto sm:ml-0"
            >
              {form.watch('role')}
            </Badge>
            <Badge
              variant={
                form.watch('active') === true ? 'outline' : 'destructive'
              }
              className="ml-auto sm:ml-0"
            >
              {form.watch('active') ? 'Ativo' : 'Inativo'}
            </Badge>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Link
                href="/dashboard/usuarios"
                className={
                  loading ? 'pointer-events-none cursor-not-allowed' : ''
                }
              >
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </Link>
              <Button size="sm" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                  </>
                ) : (
                  'Salvar Usuário'
                )}
              </Button>
            </div>
          </div>
          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Detalhes do Usuário</CardTitle>
                  <CardDescription>
                    Aqui você pode alterar/adicionar as caracteristicas do
                    usuário
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-full"
                              placeholder="Nome do usuário"
                              {...field}
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              className="w-full"
                              placeholder="E-mail do usuário"
                              {...field}
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              {!user && (
                <Card>
                  <CardHeader>
                    <CardTitle>Senha do Usuário</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="grid gap-3">
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                className="w-full"
                                placeholder="Senha do Usuário"
                                {...field}
                                disabled={loading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Cargo do Usuário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Cargo</FormLabel>
                          {currentUser?.role !== Role.MASTER && (
                            <span className="text-center text-sm text-muted-foreground">
                              Seu cargo não é de master, você não pode alterar
                              isso.
                            </span>
                          )}
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={form.watch('role')}
                            disabled={
                              currentUser?.role !== Role.MASTER || loading
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem
                                value={Role.MASTER}
                                disabled={currentUser?.role !== Role.MASTER}
                              >
                                Master
                              </SelectItem>
                              <SelectItem
                                value={Role.ADMIN}
                                disabled={currentUser?.role !== Role.MASTER}
                              >
                                Admin
                              </SelectItem>
                              <SelectItem value={Role.USER}>User</SelectItem>
                            </SelectContent>
                          </Select>

                          <Badge
                            variant={field.value ? 'outline' : 'destructive'}
                            className="flex justify-center"
                          >
                            {field.value}
                          </Badge>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status do Usuário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Status</FormLabel>
                          {currentUser?.role !== Role.MASTER && (
                            <span className="text-center text-sm text-muted-foreground">
                              Seu Cargo não é de master, você não pode alterar
                              isso.
                            </span>
                          )}
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={
                                currentUser?.role !== Role.MASTER || loading
                              }
                            />
                          </FormControl>
                          <Badge
                            variant={field.value ? 'outline' : 'destructive'}
                            className="flex justify-center"
                          >
                            {field.value ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 md:hidden">
            <Link
              href="/dashboard/usuarios"
              className={
                loading ? 'pointer-events-none cursor-not-allowed' : ''
              }
            >
              <Button
                variant="outline"
                size="sm"
                type="button"
                disabled={loading}
              >
                Cancelar
              </Button>
            </Link>
            <Button size="sm" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                'Salvar Usuário'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
