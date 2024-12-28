import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

import { logoIcon } from '@/images'
import { COMPANY_NAME } from '@/constants/constants'

export default function LoadingHomePage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-color-background">
      <Skeleton className="bg-transparent">
        <Image
          src={logoIcon}
          alt={COMPANY_NAME}
          width={72}
          height={72}
          className="flex w-full animate-bounce items-center justify-center"
        />
      </Skeleton>
    </div>
  )
}
