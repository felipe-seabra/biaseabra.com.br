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
import { ITrigger, IUser, Role } from '@/interfaces'
import { DialogDelUser } from './dialog-del-user'

const props: ITrigger = {
  triggerTitle: 'Excluir',
  title: 'Você tem certeza?',
  description:
    'Esta ação excluirá o usuário permanentemente do sistema, e não haverá como recuperá-lo. Tem certeza de que deseja prosseguir com a exclusão?',
}

type TableUsersProps = {
  users: IUser[]
}

export function TableUsers({ users }: TableUsersProps) {
  return users.length ? (
    users.map((user: IUser) => (
      <TableRow key={user.id}>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell>
          <Badge
            variant="outline"
            className={
              user.role === Role.MASTER
                ? 'bg-purple-500 text-gray-100'
                : user.role === Role.ADMIN
                  ? 'bg-red-500 text-gray-100'
                  : 'bg-green-500 text-gray-100'
            }
          >
            {user.role === Role.MASTER
              ? 'Superuser'
              : user.role === Role.ADMIN
                ? 'Admin'
                : 'Member'}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge
            variant="outline"
            className={
              user.active
                ? 'bg-green-500 text-gray-100'
                : 'bg-red-500 text-gray-100'
            }
          >
            {user.active ? 'Ativo' : 'Inativo'}
          </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">{user.email}</TableCell>
        <TableCell className="hidden md:table-cell">
          {new Intl.DateTimeFormat('pt-BR').format(new Date(user.createdAt))}
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
              <Link href={`/dashboard/usuarios/${user.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  Editar
                </DropdownMenuItem>
              </Link>
              <DialogDelUser
                {...props}
                id={user.id}
                available={
                  user.role === Role.ADMIN || user.role === Role.MASTER
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <p>Nenhum usuário</p>
  )
}
