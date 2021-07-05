import { getAccessibleColors } from '@app/lib'

describe('determine accessible colors util', () => {
  it('renders without crashing', () => {
    const colors = getAccessibleColors({
      parentColor: '#000',
      elementColor: '#ccc',
    })

    const value = {
      background: { model: 'rgb', color: [0, 0, 0], valpha: 1 },
      contrastRatio: Infinity,
      foreground: { model: 'rgb', color: [204, 204, 204], valpha: 1 },
      l1: 0,
      l2: 0.6038273388553377,
    }

    expect(colors).toEqual(value)
  })
})
