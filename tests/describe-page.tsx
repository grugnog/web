import React, { FC } from 'react'
import { render, screen, act } from '@testing-library/react'
import { MyApp } from '../src/components/general/app'

interface Target {
  component?: FC
  folder?: string
  name?: string // initial heading name
  apollo?: boolean
}

export const describePage = jest.fn(
  ({ component, folder }: Target, callBack?: () => void) => {
    describe(folder.toUpperCase(), () => {
      const Component = component || require(`@app/pages/${folder}`).default

      it('renders without crashing', () => {
        act(() => {
          render(<MyApp Component={Component} />)
        })

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

        if (typeof callBack === 'function') {
          jest.fn(callBack)
        }
      })
    })
  }
)
