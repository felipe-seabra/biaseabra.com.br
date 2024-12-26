'use server'

import { cookies } from 'next/headers'

export async function SetCookie({
  name,
  value,
}: {
  name: string
  value: string
}) {
  const expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 dias em milissegundos

  cookies().set(name, value, {
    expires: expirationDate,
    secure: true,
    httpOnly: true,
    path: '/',
  })
}

export async function GetCookie(name: string) {
  return cookies().get(name)
}

export async function DeleteCookie(name: string) {
  cookies().delete(name)
}
