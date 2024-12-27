import { Suspense } from 'react'

import LoadingHomePage from './loading'
import HomePage from './_components/home/home-page'
import BenefitsPage from './_components/benefits/benefits'
import PlansPage from './_components/plans/plans'
import FaqPage from './_components/faq/faq'

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingHomePage />}>
        <HomePage />
        <BenefitsPage />
        <PlansPage />
        <FaqPage />
      </Suspense>
    </main>
  )
}
