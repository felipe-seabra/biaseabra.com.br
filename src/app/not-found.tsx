/* eslint-disable @next/next/no-img-element */

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error404() {
  return (
    <div className="container-error">
      <div className="pt-5">
        <div className="central-body">
          <div className="m-auto pb-9 text-gray-50">
            <h1 className="mt-40 font-sans text-9xl font-extrabold">404</h1>
            <p className="m-auto max-w-lg font-sans text-3xl">
              PARECE QUE VOCÊ ESTÁ PERDIDO NO ESPAÇO!
            </p>
          </div>
          <Link href="/" className="relative z-20 flex justify-center">
            <Button
              type="button"
              className="bg-criarte-secundary-700 hover:bg-criarte-secundary"
            >
              VOLTAR
            </Button>
          </Link>
        </div>
        <div className="objects">
          <img
            className="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
            alt="Rocket"
          />
          <div className="earth-moon">
            <img
              className="object_earth"
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
              alt="Terra"
            />
            <img
              className="object_moon"
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
              alt="Lua"
            />
          </div>
          <div className="box_astronaut">
            <img
              className="object_astronaut"
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
              alt="Astronalta"
            />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
        </div>
      </div>
    </div>
  )
}
