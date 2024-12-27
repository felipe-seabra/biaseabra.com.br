import { Suspense } from 'react'

import LoadingHomePage from './loading'
import HomePage from './_components/home/home-page'
import BenefitsPage from './_components/benefits/benefits'
import PlansPage from './_components/_plans/plans'

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingHomePage />}>
        <HomePage />
        <BenefitsPage />
        <PlansPage />
      </Suspense>
    </main>
  )
}
