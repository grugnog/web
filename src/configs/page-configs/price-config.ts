// import { strings } from '@app-strings'

const TRUSTED_CDN = 'Personal secure CDN'
const VISUAL_PLAYGROUND = 'Visual website playground'

const plans = [
  {
    title: 'Free',
    subTitle: 'Perfect for small hobby projects & websites',
    details: [
      'Monitor 1 website',
      'Daily email reports',
      '2 site-wide scans a day',
      'Root page checked daily',
      VISUAL_PLAYGROUND,
      '3 private API request a day',
      'API',
      'Lighthouse on root page',
      'Limited support',
    ],
    cost: '$0/month',
    costYearly: '$0/year',
  },
  {
    title: 'Basic',
    subTitle: 'Great for production level web applications',
    details: [
      'Everything in Free',
      'Subdomain crawling',
      'Monitor up to 3 websites',
      '10 site-wide scans a day',
      'All pages checked daily',
      TRUSTED_CDN,
      'Custom scripts',
      '100 AI Models for alt tag recognition',
      '100 private API request a day',
      'Email support',
    ],
    cost: '$9.99/month',
    costYearly: '$99.99/year',
  },
  {
    title: 'Premium',
    subTitle: 'Large workload websites and subdomains',
    details: [
      'Everything in Basic',
      'TLD crawling',
      'Monitor up to 8 websites',
      '100 site-wide scans a day',
      'Editable scripts',
      '500 private API request a day',
      '20 Advanced AI API calls for alt tag recognition per day',
      'Lighthouse on all pages',
      'Dedicated support',
    ],
    cost: '$19.99/month',
    costYearly: '$199.99/year',
  },
  {
    title: 'Enterprise',
    subTitle: 'Custom workloads and integrations at hand',
    details: [
      'Everything in Premium',
      'Custom websites monitoring limit',
      'Custom site-wide scan limit',
      'Custom contracts & invoicing',
      'Custom API usage limits',
      '24×7 enterprise support',
      'Code audits & professional services',
    ],
    cost: 'Contact Us',
    costYearly: 'Contact Us',
  },
]

export const priceConfig = {
  plans,
}
