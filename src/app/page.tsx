import { Suspense } from 'react'

import LoadingHomePage from './loading'
import HomePage from './_components/home/home-page'
import PlansPage from './_components/plans/plans'

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingHomePage />}>
        <HomePage />
        <PlansPage />
      </Suspense>
    </main>
  )
}
