import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header, Header2, Header3 } from '@app/components/general/header'
import { companyName } from '@app/configs'

function Careers({ name }: PageProps) {
  return (
    <MarketingDrawer title={name}>
      <Header>Careers</Header>
      <Header2>Currently {`we’re`} not hiring.</Header2>
      <p>We are a small team and decided to keep it like that.</p>
      <Header3>Profit and Sustainability</Header3>
      <p>
        We currently are fully bootstrapped and self funded. As well as not
        looking for investors either.
      </p>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Careers },
  {
    description: `Want to improve ${companyName} and build cool web things? Open positions for the right person.`,
  }
)
