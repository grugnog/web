import '@testing-library/jest-dom/extend-expect'
import preloadAll from 'jest-next-dynamic'

beforeAll(async () => {
  await preloadAll()
})

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pop: () => null,
      push: () => null,
      prefetch: () => null,
    }
  },
}))
