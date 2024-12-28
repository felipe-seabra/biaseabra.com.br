import { Suspense } from 'react'

import LoadingHomePage from './loading'
import HomePage from './_components/home/home-page'
import BenefitsPage from './_components/benefits/benefits-page'
import PlansPage from './_components/plans/plans-page'
import FaqPage from './_components/faq/faq-page'

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
