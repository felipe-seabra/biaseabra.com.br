import { Suspense } from 'react'
import LoadingHomePage from './loading'
import HomePage from './_components/home-page'

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingHomePage />}>
        <HomePage />
      </Suspense>
    </main>
  )
}
