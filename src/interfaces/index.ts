export interface IPlan {
  id?: string
  name: string
  description: string
  benefits: string[]
  url: string
  buttonName: string
  price?: string
  image: string
  active: boolean
  slug: string
  createdAt: Date
  updatedAt: Date
  message?: string
}

export interface ITrigger {
  triggerTitle: string
  title: string
  description: string
  id?: string
  isMaster?: boolean
  isAdmin?: boolean
  isMasterOnly?: boolean
  currentUser?: string
  available?: boolean
  imageUrl?: string
}

export interface ILogin {
  email: string
  password: string
}

export enum Role {
  MASTER = 'MASTER',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  id?: string
  name: string
  email: string
  password: string
  active: boolean
  role: Role // Use the Role enum
  createdAt: Date
  updatedAt: Date
}
