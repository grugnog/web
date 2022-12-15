import React from 'react'
import { VictoryBar, VictoryChart } from 'victory'
import type { Analytic } from '@app/types'
import { theme } from '@app/theme'

// temp static colors
const darkGray = '#424242'
const lightGray = '#616161'
const darkYellow = '#f9a825'
const lightYellow = '#fbc02d'
const darkRed = '#c62828'
const lightRed = '#d32f2f'

// determine chart color
const getFill = (label: string) =>
  label === 'Errors' ? lightRed : label === 'Warnings' ? lightYellow : lightGray

// click event for chart mutations
const onChartClick = (e: any) => {
  e?.preventDefault()
  return [
    {
      target: 'data',
      mutation: ({ style }: any) => {
        return style.fill === darkGray
          ? null
          : {
              style: { fill: darkGray },
            }
      },
    },
    {
      target: 'labels',
      mutation: ({ text, datum }: any) => {
        return typeof text === 'number'
          ? { text: datum?.x }
          : { text: datum?.y }
      },
    },
  ]
}

// chart events
const chartEvent: any = {
  target: 'data',
  eventHandlers: {
    onClick: onChartClick,
  },
}

const chartLabels = ({ datum }: any) => datum.x

export function AnalyticsCell(source: Analytic) {
  return (
    <VictoryChart domainPadding={{ x: 18 }} height={170}>
      <VictoryBar
        style={{
          data: {
            fill: ({ datum }: any) => getFill(datum.x),
            fillOpacity: 0.7,
            strokeWidth: 3,
          },
          parent: {
            fontSize: 14,
            fill: theme.palette.text.primary,
          },
          labels: {
            fontSize: 12,
            fill: ({ datum }: any) => getFill(datum.x),
          },
        }}
        data={[
          {
            x: 'Errors',
            y: source.errorCount,
            fill: darkRed,
            label: '',
          },
          {
            x: 'Warnings',
            y: source.warningCount,
            fill: darkYellow,
            label: '',
          },
          {
            x: 'Notices',
            y: source.noticeCount,
            fill: darkGray,
            label: '',
          },
        ]}
        labels={chartLabels}
        events={[chartEvent]}
      />
    </VictoryChart>
  )
}
