import { format } from 'date-fns'
import { useMemo } from 'react'

export const useBillingDisplay = (invoice: any) => {
  const billingtitle = useMemo(() => {
    let title

    if (invoice) {
      title =
        invoice?.billing_reason === 'upcoming' && invoice?.next_payment_attempt
          ? `${format(
              new Date(invoice?.next_payment_attempt * 1000),
              'dd/MM/yyyy'
            )} - ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(invoice.total / 100)}`
          : `${invoice?.billing_reason} - Owed: ${invoice?.amount_due} Paid: ${invoice?.amount_paid} Total: ${invoice?.total}`
    }
    return title
  }, [invoice])

  const billingHeadDisplay =
    invoice?.billing_reason === 'upcoming' ? 'Upcoming Invoice' : 'Invoice'

  return {
    billingtitle,
    billingHeadDisplay,
  }
}
