import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header, Header2 } from '@app/components/general/header'
import { companyName } from '@app/configs'

function Careers({ name }: PageProps) {
  return (
    <MarketingDrawer title={name}>
      <Header>Careers</Header>
      <Header2>Currently we are not hiring.</Header2>
      <p>We are a small team and decided to keep it like that.</p>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Careers },
  {
    description: `Want to improve ${companyName} and build cool web things? Open positions for the right person.`,
  }
)
