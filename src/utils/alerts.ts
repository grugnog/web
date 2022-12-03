import { AppManager } from '@app/managers'

// snack alert issue difference from previus results
export const alertIssueDifference = ({
  lastCount,
  nextCount,
}: {
  lastCount: number
  nextCount: number
}) => {
  let message = ''

  // issue count updated
  if (lastCount !== nextCount) {
    const issueDif = Math.abs(nextCount - lastCount)
    const issueMessage = nextCount > lastCount ? 'more' : 'less'
    message = `${issueDif} ${issueMessage} issue${
      issueDif === 1 ? '' : 's'
    } found`
  }

  AppManager.toggleSnack(true, message || 'No new issues found', 'message')
}
