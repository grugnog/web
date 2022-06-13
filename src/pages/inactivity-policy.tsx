import React from 'react'
import { Typography } from '@material-ui/core'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName } from '@app/configs'

function InactivityPolicy({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>{`InactivityPolicy ${strings.appName}`}</PageTitle>
      <Typography variant='body1' component='p' gutterBottom>
        Email squatting policy
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        We prohibit account email squatting, and account emails may not be
        inactively held for future use. Inactive accounts may be renamed or
        removed by our staff at their discretion. Keep in mind that not all
        activity on {companyName} is publicly visible like certain reports.
        Attempts to sell, buy, or solicit other forms of payment in exchange for
        account names are prohibited and may result in permanent account
        suspension. You have 90 days to confirm your email before your account
        is set to be deleted.
      </Typography>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { InactivityPolicy },
  {
    description: `See our inactivity policy and understand how it works to reduce being impacted by any rules.`,
  }
)
