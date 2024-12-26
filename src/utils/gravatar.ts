import md5 from 'crypto-js/md5'

export const avatarImg = (email: string) => {
  const gravatarLink = md5(email).toString()
  const url = `https://www.gravatar.com/avatar/${gravatarLink}`
  return url
}
