import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

import { logoIcon } from '@/images'

export default function LoadingHomePage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-criarte-background text-criarte-text">
      <Skeleton>
        <Image
          src={logoIcon}
          alt="Logo"
          width={72}
          height={72}
          className="flex w-full animate-bounce items-center justify-center rounded-full"
        />
      </Skeleton>
      <div className="w-20 rounded-lg border-2 border-criarte-primary-900 shadow-lg blur-sm" />
    </div>
  )
}
