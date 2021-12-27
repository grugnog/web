import { createElement, FC } from 'react'
import { render, screen } from '@testing-library/react'
import { withApollo } from '../src/apollo'
import { withWebsite } from '../src/components/providers'

interface Target {
  component?: FC
  folder?: string
  name?: string
  apollo?: boolean
}

export const describePage = jest.fn(
  (
    { component, folder, name, apollo = false }: Target,
    callBack?: () => void
  ) => {
    describe(folder.toUpperCase(), () => {
      const Page = component || require(`@app/pages/${folder}`).default
      const Component = apollo
        ? withApollo(withWebsite(Page), { ssr: false })
        : Page

      it('renders without crashing', () => {
        render(
          createElement(Component, {
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
