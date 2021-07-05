import '@testing-library/jest-dom/extend-expect'
import preloadAll from 'jest-next-dynamic'
import { createElement, FC } from 'react'
import { render, screen } from '@testing-library/react'

declare global {
  namespace NodeJS {
    interface Global {
      describePage?: any
    }
  }
}

interface Target {
  component: FC
  folder?: string
  name?: string
}

beforeAll(async () => {
  await preloadAll()
})

jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

global.describePage = jest.fn(
  ({ component, folder, name: target }: Target, callBack?: () => void) => {
    const name = target || (component && component.displayName)

    describe((folder || name).toUpperCase(), () => {
      it('renders without crashing', () => {
        render(
          createElement(component || require(`@app/pages/${folder}`).default, {
            name,
          })
        )
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

        if (typeof name !== 'undefined') {
          expect(screen.getByRole('heading', { name })).toBeInTheDocument()
        }

        if (typeof callBack === 'function') {
          jest.fn(callBack)
        }
      })
    })
  }
)
