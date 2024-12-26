import { Suspense } from 'react'

import LoadingHomePage from './loading'
import HomePage from './_components/home/home-page'
import BenefitsPage from './_components/benefits/benefits'

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingHomePage />}>
        <HomePage />
        <BenefitsPage />
      </Suspense>
    </main>
  )
}
