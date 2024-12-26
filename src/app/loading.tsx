import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

import { logoIcon } from '@/images'

export default function LoadingHomePage() {
  return (
    <div className="bg-criarte-background text-criarte-text flex h-screen w-screen flex-col items-center justify-center">
      <Skeleton>
        <Image
          src={logoIcon}
          alt="Logo"
          width={72}
          height={72}
          className="flex w-full animate-bounce items-center justify-center rounded-full"
        />
      </Skeleton>
      <div className="border-criarte-primary-900 w-20 rounded-lg border-2 shadow-lg blur-sm" />
    </div>
  )
}
