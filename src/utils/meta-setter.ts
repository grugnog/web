/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { strings } from '@app-strings'
import type { MetaData } from '@app/types'

interface MetaFunction extends Function {
  meta?: MetaData
  gql?: boolean
  intercom?: boolean
}

interface Meta {
  [name: string]: MetaFunction
}

export const metaSetter = (
  Component: Meta,
  { title, description, gql, intercom }: MetaData = {}
): MetaFunction => {
  const componentKeys = Object.keys(Component)
  const keyName = componentKeys?.length ? String(componentKeys[0]) : ''
  const value = Component[keyName]
  const nameStripped = keyName.replace(/([A-Z])/g, ' $1')
  const name = nameStripped.replace(' ', '')

  value.meta = {
    title:
      title ??
      `${strings.appName} - ${
        name.length <= 3 ? name.toLocaleUpperCase() : name
      }`,
    description,
    name,
  }

  value.gql = gql
  value.intercom = intercom

  return value
}
