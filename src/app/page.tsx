import { Suspense } from 'react'

import LoadingHomePage from './loading'
import HomePageComponent from './_components/home/home'
import BenefitsComponent from './_components/benefits/benefits'
import PlansComponent from './_components/plans/plans'
import FaqComponent from './_components/faq/faq'

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
