export const cepMask = (value: string | undefined): string => {
  if (!value) return ''

  let newValue = value.replace(/\D/g, '')
  newValue = newValue.replace(/(\d{5})(\d)/, '$1-$2')

  return newValue
}
