import { screen } from '@testing-library/react'

import { describePage } from '../../describe-page'

describePage(
  {
    folder: 'index',
    apollo: true,
  },
  () => {
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument()
  }
)
