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
