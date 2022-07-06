import { strings } from '@app-strings'
import type { MetaData, MetaFunction } from '@app/types/page'

interface Meta {
  [name: string]: MetaFunction
}

export const metaSetter = (
  Component: Meta,
  { title, description, gql, rest, intercom, params, wasm }: MetaData = {}
): MetaFunction => {
  const componentKeys = Object.keys(Component)
  const keyName = componentKeys?.length ? String(componentKeys[0]) : ''
  const value = Component[keyName]
  const nameStripped = keyName.replace(/([A-Z])/g, ' $1')
  const name = nameStripped.replace(' ', '')

  // html meta data
  value.meta = {
    title:
      title ??
      `${strings.appName} - ${
        name.length <= 3 ? name.toLocaleUpperCase() : name
      }`,
    description,
    name,
  }

  // component meta data for enhancements or features
  value.rest = rest
  value.gql = gql
  value.params = params
  // determine to show intercom on page
  value.intercom = intercom
  value.wasm = wasm

  return value
}
