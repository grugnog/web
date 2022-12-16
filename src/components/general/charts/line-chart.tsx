import { Analytic } from '@app/types'
import { useMemo } from 'react'
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory'

interface LineChartProps {
  title?: string // page title
  data?: Analytic[]
}

// web safe colors for charts
const BLUE_COLOR = '#00a3de'
const RED_COLOR = '#7c270b'

// chart styles
const styles = {
  title: {
    textAnchor: 'start',
    verticalAnchor: 'end',
  },
  labelNumber: {
    textAnchor: 'middle',
    fill: '#fff',
    fontFamily: 'inherit',
    fontSize: '6px',
  },
  axisOne: {
    axis: { stroke: RED_COLOR, strokeWidth: 0 },
    ticks: { strokeWidth: 0 },
    tickLabels: {
      fill: RED_COLOR,
      fontFamily: 'inherit',
      fontSize: 7,
    },
  },
  labelOne: {
    fill: RED_COLOR,
    fontFamily: 'inherit',
    fontSize: 8,
    fontStyle: 'italic',
  },
  lineOne: {
    data: { stroke: RED_COLOR, strokeWidth: 0.8 },
  },
  axisTwo: {
    axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
    tickLabels: {
      fill: BLUE_COLOR,
      fontFamily: 'inherit',
      fontSize: 7,
    },
  },
  labelTwo: {
    textAnchor: 'end',
    fill: BLUE_COLOR,
    fontFamily: 'inherit',
    fontSize: 8,
    fontStyle: 'italic',
  },
  lineTwo: {
    data: { stroke: BLUE_COLOR, strokeWidth: 0.8 },
  },
}

// error line chart for warnings, errors
export const LineChart = ({ title, data }: LineChartProps) => {
  const {
    first,
    second,
    ticks,
    highestError,
    highestWarning,
    totalErrors,
    totalWarnings,
  } = useMemo(() => {
    const firstSet = []
    const secondSet = []
    const tickSet = []

    let maxErrorValue = 0
    let maxWarningValue = 0

    let tErrors = 0
    let tWarnings = 0

    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]

        const errorCount = item.errorCount
        const warningCount = item.warningCount
        const label = item.pageUrl

        if (errorCount) {
          tErrors += errorCount

          if (errorCount > maxErrorValue) {
            maxErrorValue = errorCount
          }
        }

        if (warningCount) {
          tWarnings += warningCount
          if (warningCount && warningCount > maxWarningValue) {
            maxWarningValue = warningCount
          }
        }

        firstSet.push({
          x: i,
          y: errorCount,
          l: `${errorCount} error${errorCount === 1 ? '' : 's'} - ${label}`,
        })
        secondSet.push({
          x: i,
          y: warningCount,
          l: `${warningCount} warning${
            warningCount === 1 ? '' : 's'
          } - ${label}`,
        })
        tickSet.push(label)
      }
    }

    return {
      first: firstSet,
      second: secondSet,
      ticks: tickSet,
      highestError: maxErrorValue,
      highestWarning: maxWarningValue,
      totalWarnings: tWarnings,
      totalErrors: tErrors,
    }
  }, [data])

  return (
    <VictoryChart
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => datum.l}
          labelComponent={
            <VictoryTooltip constrainToVisibleArea style={{ fontSize: 7 }} />
          }
        />
      }
    >
      <svg className='box-border w-full' viewBox='0 0 450 350'>
        <rect
          x='0'
          y='0'
          width='10'
          height='30'
          className={
            totalErrors > totalWarnings ? 'fill-red-600' : 'fill-blue-600'
          }
        />
        <rect
          x='430'
          y='10'
          width='20'
          height='20'
          className='fill-slate-600'
        />

        <VictoryLabel
          x={25}
          y={24}
          style={styles.title}
          className={'fill-gray-700'}
          text={title ?? 'Website Audit'}
        />
        <VictoryLabel
          x={25}
          y={33.5}
          className={'fill-gray-600 text-sm'}
          style={{ fontSize: 10, fill: '#525252' }}
          text={`${totalErrors} error${
            totalErrors === 1 ? '' : 's'
          } and ${totalWarnings} warning${
            totalWarnings === 1 ? '' : 's'
          } across ${ticks.length} page${ticks.length === 1 ? '' : 's'}`}
        />

        <VictoryLabel
          x={440}
          y={20}
          style={styles.labelNumber}
          text={`${ticks.length}p`}
        />
        <VictoryLabel
          x={25}
          y={55}
          style={styles.labelOne}
          text={'Errors across pages'}
        />
        <VictoryLabel
          x={425}
          y={55}
          style={styles.labelTwo}
          text={'Warnings'}
        />
        <g transform={'translate(0, 33)'}>
          <VictoryAxis
            dependentAxis
            offsetX={20}
            orientation='left'
            standalone={false}
            domain={[0, highestError]}
            style={styles.axisOne}
          />
          <VictoryAxis
            dependentAxis
            offsetX={20}
            orientation='right'
            domain={[0, highestWarning]}
            standalone={false}
            style={styles.axisTwo}
          />
          <VictoryLine
            data={first}
            standalone={false}
            padding={20}
            style={styles.lineOne}
          />
          <VictoryLine
            data={second}
            standalone={false}
            style={styles.lineTwo}
            padding={20}
          />
        </g>
      </svg>
    </VictoryChart>
  )
}
