'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ToastAction } from '@radix-ui/react-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { IUser } from '@/interfaces'
import { Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'

const FormSchema = z.object({
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
})

type UpdatePasswordProps = {
  user: IUser
  token: string
}

export function UpdatePassword({ user, token }: UpdatePasswordProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)

    try {
      if (token && user.id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            },
            method: 'PUT',
            body: JSON.stringify(data),
          },
        )

        if (response) {
          if (response.ok) {
            router.push('/dashboard')
            return toast({
              title: 'Senha Alterada com sucesso!',
              description: 'A Senha foi alterado no sistema.',
              action: (
                <ToastAction altText="Botão para fechar">Fechar</ToastAction>
              ),
            })
          } else {
            console.error('Erro ao alterar a Senha:', response.statusText)
            return toast({
              title: 'Erro ao alterar o Senha!',
              description: 'Houve um erro ao tentar alterar a Senha.',
              variant: 'destructive',
            })
          }
        }
      }
    } catch (error) {
      console.error('Erro ao alterar a Senha:', error)
      return toast({
        title: 'Erro ao alterar a Senha',
        description:
          'Estamos com problemas internos, favor tentar novamente mais tarde!',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const { handleSubmit } = form

  return (
    <Card className="flex min-h-full w-full flex-col">
      <h1 className="my-5 text-center text-2xl">Alterar Senha</h1>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-2 mb-80 flex flex-wrap justify-center self-center rounded-xl border p-2 md:max-w-[700px] md:p-4"
        >
          <div className="flex w-full flex-wrap justify-between gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite a nova senha"
                      {...field}
                      className="w-full"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6 flex gap-5">
            <Link
              href="/dashboard"
              className={
                loading ? 'pointer-events-none cursor-not-allowed' : ''
              }
            >
              <Button
                className="w-36"
                variant="outline"
                type="button"
                disabled={loading}
              >
                Voltar
              </Button>
            </Link>
            <Button
              className="w-36 cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Salvar'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
