import { strings } from '@app-strings'
import type { MetaData, MetaFunction } from '@app/types/page'

interface Meta {
  [name: string]: MetaFunction
}

// meta enhance a component with providers and meta tags
export const metaSetter = (
  Component: Meta,
  { title, description, gql, rest, params, wasm }: MetaData = {}
): MetaFunction => {
  const componentKeys = Object.keys(Component)
  const keyName = componentKeys?.length ? String(componentKeys[0]) : ''
  const value = Component[keyName]
  const nameStripped = keyName.replace(/([A-Z])/g, ' $1')
  const name = nameStripped.replace(' ', '')

  // html meta data
  value.meta = {
    title:
      title ||
      `${strings.appName}: ${
        name.length <= 3 ? name.toLocaleUpperCase() : name
      }`,
    description,
    name,
  }

  value.params = params
  // component meta data for enhancements or features
  value.rest = rest
  value.gql = gql
  value.wasm = wasm

  return value
}
