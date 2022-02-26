/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

// import { strings } from '@app-strings'

import {
  SentimentSatisfiedAlt as PaidIcon,
  SentimentSatisfied as FreeIcon,
  SentimentVerySatisfied as PreemiumIcon,
  WhatshotOutlined as WhatsHot,
} from '@material-ui/icons'

const TRUSTED_CDN = 'Personal secure CDN.'
const VISUAL_PLAYGROUND = 'Visual website playground.'

const plans = [
  {
    title: 'Free',
    details: [
      'Monitor 1 website.',
      'Web accessibility email reports.',
      '2 manual page scans a day.',
      'Root domain checked once per day.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom viewable scripts.',
      '3 Private API request a day.',
      'Lighthouse on root domain.',
      'Email Support',
    ],
    Icon: FreeIcon,
    cost: '$0/month',
    costYearly: '$0/year',
  },
  {
    title: 'Basic',
    details: [
      'Monitor up to 4 websites.',
      'Web accessibility email reports.',
      '10 manual page scans a day.',
      'All pages checked frequently.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom editable scripts.',
      '100 Private API request a day.',
      'Lighthouse on all pages.',
      'Chat and Email Support.',
    ],
    Icon: PaidIcon,
    cost: '$9.99/month',
    costYearly: '$99.99/year',
  },
  {
    title: 'Premium',
    details: [
      'Monitor up to 10 websites.',
      'Web accessibility full email reports.',
      '100 manual page scans a day.',
      'All pages and subdomains checked often.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom editable scripts.',
      '500 Private API request a day.',
      'Lighthouse on all pages.',
      'Dedicated Support.',
    ],
    Icon: PreemiumIcon,
    cost: '$19.99/month',
    costYearly: '$199.99/year',
  },
  {
    title: 'Enterprise',
    details: [
      'Monitor unlimited websites.',
      'Web accessibility advanced email reports.',
      '1k+ manual page scans a day.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom editable scripts.',
      'Custom limit private API request per day.',
      'Lighthouse on all pages',
      'Enterprise Support.',
      'Code Audits & Professional Services',
    ],
    Icon: WhatsHot,
    cost: 'Contact Us',
    costYearly: 'Contact Us',
  },
]

export const priceConfig = {
  plans,
}
