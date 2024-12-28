import { cookies } from 'next/headers'
import { ConfigurationsPage } from './_components/configurations-page'

export default async function Page() {
  const token = cookies().get('session-token')
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {token && <ConfigurationsPage token={token?.value} />}
    </div>
  )
}
