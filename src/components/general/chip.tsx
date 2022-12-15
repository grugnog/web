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
}

export const Chip: FC<PropsWithChildren<ChipProps>> = ({
  children,
  avatar,
  className,
  label,
  style,
  ...extra
}) => {
  return (
    <div
      className={classNames(
        'rounded-xl bg-gray-50 flex space-x-1 place-items-center text-xs border px-1 py-0.5 max-w-[95.147px] min-w-[76.8px] text-gray-700 truncate',
        className
      )}
      style={style}
      {...extra}
    >
      <div>{children || avatar}</div>
      {label ? <div>{label}</div> : null}
    </div>
  )
}
