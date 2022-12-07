import { headers } from './headers'
import { generateStrings } from '../../strings'

const appName = 'A11yWatch'

export const strings = generateStrings({
  appName,
  headers,
  meta: {
    title: `${appName}: the open source web accessibility tool.`,
    description: `Build accessible websites with tools that monitor, fix, and guide web accessibility efficiency with ${appName}`,
  },
})
