import '@testing-library/jest-dom/extend-expect'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pop: () => null,
      push: () => null,
      prefetch: () => null,
    }
  },
}))

jest.mock('@vimeo/player', () => {
  return class Player {}
})
