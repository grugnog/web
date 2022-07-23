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
      '30 seconds of accessibility scans daily (35 - 2,000 pages)',
      'Root page checked daily',
      VISUAL_PLAYGROUND,
      '3 private API request a day',
      'Lighthouse on root page',
      'Limited support',
    ],
    cost: '$0/month',
    costYearly: '$0/month',
  },
  {
    title: 'Basic',
    subTitle: 'Great for production level web applications',
    details: [
      'Everything in Free',
      'Subdomain crawling',
      'Monitor up to 3 websites',
      '300 seconds of accessibility scans daily (300 - 20,000 pages)',
      'All pages checked daily',
      TRUSTED_CDN,
      'Custom scripts',
      '10,000+ AI Models for alt tag recognition',
      '100 private API request a day',
      'Email support',
    ],
    cost: '$10/month',
    costYearly: '$8/month',
  },
  {
    title: 'Premium',
    subTitle: 'Large workload websites and subdomains',
    details: [
      'Everything in Basic',
      'TLD crawling',
      'Monitor up to 8 websites',
      '800 seconds of accessibility scans daily (625 - 40,000 pages)',
      'Editable scripts',
      '500 private API request a day',
      'Advanced AI API calls for alt tag recognition',
      'Lighthouse on all pages',
      'Dedicated support',
    ],
    cost: '$20/month',
    costYearly: '$16/month',
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
