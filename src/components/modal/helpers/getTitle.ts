import { strings } from '@app-strings'

export function getTitle(issues: any) {
  return issues?.length
    ? issues?.issues?.length
      ? `Issues found with `
      : `Scan complete`
    : strings.trySearch
}
