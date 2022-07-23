import { useRef } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { SectionContainer, SignOnForm } from '../general'

export function CtaSignonForm() {
  const loaded = useRef<boolean>(false)

  const onChange = (isVisible: boolean) => {
    if (!loaded?.current && isVisible) {
      loaded.current = true
    }
  }

  return (
    <VisibilitySensor partialVisibility onChange={onChange}>
      {({ isVisible }: { isVisible: boolean }) => {
        return (
          <SectionContainer>
            <SignOnForm
              home
              googleLoginSkeleton={!loaded.current && !isVisible}
            />
          </SectionContainer>
        )
      }}
    </VisibilitySensor>
  )
}
