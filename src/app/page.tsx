import { Suspense } from 'react'

import LoadingHomePage from './loading'
import HomePageComponent from './_components/home/home-componet'
import BenefitsComponent from './_components/benefits/benefits-componet'
import PlansComponent from './_components/plans/plans-componet'
import FaqComponent from './_components/faq/faq-componet'

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingHomePage />}>
        <HomePageComponent />
        <BenefitsComponent />
        <PlansComponent />
        <FaqComponent />
      </Suspense>
    </main>
  )
}
