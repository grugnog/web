const TRUSTED_CDN = 'Embed code script safeguard'
const VISUAL_PLAYGROUND = 'Visual website playground'

const feats = [
  'up to 50 domains',
  'Wildcard subdomains and tld monitoring',
  'All pages checked daily with email status reports',
  TRUSTED_CDN,
  VISUAL_PLAYGROUND,
  '10,000+ AI Models for alt tag recognition',
  'PageSpeed reports across all pages',
  'Direct code fixes in any language',
  'Unlimited API request',
  // 'Email support',
]

const lPlans = [
  {
    title: 'L1',
    details: ['up to 300 seconds daily scanning'],
    cost: '$14/month',
    costYearly: '$12/month',
  },
  {
    title: 'L2',
    details: ['up to 600 seconds daily scanning'],
    cost: '$24/month',
    costYearly: '$20/month',
  },
  {
    title: 'L3',
    details: ['up to 1,400 seconds daily scanning'],
    cost: '$44/month',
    costYearly: '$37/month',
  },
  {
    title: 'L4',
    details: ['up to 2,000 seconds daily scanning'],
    cost: '$54/month',
    costYearly: '$45/month',
  },
  {
    title: 'L5',
    details: ['up to 4,000 seconds daily scanning'],
    cost: '$84/month',
    costYearly: '$70/month',
  },
]

const hPlans = [
  {
    title: 'H1',
    details: ['up to 5,000 seconds daily scanning'],
    cost: '$94/month',
    costYearly: '$78/month',
  },
  {
    title: 'H2',
    details: ['up to 10,000 seconds daily scanning'],
    cost: '$134/month',
    costYearly: '$112/month',
  },
  {
    title: 'H3',
    details: ['up to 20,000 seconds daily scanning'],
    cost: '$194/month',
    costYearly: '$161/month',
  },
  {
    title: 'H4',
    details: ['up to 35,000 seconds daily scanning'],
    cost: '$334/month',
    costYearly: '$278/month',
  },
  {
    title: 'H5',
    details: ['up to 60,000 seconds daily scanning'],
    cost: '$544/month',
    costYearly: '$453/month',
  },
]

export const priceConfig = {
  lPlans,
  hPlans,
  feats,
}
