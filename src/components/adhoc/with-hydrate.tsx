/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useEffect, memo } from 'react'
import { userModel } from '@app/data'

function WithHydrateComponent({ children }: { children?: any }): any {
  useEffect(() => {
    userModel.initModel({
      cookie:
        typeof navigator !== 'undefined' &&
        typeof document !== 'undefined' &&
        navigator.cookieEnabled &&
        document.cookie,
    })
  }, [])
  return children
}

export const WithHydrate = memo(WithHydrateComponent)
