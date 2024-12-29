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

import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

import { ChevronLeft, Loader2 } from 'lucide-react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { queryClient } from '@/utils/queryCLient'

import { v4 as uuidv4 } from 'uuid'

import Image from 'next/image'
import { placeholderImage } from '@/images'

import { supabase } from './supabase'

import { IPlan, IUser, Role } from '@/interfaces'
import { GetUserStorage } from '@/utils/get-user-storage'

const FormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  benefits: z.union([z.string(), z.array(z.string())]),
  url: z.string().url(),
  buttonName: z.string().min(3),
  price: z.string().optional(),
  image: z.string().url(),
  slug: z.string().optional(),
  active: z.boolean(),
})

type FormPlanProps = {
  plan?: IPlan
  token: string
}

export function FormPlan({ plan, token }: FormPlanProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [imagePlan, setImagePlan] = useState<File>()
  const [currentUser, setCurrentUser] = useState<IUser>()

  const PLAN_IMAGE_URL = plan?.image

  useEffect(() => {
    const user: IUser = GetUserStorage('bf:traits')

    setCurrentUser(user)
  }, [router, toast])

  const textWithBreaksBenefits: string | undefined = plan?.benefits.join(';\n')

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: plan?.name ?? '',
      benefits: textWithBreaksBenefits ?? '',
      description: plan?.description ?? '',
      url: plan?.url ?? '',
      buttonName: plan?.buttonName ?? '',
      price: plan?.price?.toString() ?? '',
      image: plan?.image ?? '',
      active: plan?.active ?? false,
      slug: plan?.slug ?? '',
    },
  })

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    setLoading(true)

    // Processa a descrição para dividir em um array de strings
    const arrayBenefits = (dataForm.benefits as string)
      .split(';\n')
      .map((line: string) => line.trim())

    dataForm.benefits = arrayBenefits

    if (imagePlan) {
      const { data, error } = await supabase.storage
        .from('plans')
        .upload(
          `${imagePlan.name.split('.')[0]}-${uuidv4()}.${imagePlan.name.split('.')[1]}`,
          imagePlan,
        )
      if (data) {
        dataForm.image = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_LINK}${data.path}`
      } else {
        console.error(error)
        return toast({
          title: 'Erro ao Alterar a Imagem do Plano',
          description:
            'Estamos enfrentando problemas internos no momento. Por favor, tente novamente mais tarde.',
          variant: 'destructive',
        })
      }
    }

    try {
      if (token && plan?.id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/plan/${plan.id}`,
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
            if (PLAN_IMAGE_URL !== dataForm.image && PLAN_IMAGE_URL) {
              const { error } = await supabase.storage
                .from('plans')
                .remove([
                  PLAN_IMAGE_URL.replace(
                    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_LINK as string,
                    '',
                  ),
                ])
              if (error) {
                console.error(error)
              }
            }
            await queryClient.invalidateQueries('plans')
            await queryClient.invalidateQueries(`plan-${plan.id}`)
            router.push('/dashboard/planos')
            return toast({
              title: 'Plano Alterado com Sucesso',
              description: 'O Plano foi alterado no sistema com sucesso',
              action: (
                <ToastAction altText="Botão para fechar">Fechar</ToastAction>
              ),
            })
          } else {
            // Trate o caso de exclusão mal-sucedida
            console.error('Erro ao alterar o item:', response.statusText)
            return toast({
              title: 'Erro ao Alterar Plano',
              description: 'Ocorreu um erro ao tentar alterar o Plano.',
              variant: 'destructive',
            })
          }
        }
      } else if (token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/plan`,
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
            await queryClient.invalidateQueries('plans')
            router.push('/dashboard/plano')
            return toast({
              title: 'Plano Adicionado com Sucesso',
              description: 'O Plano foi adicionado no sistema com sucesso',
              action: (
                <ToastAction altText="Botão para fechar">Fechar</ToastAction>
              ),
            })
          } else {
            // Trate o caso de exclusão mal-sucedida
            console.error('Erro ao adicionar o Plano:', response.statusText)
            return toast({
              title: 'Erro ao Adicionar Plano',
              description: 'Ocorreu um erro ao tentar adicionar o Plano.',
              variant: 'destructive',
            })
          }
        }
      }
    } catch (error) {
      console.error('Erro ao alterar o item:', error)
      return toast({
        title: 'Erro ao Alterar o Plano',
        description:
          'Estamos enfrentando problemas internos no momento. Por favor, tente novamente mais tarde.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setImagePlan(file)
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = URL.createObjectURL(file)
        form.setValue('image', imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const { handleSubmit } = form

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/planos">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                type="button"
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
                form.watch('active') === true ? 'outline' : 'destructive'
              }
              className="ml-auto sm:ml-0"
            >
              {form.watch('active') ? 'Ativo' : 'Inativo'}
            </Badge>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Link href="/dashboard/planos">
                <Button variant="outline" size="sm" type="button">
                  Cancelar
                </Button>
              </Link>
              <Button size="sm" type="submit">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                  </>
                ) : (
                  'Salvar Plano'
                )}
              </Button>
            </div>
          </div>
          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Detalhes do Plano</CardTitle>
                  <CardDescription>
                    Aqui você pode alterar as caracteristicas do plano
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
                              placeholder="Nome do plano"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel className="flex flex-col">
                            Descrição{' '}
                            <span className="mt-1 text-xs font-extralight">
                              (uma breve descrição do plano)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-full"
                              placeholder="Descrição do planos"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="benefits"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel className="flex flex-col">
                            Benefícios{' '}
                            <span className="mt-1 text-xs font-extralight">
                              (separe com ponto e virgula e dê enter)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Benefícios do plano"
                              className="min-h-48"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle>Informações de Contrato</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>URL para contratar o Plano</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-full"
                              placeholder="URL do plano"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel className="flex flex-col">
                            Valor do plano{' '}
                            <span className="mt-1 text-xs font-extralight">
                              (use ponto para separar as casas (Ex.: 99.99))
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="w-full"
                              placeholder="Descrição do planos"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Status do Plano</CardTitle>
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
                              Seu Cargo não é de Master, você não pode alterar
                              isso.
                            </span>
                          )}
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={currentUser?.role !== Role.MASTER}
                            />
                          </FormControl>
                          <Badge
                            variant={field.value ? 'outline' : 'destructive'}
                            className="flex justify-center"
                          >
                            {field.value ? 'Ativo' : 'Desativado'}
                          </Badge>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Imagem do Plano</CardTitle>
                  <CardDescription>
                    Selecione uma imagem em .webp para melhor otimização.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <>
                          {field.value ? (
                            <img
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="300"
                              width="300"
                              src={field.value}
                            />
                          ) : (
                            <Image
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="300"
                              width="300"
                              src={placeholderImage}
                            />
                          )}
                          <FormItem className="grid gap-2">
                            <FormLabel>Imagem</FormLabel>
                            <Input
                              type="file"
                              accept="image/jpeg, image/png, image/webp, image/jpg"
                              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                              onChange={handleSelectImage}
                            />
                          </FormItem>
                        </>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem className="mt-4 grid gap-3">
                          <FormLabel>Slug do Plano</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-full text-xs"
                              {...field}
                              placeholder="Slug do curso"
                              disabled
                              title="O slug é gerado automaticamente com o nome do curso após o envio e não pode ser alterado manualmente."
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 md:hidden">
            <Link href="/dashboard/planos">
              <Button variant="outline" size="sm" type="button">
                Cancelar
              </Button>
            </Link>
            <Button size="sm" type="submit">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                'Salvar Plano'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
