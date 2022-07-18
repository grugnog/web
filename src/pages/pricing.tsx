import { Button, Typography } from '@material-ui/core'
import { MarketingDrawer, PriceMemo, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PricingCalculator } from '@app/components/general/pricing-calculator'

function Pricing({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} maxWidth={'xl'}>
      <PageTitle className={'w-3/4'}>
        The simplest accessibility solution, for the simplest price.
      </PageTitle>
      <Typography component='h2' gutterBottom className={'text-lg'}>
        Choose a plan that best fits your needs.
      </Typography>
      <PriceMemo navigate pricingPage />
      <div className='py-4'>
        <PricingCalculator />
      </div>
      <div className='p-5 bg-gray-100 my-5 space-y-3 rounded'>
        <h5 className='text-xl font-bold'>For Partners</h5>
        <div className='text-lg'>
          Apply to become partners as an approved agency, technology services,
          or professional services.
        </div>
        <Button
          variant='outlined'
          component={'a'}
          href={
            'mailto:support@a11ywatch.com' +
            '?subject=' +
            'Partner' +
            '&body=' +
            'I would like to find out more about your partnership.'
          }
        >
          Contact Us
        </Button>
      </div>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Pricing },
  {
    intercom: true,
    description:
      'Look at pricing plans to help improve accessibility for your project. Suited for small to large companies that need web accessibility assurance.',
  }
)
