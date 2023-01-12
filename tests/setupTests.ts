import '@testing-library/jest-dom/extend-expect'

let localStorageMock: { [key: string]: string } = {}

// setup test for next-themes / local storage usage
beforeAll(() => {
  global.matchMedia = jest.fn(q => ({
    addListener: jest.fn(),
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    matches: false,
    media: q,
    removeListener: jest.fn(),
    removeEventListener: jest.fn(),
    onchange: null,
  }))
  global.Storage.prototype.getItem = jest.fn(
    (key: string) => localStorageMock[key]
  )
  global.Storage.prototype.setItem = jest.fn((key: string, value: string) => {
    localStorageMock[key] = value
  })
  localStorageMock = {}
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
