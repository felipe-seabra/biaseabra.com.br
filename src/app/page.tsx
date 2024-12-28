import { Suspense } from 'react'

import LoadingHomePage from './loading'
import HomePage from './_components/home/home-componet'
import BenefitsPage from './_components/benefits/benefits-componet'
import PlansPage from './_components/plans/plans-componet'
import FaqPage from './_components/faq/faq-componet'

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
