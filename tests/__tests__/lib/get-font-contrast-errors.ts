import { getFontContrastErrors } from '@app/lib'

describe('determine font contrast util', () => {
  it('renders without crashing', () => {
    const contrastIssues = getFontContrastErrors({
      elementFontSize: 12,
      contrastRatio: 3.5,
    })

    const value = {
      contrastFontError: false,
      errorAALarge: false,
      errorAASmall: false,
      warningAALarge: false,
      warningAASmall: false,
    }

    expect(contrastIssues).toEqual(value)
  })
})
