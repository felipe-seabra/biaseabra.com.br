import { Home, Users2, Settings, SeparatorVertical } from 'lucide-react'

export const NAV_LINKS = [
  {
    href: '/dashboard',
    icon: <Home className="h-5 w-5" />,
    text: 'Dashboard',
    active: 'dashboard',
  },
  {
    href: '/dashboard/planos',
    icon: <SeparatorVertical className="h-5 w-5" />,
    text: 'Planos',
    active: 'planos',
  },

  {
    href: '/dashboard/usuarios',
    icon: <Users2 className="h-5 w-5" />,
    text: 'Usuários',
    active: 'usuarios',
  },
  {
    href: '/dashboard/configuracoes',
    icon: <Settings className="h-5 w-5" />,
    text: 'Configurações',
    active: 'configuracoes',
  },
]
