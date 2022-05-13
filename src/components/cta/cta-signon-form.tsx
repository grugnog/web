import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { WithSignOnForm } from '../adhoc'
import { SectionContainer } from '../general'
import { SignOnFormSkeleton } from '../placeholders'

export function CtaSignonForm() {
  let loaded = false
  return (
    <VisibilitySensor partialVisibility>
      {({ isVisible }) => {
        if (!loaded && isVisible) {
          loaded = true
        }
        return (
          <SectionContainer className={'bg-gray-100'}>
            {loaded ? <WithSignOnForm home /> : <SignOnFormSkeleton />}
          </SectionContainer>
        )
      }}
    </VisibilitySensor>
  )
}
