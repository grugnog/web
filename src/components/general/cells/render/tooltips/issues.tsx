import { memo } from 'react'
import { GrStatusWarning } from 'react-icons/gr'
import { Chip } from '@app/components/general/chip'

interface TooltipIssuesProps {
  totalIssues: number
  totalPageIssues: number
}

export function TooltipIssuesComponent({
  totalPageIssues,
  totalIssues,
}: TooltipIssuesProps) {
  if (!totalIssues) {
    return null
  }

  return (
    <Chip
      className={'mr-1.5 md:mr-2.5'}
      avatar={<GrStatusWarning />}
      label={`${totalIssues} issue${totalIssues === 1 ? '' : 's'}`}
      title={`${totalIssues} issue${
        totalIssues === 1 ? '' : 's'
      } across ${totalPageIssues} page${
        totalPageIssues === 1 || !totalPageIssues ? '' : 's'
      }`}
    />
  )
}

export const TooltipIssues = memo(TooltipIssuesComponent)
