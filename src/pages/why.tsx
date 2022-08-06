import { Typography } from '@material-ui/core'
import { PageTitle, MarketingDrawer } from '@app/components/general'

import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName } from '@app/configs'

function Why({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>Why {companyName} vs X</PageTitle>
      <Typography variant='body1' component='p' gutterBottom>
        Stuck on a certain problem? Check some of these common gotchas first in
        the FAQ.
      </Typography>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Why },
  {
    description:
      'The benefits of A11yWatch compared amongst other web accessibility tools. See the stats on why you should pick us.',
  }
)
