/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { ribbon, wrap } from '@app/stylesheets/ribbon.module.css'

export function Ribbon({
  title = 'BEST OFFER',
  backgroundColor,
  color,
}: {
  title?: string
  backgroundColor?: string
  color?: string
}) {
  return (
    <div className={wrap}>
      <span className={ribbon} style={{ backgroundColor, color }}>
        {title}
      </span>
    </div>
  )
}
