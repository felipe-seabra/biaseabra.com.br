import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ToastAction } from '@radix-ui/react-toast'

import { IUser } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

const FormSchema = z.object({
  name: z
    .string()
    .min(8, { message: 'O nome precisa ter no mínmo 8 caracteres' }),
  email: z.string().email({ message: 'O e-mail deve ser válido' }),
})

type UpdateProfileProps = {
  user: IUser
  token: string
}

export function UpdateProfile({ user, token }: UpdateProfileProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
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
        const { name, email } = data
        const { id, role } = user
        const session = { id, name, email, role }
        localStorage.setItem('bf:traits', JSON.stringify(session)) // update localStorage

        if (response) {
          if (response.ok) {
            router.push('/dashboard')
            return toast({
              title: 'Perfil Alterado com sucesso!',
              description: 'O Perfil foi alterado no sistema.',
              action: (
                <ToastAction altText="Botão para fechar">Fechar</ToastAction>
              ),
            })
          } else {
            // Trate o caso de exclusão mal-sucedida
            console.error('Erro ao alterar o Perfil:', response.statusText)
            return toast({
              title: 'Erro ao alterar o Perfil!',
              description: 'Houve um erro ao tentar alterar o Perfil.',
              variant: 'destructive',
            })
          }
        }
      }
    } catch (error) {
      console.error('Erro ao alterar o Perfil:', error)
      return toast({
        title: 'Erro ao alterar o Perfil',
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
      <h1 className="my-5 text-center text-2xl">Alterar Perfil</h1>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-2 mb-80 flex flex-wrap justify-center self-center rounded-xl border p-2 md:max-w-[700px] md:p-4"
        >
          <div className="flex flex-col gap-2">
            <a href="https://br.gravatar.com/" target="_blank" rel="noreferrer">
              <Button type="button" variant="outline">
                Foto do Perfil
              </Button>
            </a>
          </div>
          <div className="flex w-full flex-wrap justify-between gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full md:w-60">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do usuário"
                      {...field}
                      className="w-full md:w-60"
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
                <FormItem className="w-full md:w-60">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="E-mail do Usuário"
                      {...field}
                      className="w-full md:w-60"
                      disabled
                      title="O E-mail não poder ser alterado"
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
            <Button className="w-36" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Salvar'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
