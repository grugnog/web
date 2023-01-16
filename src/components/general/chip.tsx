import { classNames } from '@app/utils/classes'
import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from 'react'

interface ChipProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  avatar?: ReactElement
  className?: string
  label?: string | number
  style?: React.CSSProperties
  borderLess?: boolean
}

export const Chip: FC<PropsWithChildren<ChipProps>> = ({
  children,
  avatar,
  className,
  label,
  style,
  borderLess,
  ...extra
}) => {
  return (
    <div
      className={classNames(
        'rounded-xl flex gap-x-1 place-items-center text-xs px-1 py-0.5 max-w-[200px] truncate',
        className,
        borderLess ? '' : 'border'
      )}
      style={style}
      {...extra}
    >
      <div>{children || avatar}</div>
      {label ? label : null}
    </div>
  )
}
