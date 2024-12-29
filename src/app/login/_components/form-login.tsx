'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { ToastAction } from '@radix-ui/react-toast'
import { useRouter } from 'next/navigation'

import { SetCookie } from '@/components/cookies-auth'
import { Loader2 } from 'lucide-react'

const FormSchema = z.object({
  email: z.string().email({
    message: 'Insira um e-mail válido',
  }),
  password: z.string().refine(
    (value) => {
      const uppercaseRegex = /[A-Z]/
      // const lowercaseRegex = /[a-z]/
      const numberRegex = /[0-9]/
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
      return (
        value.length >= 8 &&
        uppercaseRegex.test(value) &&
        // lowercaseRegex.test(value) &&
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

export function FormLogin() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  type responseProps = {
    id: string
    name: string
    email: string
    role: string
    token: string
    error?: string
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData: responseProps = await response.json()

      // Verifica se o login foi bem-sucedido
      if (response.ok) {
        await SetCookie({ name: 'session-token', value: responseData.token })
        await SetCookie({ name: 'user-id', value: responseData.id })

        const { id, name, email, role } = responseData
        const session = { id, name, email, role }

        localStorage.setItem('bf:traits', JSON.stringify(session))

        router.push('/dashboard')
        return toast({
          title: `Bem vindo(a) ${name}!`,
          description:
            'Login bem-sucedido! Você será redirecionado para a página de gerenciamento.',
          action: <ToastAction altText="Botão para fechar">Fechar</ToastAction>,
        })
      } else {
        // Trate o caso de login mal-sucedido
        console.error('Erro no login:', responseData.error)
        return toast({
          title: 'Erro de login',
          description: 'Por favor, insira o login e senha corretamente.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return toast({
        title: 'Falha no Login',
        description:
          'Estamos enfrentando problemas internos no momento. Por favor, tente novamente mais tarde.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} className="w-72" />
              </FormControl>
              <FormDescription>Insira seu nome de usuário</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  {...field}
                  className="w-72"
                />
              </FormControl>
              <FormDescription>Insira sua senha</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-72 bg-purple-700 hover:bg-purple-500"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>
    </Form>
  )
}
