import { screen } from '@testing-library/react'

import { describePage } from '../../describe-page'

describePage(
  {
    folder: 'index',
    name: 'Build Inclusive Websites Now',
    apollo: true,
  },
  () => {
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument()
  }
)
