'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ListFilter, Loader2, PlusCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'
import { IUser, Role } from '@/interfaces'

import { TableUsers } from './table-users'

import { GetUserStorage } from '@/utils/get-user-storage'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { CardFooterCounter } from '../../_components/card-footer-counter'

type UsersPageProps = {
  token: string
}

export function UsersPage({ token }: UsersPageProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [users, setUsers] = useState<IUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([])
  const [filter, setFilter] = useState('all')

  const { data, isFetching } = useQuery(
    'users',
    async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      })
      const data: IUser[] = await response.json()
      return data
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )

  useEffect(() => {
    const user: IUser = GetUserStorage('bf:traits')

    if (user.role !== Role.ADMIN && user.role !== Role.MASTER) {
      router.push('/dashboard')
      toast({
        title: 'Acesso Negado!',
        description: 'Esta área é restrita aos administradores.',
        variant: 'destructive',
      })
      return
    }

    if (data) {
      setUsers(data)
      setFilteredUsers(data)
    }
  }, [data, router, toast])

  function handleFilter(filterType: string) {
    let filteredUsers: IUser[] = []
    if (filterType === 'all') {
      filteredUsers = users
    } else if (filterType === 'admin') {
      filteredUsers = users.filter(
        (user) => user.role === Role.ADMIN || user.role === Role.MASTER,
      )
    } else if (filterType === 'no-admin') {
      filteredUsers = users.filter(
        (user) => user.role !== Role.ADMIN && user.role !== Role.MASTER,
      )
    }
    setFilteredUsers(filteredUsers)
    setFilter(filterType)
  }

  return (
    <Tabs defaultValue="all" value={filter}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all" onClick={() => handleFilter('all')}>
            Todos
          </TabsTrigger>
          <TabsTrigger value="admin" onClick={() => handleFilter('admin')}>
            Admin
          </TabsTrigger>
          <TabsTrigger
            value="no-admin"
            onClick={() => handleFilter('no-admin')}
          >
            No Admin
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filtro
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {['all', 'admin', 'no-admin'].map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={filter === type}
                  onClick={() => handleFilter(type)}
                >
                  {type === 'all'
                    ? 'Todos'
                    : type === 'admin'
                      ? 'Administrador'
                      : 'Não Administrador'}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/dashboard/usuarios/adicionar">
            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Adicionar Usuário
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value={filter}>
        <Card>
          <CardHeader>
            <CardTitle>Usuário</CardTitle>
            <CardDescription>Gerencie seus usuários.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">E-mail</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Data de Criação
                  </TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <TableUsers
                    users={filteredUsers
                      .slice()
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime(),
                      )}
                  />
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            {isFetching ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CardFooterCounter
                total={filteredUsers.length}
                description={filteredUsers.length > 1 ? 'usuários' : 'usuário'}
              />
            )}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
