import { cookies } from 'next/headers'

import { UsersPage } from './_components/users-page'

export default function Page() {
  const token = cookies().get('session-token')

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {token && <UsersPage token={token?.value} />}
    </div>
  )
}
