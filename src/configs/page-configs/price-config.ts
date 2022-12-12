const TRUSTED_CDN = 'Embed custom script safeguard'
const VISUAL_PLAYGROUND = 'Visual website playground'

const feats = [
  '50 domains',
  'Wildcard subdomains and tld monitoring',
  'All pages checked daily with email status reports',
  TRUSTED_CDN,
  VISUAL_PLAYGROUND,
  '10,000+ AI Models for alt tag recognition',
  'Lighthouse reports across all pages',
  'Direct code fixes in any language',
  'Unlimited API request',
  // 'Email support',
]

const lPlans = [
  {
    title: 'L1',
    details: ['300 seconds daily uptime'],
    cost: '$14/month',
    costYearly: '$12/month',
    pageCount: 500,
  },
  {
    title: 'L2',
    details: ['600 seconds daily uptime'],
    cost: '$24/month',
    costYearly: '$20/month',
    pageCount: 1000,
  },
  {
    title: 'L3',
    details: ['1,400 seconds daily uptime'],
    cost: '$44/month',
    costYearly: '$37/month',
    pageCount: 2300,
  },
  {
    title: 'L4',
    details: ['2,000 seconds daily uptime'],
    cost: '$54/month',
    costYearly: '$45/month',
    pageCount: 3200,
  },
  {
    title: 'L5',
    details: ['4,000 seconds daily uptime'],
    cost: '$84/month',
    costYearly: '$70/month',
    pageCount: 6400,
  },
]

const hPlans = [
  {
    title: 'H1',
    details: ['5,000 seconds daily uptime'],
    cost: '$94/month',
    costYearly: '$78/month',
    pageCount: 8000,
  },
  {
    title: 'H2',
    details: ['10,000 seconds daily uptime'],
    cost: '$134/month',
    costYearly: '$112/month',
    pageCount: 16000,
  },
  {
    title: 'H3',
    details: ['20,000 seconds daily uptime'],
    cost: '$194/month',
    costYearly: '$161/month',
    pageCount: 32000,
  },
  {
    title: 'H4',
    details: ['35,000 seconds daily uptime'],
    cost: '$334/month',
    costYearly: '$278/month',
    pageCount: 56000,
  },
  {
    title: 'H5',
    details: ['60,000 seconds daily uptime'],
    cost: '$544/month',
    costYearly: '$453/month',
    pageCount: 100000,
  },
]

export const priceConfig = {
  lPlans,
  hPlans,
  feats,
}
