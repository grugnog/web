/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Grow } from '@material-ui/core'

function Transition(props: unknown, ref: any) {
  return <Grow ref={ref} style={{ overflowY: 'hidden' }} {...props} />
}

export const GrowTransition = React.forwardRef(Transition)
