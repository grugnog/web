/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { SectionContainer, SignOnForm } from '../general'

export function CtaSignonForm() {
  return (
    <VisibilitySensor partialVisibility>
      {({ isVisible }) => (
        <SectionContainer className={'bg-gray-100'}>
          <SignOnForm home isVisible={isVisible} />
        </SectionContainer>
      )}
    </VisibilitySensor>
  )
}
