/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { screen } from '@testing-library/react'

import { describePage } from '../../describe-page'

describePage(
  {
    folder: 'index',
    name: 'Web Accessibility Automation',
    apollo: true,
  },
  () => {
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument()
  }
)
