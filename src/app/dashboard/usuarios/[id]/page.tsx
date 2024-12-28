import { cookies } from 'next/headers'
import EditUserPage from './_components/edit-user-page'

export default function EditUser() {
  const token = cookies().get('session-token')

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {token && <EditUserPage token={token?.value} />}
    </div>
  )
}
