/* eslint-disable @next/next/no-img-element */

import { Button } from '@/components/ui/button'
import { TableRow, TableCell } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal } from 'lucide-react'

import Link from 'next/link'
import { IPlan, ITrigger } from '@/interfaces'
import { DialogDelPlan } from './dialog-del-plan'

const props: ITrigger = {
  triggerTitle: 'Excluir',
  title: 'Você tem certeza?',
  description:
    'Esta ação excluirá o presente permanentemente do sistema, e não haverá como recuperá-lo. Tem certeza de que deseja prosseguir com a exclusão?',
}

type TablePlansProps = {
  plans: IPlan[]
  currentUserIsAdmin?: boolean
}

export function TablePlans({ plans, currentUserIsAdmin }: TablePlansProps) {
  return plans.length ? (
    plans
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ) // Ordena os planos pela data de modificação
      .map((plan: IPlan) => (
        <TableRow key={plan.id}>
          <TableCell className="hidden sm:table-cell">
            <img
              alt={plan.name}
              className="aspect-square rounded-md object-cover"
              height="64"
              src={plan.image}
              width="64"
            />
          </TableCell>
          <TableCell className="font-medium">{plan.name}</TableCell>
          <TableCell>
            <Badge
              variant={plan.active ? 'outline' : 'destructive'}
              className={plan.active ? 'bg-green-500 text-gray-100' : ''}
            >
              {plan.active ? 'Ativo' : 'Inativo'}
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {new Intl.DateTimeFormat('pt-BR').format(new Date(plan.createdAt))}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link
                  href={`/dashboard/planos/${plan.slug}`}
                  className={
                    !currentUserIsAdmin
                      ? 'pointer-events-none text-gray-400'
                      : ''
                  }
                >
                  <DropdownMenuItem
                    className={
                      !currentUserIsAdmin
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }
                  >
                    Editar
                  </DropdownMenuItem>
                </Link>
                <DialogDelPlan
                  {...props}
                  id={plan.id}
                  available={plan.active}
                  imageUrl={plan.image}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <p>Nenhuma plano</p>
  )
}
