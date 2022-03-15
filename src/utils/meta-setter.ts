import { strings } from '@app-strings'
import type { MetaData } from '@app/types/page'

interface MetaFunction extends Function {
  meta?: MetaData
  gql?: boolean
  intercom?: boolean
  params?: any
}

interface Meta {
  [name: string]: MetaFunction
}

export const metaSetter = (
  Component: Meta,
  { title, description, gql, intercom, params }: MetaData = {}
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
  value.gql = gql
  value.params = params
  // determine to show intercom on page
  value.intercom = intercom

  return value
}
