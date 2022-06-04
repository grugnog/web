import React from 'react'
import { red, grey, yellow } from '@material-ui/core/colors'
import { VictoryTheme, VictoryBar, VictoryChart } from 'victory'
import type { Analytic } from '@app/types'
import { theme } from '@app/theme'

const getFill = (label: string) =>
  label === 'Errors' ? red[600] : label === 'Warnings' ? yellow[600] : grey[600]

export function AnalyticsCell(source: Analytic) {
  const chartEvent: any = {
    target: 'data',
    eventHandlers: {
      onClick: (e: any) => {
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
      },
    },
  }

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ x: 12 }}
      height={180}
    >
      <VictoryBar
        style={{
          data: {
            fill: ({ datum }: any) => getFill(datum.x),
            fillOpacity: 0.7,
            strokeWidth: 3,
          },
          parent: {
            fontSize: 8,
            fill: theme.palette.text.primary,
          },
          labels: {
            fontSize: 7,
            fill: ({ datum }: any) => getFill(datum.x),
          },
        }}
        data={[
          {
            x: 'Errors',
            y: source.errorCount,
            fill: red[500],
          },
          {
            x: 'Warnings',
            y: source.warningCount,
            fill: yellow[500],
          },
          {
            x: 'Notices',
            y: source.noticeCount,
            fill: grey[500],
          },
        ]}
        // colorScale={[red[500], yellow[500], grey[500]]}
        labels={({ datum }: any) => (datum.y && datum.x) || ''}
        events={[chartEvent]}
      />
    </VictoryChart>
  )
}
