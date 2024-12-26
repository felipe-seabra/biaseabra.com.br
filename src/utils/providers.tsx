'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './queryCLient'

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
