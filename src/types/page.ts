/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export interface MetaData {
  /** Meta data page title */
  title?: string
  /** Meta data page description */
  description?: string
  /** Enable apollo gql */
  gql?: boolean
  /** ID: Component name or page name used in meta information */
  name?: string
}

export type PageProps = {
  name: string
  website?: any
}
