import { cookies } from 'next/headers'
import EditPlanPage from './_components/edit-plan-page'

export default function EditProduct() {
  const token = cookies().get('session-token')

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {token && <EditPlanPage token={token?.value} />}
    </div>
  )
}
