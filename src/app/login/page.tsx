import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { FormLogin } from './_components/form-login'

export default function Page() {
  return (
    <div className="-mt-10 flex min-h-screen w-full flex-wrap justify-center bg-gray-900 md:mt-0">
      <Card className="flex max-w-[350px] flex-wrap justify-center self-center">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
          <CardDescription className="text-center text-base">
            Faça login para poder gerenciar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormLogin />
        </CardContent>
      </Card>
    </div>
  )
}
