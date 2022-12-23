import { FC, PropsWithChildren, useCallback, useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { InnerWrapper } from '../general/lists/list-wrapper'

export const LazyMount: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
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
    <VisibilitySensor onChange={onChange}>
      {mounted ? (
        children
      ) : (
        <div className={className}>
          <InnerWrapper loading small />
        </div>
      )}
    </VisibilitySensor>
  )
}
