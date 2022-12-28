import { FC, PropsWithChildren, useCallback, useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { InnerWrapper } from '../general/lists/list-wrapper'

export const LazyMount: FC<
  PropsWithChildren<{ className?: string; full?: boolean }>
> = ({ children, className, full }) => {
  const [mounted, setMounted] = useState<boolean>(false)

  const onChange = useCallback(
    (isVisible: boolean) => {
      if (isVisible) {
        setMounted(true)
      }
    },
    [setMounted]
  )

  return (
    <VisibilitySensor
      onChange={onChange}
      partialVisibility={'top'}
      minTopValue={10}
    >
      {mounted ? (
        children
      ) : (
        <div className={className}>
          <InnerWrapper loading small full={full} />
        </div>
      )}
    </VisibilitySensor>
  )
}
