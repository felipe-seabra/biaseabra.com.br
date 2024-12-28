import { useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { queryClient } from '@/utils/queryCLient'
import { GetCookie } from '@/components/cookies-auth'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Loader2 } from 'lucide-react'

import { ITrigger } from '@/interfaces'

import Utils from '@/lib/utils'

export function DialogDelUser(props: ITrigger) {
  const [loading, setLoading] = useState(false)
  const { triggerTitle, title, description, id, available } = props

  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      const token = await GetCookie('session-token')

      if (token && id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token.value}`,
            },
          },
        )
        if (response) {
          if (response.ok) {
            await queryClient.invalidateQueries('users')
            return toast({
              title: 'Usuário Excluído com Sucesso',
              description: 'O Usuário foi removido do sistema com sucesso',
              action: (
                <ToastAction altText="Botão para fechar">Fechar</ToastAction>
              ),
            })
          } else {
            // Trate o caso de exclusão mal-sucedida
            console.error('Erro ao excluir o item:', response.statusText)
            return toast({
              title: 'Erro ao Excluir Usuário',
              description: 'Ocorreu um erro ao tentar excluir o Usuário.',
              variant: 'destructive',
            })
          }
        }
      }
    } catch (error) {
      console.error('Erro ao excluir o item:', error)
      return toast({
        title: 'Erro ao Excluir o Usuário',
        description:
          'Estamos enfrentando problemas internos no momento. Por favor, tente novamente mais tarde.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className={Utils.classNames(
            available
              ? 'cursor-not-allowed'
              : 'cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground',
            'relative flex w-full select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-500 outline-none hover:text-red-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          )}
          disabled={available}
        >
          {triggerTitle}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={onSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction type="submit">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                'Excluir'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
