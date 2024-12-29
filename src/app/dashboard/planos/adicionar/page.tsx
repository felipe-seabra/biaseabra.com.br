import { cookies } from 'next/headers'

import { FormPlan } from '../_components/form-plan'

export default function AddProduct() {
  const token = cookies().get('session-token')

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        {token && <FormPlan token={token?.value} />}
      </div>
    </div>
  )
}
