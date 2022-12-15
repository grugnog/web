import { MarketingDrawer } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName } from '@app/configs'
import { Header, Header2, Header3 } from '@app/components/general/header'
import { SectionContainer } from '@app/components/stateless/containers/section-container'

function InactivityPolicy({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>{`Inactivity Policy ${strings.appName}`}</Header>
        <p className='pb-4'>Email squatting policy</p>
        <p>
          We prohibit account email squatting, and account emails may not be
          inactively held for future use. Inactive accounts may be renamed or
          removed by our staff at their discretion. Keep in mind that not all
          activity on {companyName} is publicly visible like certain reports.
          Attempts to sell, buy, or solicit other forms of payment in exchange
          for account names are prohibited and may result in permanent account
          suspension. You have 90 days to confirm your email before your account
          is set to be deleted.
        </p>
        <Header2>Re-activiting accounts</Header2>
        <p>
          If you have an email that was banned you need to reach out to{' '}
          <a
            href='mailto:support@a11ywatch.com'
            className='underline text-base'
          >
            support
          </a>{' '}
          to determine if the ban should be lifted.
        </p>
        <Header3>Rules that make sense</Header3>
        <p>
          Without the rules in place we would suffer loses that could prevent
          our service from being free to start and less time across the system
          to perform web accessibility checks and balances.
        </p>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { InactivityPolicy },
  {
    description: `See our inactivity policy and understand how it works to reduce being impacted by any rules.`,
  }
)
