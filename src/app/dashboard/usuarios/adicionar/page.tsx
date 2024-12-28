import { cookies } from 'next/headers'

import { AddUserPage } from './_components/add-user-page'

export default function AddUser() {
  const token = cookies().get('session-token')

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid flex-1 auto-rows-max gap-4 md:w-[59rem]">
        {token && <AddUserPage token={token?.value} />}
      </div>
    </div>
  )
}
