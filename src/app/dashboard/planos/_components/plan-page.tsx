'use client'

import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'

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

import { TablePlans } from './table-plans'
import { GetUserStorage } from '@/utils/get-user-storage'
import { IPlan, IUser, Role } from '@/interfaces'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { CardFooterCounter } from '../../_components/card-footer-counter'

export function PlansPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [plans, setPlans] = useState<IPlan[]>([])
  const [filteredtPlans, setFilteredtPlans] = useState<IPlan[]>([])
  const [filter, setFilter] = useState('all')
  const [currentUser, setCurrentUser] = useState<IUser>()

  useEffect(() => {
    const user: IUser = GetUserStorage('bf:traits')

    setCurrentUser(user)
  }, [router, toast])

  const { data, isLoading } = useQuery(
    'plans',
    async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plan`)
      const data: IPlan[] = await response.json()
      return data
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )

  useEffect(() => {
    if (data) {
      setPlans(data)
      setFilteredtPlans(data)
    }
  }, [data])

  function handleFilter(filterType: string) {
    let filteredtPlans: IPlan[] = []
    if (filterType === 'all') {
      filteredtPlans = plans
    } else if (filterType === 'active') {
      filteredtPlans = plans.filter((plan) => plan.active)
    } else if (filterType === 'draft') {
      filteredtPlans = plans.filter((plan) => !plan.active)
    }
    setFilteredtPlans(filteredtPlans)
    setFilter(filterType)
  }

  return (
    <Tabs defaultValue="all" value={filter}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all" onClick={() => handleFilter('all')}>
            Todos
          </TabsTrigger>
          <TabsTrigger value="active" onClick={() => handleFilter('active')}>
            Ativos
          </TabsTrigger>
          <TabsTrigger value="draft" onClick={() => handleFilter('draft')}>
            Inativos
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
              {['all', 'active', 'draft'].map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={filter === type}
                  onClick={() => handleFilter(type)}
                >
                  {type === 'all'
                    ? 'Todos'
                    : type === 'active'
                      ? 'Ativo'
                      : 'Inativo'}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/dashboard/planos/adicionar">
            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Adicionar Plano
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value={filter}>
        <Card>
          <CardHeader>
            <CardTitle>Planos</CardTitle>
            <CardDescription>Gerencie seus planos.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Imagens</span>
                  </TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Data de Criação
                  </TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <TablePlans
                    currentUserIsAdmin={
                      currentUser?.role === Role.ADMIN ||
                      currentUser?.role === Role.MASTER
                    }
                    plans={filteredtPlans}
                  />
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CardFooterCounter
                total={filteredtPlans.length}
                description={filteredtPlans.length > 1 ? 'planos' : 'plano'}
              />
            )}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
