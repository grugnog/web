import { MarketingDrawer, SignOnForm } from '@app/components/general'
import { MarketingShortTitle } from '@app/components/marketing'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Login({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing emptyFooter emptyNav>
      <MarketingShortTitle hidden />
      <SignOnForm loginView />
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Login },
  {
    description: 'Login in to get all your accessibility insight and more.',
    gql: true,
  }
)
