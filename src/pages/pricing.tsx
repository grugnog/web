import { Button } from '@material-ui/core'
import { MarketingDrawer, PriceMemo, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PricingCalculator } from '@app/components/general/pricing-calculator'

function Pricing({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} maxWidth={'xl'}>
      <PageTitle className={'w-3/4'}>The right plan just for you.</PageTitle>
      <h2 className={'text-base pb-2'}>
        Choose a plan that best fits your needs. Pay yearly, get 2 months free.
      </h2>
      <PriceMemo navigate pricingPage />
      <div className='py-4 text-center'>
        <p>
          The accessibility scan duration is measured strictly based on the time
          it takes for the DOM to load.
        </p>
        <p>
          All scans are ran in parallel so 30 seconds may be equal to 1 second
          in real time.
        </p>
        <p className={'text-blue-600 font-bold'}>
          The faster your website is the more uptime you get.
        </p>
      </div>

      <PricingCalculator />

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
