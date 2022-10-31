// import { strings } from '@app-strings'

const TRUSTED_CDN = 'Personal secure CDN'
const VISUAL_PLAYGROUND = 'Visual website playground'

const grandfatherPlans = [
  {
    title: 'Free',
    subTitle: 'Perfect for small hobby projects & websites',
    details: [
      '1 source hostname',
      'Daily email reports',
      '30 seconds daily of scanning',
      'Root page checked daily',
      VISUAL_PLAYGROUND,
      '3 private API request a day',
      'PageSpeed Insights on root page',
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
      '3 source hostnames',
      'Wildcard subdomains',
      '300 seconds daily of scanning',
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
      '8 source hostnames',
      'Wildcard tlds',
      '800 seconds daily of scanning',
      'Editable scripts',
      '500 private API request a day',
      'Advanced AI API calls for alt tag recognition',
      'PageSpeed Insights on all pages',
      'Dedicated support',
    ],
    cost: '$20/month',
    costYearly: '$16/month',
  },
]

const feats = [
  'up to 50 websites domains',
  'Wildcard subdomains and tlds',
  'All pages checked daily with email reports',
  TRUSTED_CDN,
  'Editable scripts',
  'Unlimited API request',
  '10,000+ AI Models for alt tag recognition',
  'PageSpeed Insights on all pages',
  'Unlimited API request',
  // 'Daily email reports',
  // 'Email support',
]

const lPlans = [
  {
    title: 'L1',
    details: ['up to 500 seconds daily scanning'],
    cost: '$14/month',
    costYearly: '$12/month',
  },
  {
    title: 'L2',
    details: ['up to 1000 seconds daily scanning'],
    cost: '$24/month',
    costYearly: '$20/month',
  },
  {
    title: 'L3',
    details: ['up to 2,000 seconds daily scanning'],
    cost: '$44/month',
    costYearly: '$37/month',
  },
  {
    title: 'L4',
    details: ['up to 5,000 seconds daily scanning'],
    cost: '$54/month',
    costYearly: '$45/month',
  },
  {
    title: 'L5',
    details: ['up to 15,000 seconds daily scanning'],
    cost: '$84/month',
    costYearly: '$70/month',
  },
]

const hPlans = [
  {
    title: 'H1',
    details: ['up to 50,000 seconds daily scanning'],
    cost: '$94/month',
    costYearly: '$78/month',
  },
  {
    title: 'H2',
    details: ['up to 100,000 seconds daily scanning'],
    cost: '$134/month',
    costYearly: '$112/month',
  },
  {
    title: 'H3',
    details: ['up to 200,000 seconds daily scanning'],
    cost: '$194/month',
    costYearly: '$161/month',
  },
  {
    title: 'H4',
    details: ['up to 300,000 seconds daily scanning'],
    cost: '$334/month',
    costYearly: '$278/month',
  },
  {
    title: 'H5',
    details: ['up to 500,000 seconds daily scanning'],
    cost: '$544/month',
    costYearly: '$453/month',
  },
]

export const priceConfig = {
  grandfatherPlans, // unused - old pre v1
  lPlans,
  hPlans,
  feats,
}
