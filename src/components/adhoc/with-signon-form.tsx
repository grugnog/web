/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import dynamic from 'next/dynamic'
import { SignOnFormSkeleton } from '../placeholders'
/* eslint-disable */

const WithSignOnForm = dynamic(
  () => import('../general/signon-form').then((mod) => mod.SignOnForm) as any,
  {
    ssr: true,
    loading: () => <SignOnFormSkeleton loginView={false} />,
  }
)

export { WithSignOnForm }
