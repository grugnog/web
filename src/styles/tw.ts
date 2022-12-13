export type TWSize =
  | 'sm'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'max-w-full'
  | 'max-w-screen-lg'
  | 'max-w-screen-xl'
  | 'max-w-screen-2xl'

// get the max width converted to tailwind
export const getSize = (size?: TWSize) => {
  if (size === 'sm') {
    return 'max-w-sm'
  }
  if (size === 'lg') {
    return 'max-w-lg'
  }
  if (size === 'xl') {
    return 'max-w-xl'
  }
  if (size === '2xl') {
    return 'max-w-2xl'
  }
  if (size === '3xl') {
    return 'max-w-3xl'
  }
  if (size === '4xl') {
    return 'max-w-4xl'
  }
  if (size === '5xl') {
    return 'max-w-5xl'
  }
  if (size === '6xl') {
    return 'max-w-6xl'
  }
  if (size === '7xl') {
    return 'max-w-7xl'
  }
  if (size === 'max-w-full') {
    return 'max-w-full'
  }
  if (size === 'max-w-screen-lg') {
    return 'max-w-screen-lg'
  }
  if (size === 'max-w-screen-xl') {
    return 'max-w-screen-xl'
  }
  if (size === 'max-w-screen-2xl') {
    return 'max-w-screen-2xl'
  }
}
