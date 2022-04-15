import dynamic from 'next/dynamic'
import { CustomersSkeleton } from '../placeholders'

export const WithCtaCustomers = dynamic(
  () =>
    import('../cta/cta-customers').then(
      ({ CtaCustomers }: { CtaCustomers: React.ReactNode }) => CtaCustomers
    ) as any,
  {
    ssr: false,
    loading: () => <CustomersSkeleton />,
  }
)

WithCtaCustomers.displayName = 'WithCtaCustomers'
