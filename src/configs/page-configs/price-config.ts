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
      'Daily email reports.',
      '2 daily manual page scans.',
      'Root domain scanned daily.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom editable scripts.',
      '3 Private API request daily.',
      'Chat Support.',
    ],
    Icon: FreeIcon,
    cost: '$0/month',
    costYearly: '$0/year',
  },
  {
    title: 'Basic',
    details: [
      'Monitor up to 4 websites.',
      'Daily full email reports.',
      '10 daily manual page scans.',
      'All pages scanned daily.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom editable scripts.',
      '100 Private API request daily.',
      'Basic Support.',
    ],
    Icon: PaidIcon,
    cost: '$9.99/month',
    costYearly: '$99.99/year',
  },
  {
    title: 'Premium',
    details: [
      'Monitor up to 10 websites.',
      'Daily full email reports.',
      '100 daily manual page scans.',
      'All pages scanned multiple times daily.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom editable scripts.',
      '500 Private API request daily.',
      'Premium Support.',
    ],
    Icon: PreemiumIcon,
    cost: '$19.99/month',
    costYearly: '$199.99/year',
  },
  {
    title: 'Enterprise',
    details: [
      'Monitor unlimited websites.',
      'Daily full email reports.',
      'Unlimited daily manual page scans.',
      'All pages scanned multiple times daily.',
      TRUSTED_CDN,
      VISUAL_PLAYGROUND,
      'Custom editable scripts.',
      '1000+ Private API request daily.',
      'Enterprise Support.',
    ],
    Icon: WhatsHot,
    cost: 'Contact Us',
    costYearly: 'Contact Us',
  },
]

export const priceConfig = {
  plans,
}
