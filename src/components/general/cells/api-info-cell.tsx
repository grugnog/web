import React, { memo, useState } from 'react'

import { API_ENDPOINT } from '@app/configs'

const methodColor = (method: string, t: 'color' | 'border') => {
  let c = ''

  switch (method) {
    case 'POST':
      {
        c = t === 'color' ? 'text-green-700' : 'border-green-700'
      }
      break
    case 'GET':
      {
        c = t === 'color' ? 'text-blue-700' : 'border-blue-700'
      }
      break
    case 'PUT':
      {
        c = t === 'color' ? 'text-yellow-700' : 'border-yellow-700'
      }
      break
    case 'DELETE':
      {
        c = t === 'color' ? 'text-red-700' : 'border-red-700'
      }
      break
    default:
      {
        c = t === 'color' ? 'text-blue-700' : 'border-blue-700'
      }
      break
  }

  return c
}

const ApiCellComponent = ({ route, keyVisible, token }: any) => {
  const [sectionVisible, setSectionVisible] = useState<boolean>(false)
  const onToggleSection = () => {
    setSectionVisible((e) => !e)
  }

  const routeParams = route?.params

  const params = routeParams ? Object.keys(routeParams) : null

  return (
    <li className={'text-base border-2 rounded'}>
      <button
        onClick={onToggleSection}
        className={'w-full border-0 text-left p-3 m-0 hover:bg-gray-200'}
        aria-label={`toggle section visible for ${route.title}`}
      >
        <div>
          <p className='text-2xl font-bold text-gray-800'>{route.title}</p>
          <p className='text-base'>{route.info}</p>
        </div>
      </button>
      <div
        className={`${sectionVisible ? 'visible border-t' : 'hidden'} p-3 py-2`}
        aria-hidden={!sectionVisible}
      >
        <div className='pb-2 space-y-2'>
          <p className='text-lg'>
            {API_ENDPOINT}/{route.pathName}
          </p>

          <span
            className={`border rounded ${methodColor(
              route.method,
              'border'
            )} px-3 py-1 min-w-[60px] inline-block text-center`}
          >
            <span
              aria-label={`HTTP request method type ${route.method}`}
              className={`font-bold text-sm ${methodColor(
                route.method,
                'color'
              )}`}
            >
              {route.method}
            </span>
          </span>
        </div>
        {params ? (
          <div className='space-y-1 pb-2'>
            {params?.map((item: any, i) => {
              const { desc, type, optional } = routeParams[item] ?? {
                desc: '',
                type: '',
                optional: false,
              }

              return (
                <span
                  key={`params-${i}`}
                  className={'block border rounded py-1 px-3'}
                >
                  <span className='block text-lg'>
                    {item} <span className='text-green-700'>{type}</span>
                  </span>
                  <span className='text-sm text-gray-800 block'>{desc}</span>
                  <span
                    className={`text-xs font-bold block ${
                      optional ? 'text-gray-700' : 'text-red-700'
                    }`}
                  >
                    {optional ? 'Optional' : 'Required'}
                  </span>
                </span>
              )
            })}
          </div>
        ) : null}
        <code className='border block p-2 rounded bg-[#0E1116] text-white text-base overflow-auto'>
          {`curl --location --request ${
            route.method ?? 'POST'
          } '${API_ENDPOINT}/${route.pathName}' \
--header 'Authorization: ${keyVisible ? token : '$A11YWATCH_TOKEN'}'
${
  route.method === 'POST'
    ? `\ --header 'Content-Type: application/x-www-form-urlencoded'`
    : ''
} \
${route.encodedParams}`}
        </code>
      </div>
    </li>
  )
}

export const ApiCell = memo(ApiCellComponent)
