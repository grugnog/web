// import { strings } from '@app-strings'

const TRUSTED_CDN = 'Personal secure CDN.'
const VISUAL_PLAYGROUND = 'Visual website playground.'

const plans = [
  {
    title: 'Free',
    details: [
      'Monitor 1 website.',
      'Daily email reports.',
      '2 site-wide scans a day.',
      'Root page checked a day.',
      VISUAL_PLAYGROUND,
      '3 private API request a day.',
      'Lighthouse on root page.',
      'Email support',
    ],
    cost: '$0/month',
    costYearly: '$0/year',
  },
  {
    title: 'Basic',
    details: [
      'Monitor up to 4 websites.',
      'Daily email reports.',
      '10 site-wide scans a day.',
      'All pages checked frequently.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom editable scripts.',
      '100 private API request a day.',
      'Lighthouse on all pages.',
      'Chat and email support.',
    ],
    cost: '$9.99/month',
    costYearly: '$99.99/year',
  },
  {
    title: 'Premium',
    details: [
      'Monitor up to 10 websites.',
      'Daily email reports.',
      '100 site-wide scans a day.',
      'All pages checked often.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom editable scripts.',
      '500 private API request a day.',
      'Lighthouse on all pages.',
      'Dedicated support.',
    ],
    cost: '$19.99/month',
    costYearly: '$199.99/year',
  },
  {
    title: 'Enterprise',
    details: [
      'Monitor unlimited websites.',
      'Daily email reports.',
      '1k+ site-wide scans a day.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom editable scripts.',
      'Custom API usage limits.',
      'Lighthouse on all pages',
      'Enterprise support.',
      'Code audits & professional services',
    ],
    cost: 'Contact Us',
    costYearly: 'Contact Us',
  },
]

export const priceConfig = {
  plans,
}
