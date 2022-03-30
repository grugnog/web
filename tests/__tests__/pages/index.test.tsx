import { screen } from '@testing-library/react'

import { describePage } from '../../describe-page'

describePage(
  {
    folder: 'index',
    name: 'Web Accessibility Monitoring',
    apollo: true,
  },
  () => {
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument()
  }
)
