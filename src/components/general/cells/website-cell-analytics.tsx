import React from 'react'
import { red, grey, yellow } from '@material-ui/core/colors'
import { VictoryBar, VictoryChart } from 'victory'
import type { Analytic } from '@app/types'
import { theme } from '@app/theme'

// determine chart color
const getFill = (label: string) =>
  label === 'Errors' ? red[700] : label === 'Warnings' ? yellow[700] : grey[700]

// click event for chart mutations
const onChartClick = (e: any) => {
  e?.preventDefault()
  return [
    {
      target: 'data',
      mutation: ({ style }: any) => {
        return style.fill === grey[800]
          ? null
          : {
              style: { fill: grey[800] },
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
            fill: red[800],
            label: '',
          },
          {
            x: 'Warnings',
            y: source.warningCount,
            fill: yellow[800],
            label: '',
          },
          {
            x: 'Notices',
            y: source.noticeCount,
            fill: grey[800],
            label: '',
          },
        ]}
        labels={chartLabels}
        events={[chartEvent]}
      />
    </VictoryChart>
  )
}
