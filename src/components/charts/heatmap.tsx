import React, { memo, useEffect, useRef, useState } from 'react'
import { Group } from '@visx/group'
import genBins, { Bin, Bins } from '@visx/mock-data/lib/generators/genBins'
import type { scaleLinear as scaling } from '@visx/scale'
import { HeatmapCircle, HeatmapRect } from '@visx/heatmap'
import { getSeededRandom } from '@visx/mock-data'

const hot1 = '#77312f'
const hot2 = '#f33d15'
const cool1 = '#122549'
const cool2 = '#b4fbde'

const seededRandom = getSeededRandom(0.41)

const binData = genBins(
  16,
  16,
  /** binFunc */ (idx) => 150 * idx,
  /** countFunc */ (i, number) => 25 * (number - i) * seededRandom()
)

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value))
}

function min<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.min(...data.map(value))
}

// accessors
const bins = (d: Bins) => d.bins
const count = (d: Bin) => d.count

export type HeatmapProps = {
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
  separation?: number
  events?: boolean
  domain?: string
  liveData?: any
}

const defaultMargin = { top: 10, left: 20, right: 20, bottom: 10 }

const HeatMapComponent = ({
  width: defaultWidth = 350,
  height: defaultHeight = 300,
  events = false,
  margin = defaultMargin,
  separation = 20,
  liveData,
}: //   domain,
//   liveData,
HeatmapProps) => {
  const [wh, setWH] = useState<{ width: number; height: number }>({
    width: defaultWidth,
    height: defaultHeight,
  })
  const mounted = useRef<boolean>(false)
  const scaleLinear = useRef<typeof scaling>()

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      ;(async () => {
        scaleLinear.current = (await import('@visx/scale')).scaleLinear
        setWH({ height: window.innerHeight, width: window.innerWidth })
      })()
    }
  }, [mounted, setWH])

  const width = wh.width

  // bounds
  const size =
    width > margin.left + margin.right
      ? width - margin.left - margin.right - separation
      : width

  const xMax = size / 2
  const yMax = defaultHeight - margin.bottom - margin.top

  const colorMax = max(binData, (d) => max(bins(d), count))
  const bucketSizeMax = max(binData, (d) => bins(d).length)

  // scales
  const xScale =
    scaleLinear &&
    scaleLinear?.current &&
    scaleLinear.current<number>({
      domain: [0, binData.length],
    })
  const yScale =
    scaleLinear &&
    scaleLinear?.current &&
    scaleLinear.current<number>({
      domain: [0, bucketSizeMax],
    })
  const circleColorScale =
    scaleLinear &&
    scaleLinear?.current &&
    scaleLinear.current<string>({
      range: [hot1, hot2],
      domain: [0, colorMax],
    })
  const rectColorScale =
    scaleLinear &&
    scaleLinear?.current &&
    scaleLinear.current<string>({
      range: [cool1, cool2],
      domain: [0, colorMax],
    })
  const opacityScale =
    scaleLinear &&
    scaleLinear?.current &&
    scaleLinear.current<number>({
      range: [0.1, 1],
      domain: [0, colorMax],
    })

  const binWidth = xMax / binData.length
  const binHeight = yMax / bucketSizeMax
  const radius = min([binWidth, binHeight], (d) => d) / 2

  xScale?.range([0, xMax])
  yScale?.range([yMax, 0])

  console.log(binData, liveData)

  // page -> issuesInfo -> error count
  // page -> issuesInfo -> warning count

  return width < 10 ? null : (
    <svg width={'100%'} height={'100%'}>
      <rect x={0} y={0} width={'100%'} height={'100%'} fill={'transparent'} />
      <Group top={margin.top} left={margin.left}>
        <HeatmapCircle
          data={binData}
          xScale={(d) => (xScale ? xScale(d) ?? 0 : 0)}
          yScale={(d) => (yScale ? yScale(d) ?? 0 : 0)}
          colorScale={circleColorScale}
          opacityScale={opacityScale}
          radius={radius}
          gap={2}
        >
          {(heatmap) =>
            heatmap.map((heatmapBins) =>
              heatmapBins.map((bin) => (
                <circle
                  key={`heatmap-circle-${bin.row}-${bin.column}`}
                  className='visx-heatmap-circle'
                  cx={bin.cx}
                  cy={bin.cy}
                  r={bin.r}
                  fill={bin.color}
                  fillOpacity={bin.opacity}
                  onClick={() => {
                    if (!events) return
                    const { row, column } = bin
                    alert(JSON.stringify({ row, column, bin: bin.bin }))
                  }}
                />
              ))
            )
          }
        </HeatmapCircle>
      </Group>
      <Group top={margin.top} left={xMax + margin.left + separation}>
        <HeatmapRect
          data={binData}
          xScale={(d) => (xScale ? xScale(d) ?? 0 : 0)}
          yScale={(d) => (yScale ? yScale(d) ?? 0 : 0)}
          colorScale={rectColorScale}
          opacityScale={opacityScale}
          binWidth={binWidth}
          binHeight={binWidth}
          gap={2}
        >
          {(heatmap) =>
            heatmap.map((heatmapBins) =>
              heatmapBins.map((bin) => (
                <rect
                  key={`heatmap-rect-${bin.row}-${bin.column}`}
                  className='visx-heatmap-rect'
                  width={bin.width}
                  height={bin.height}
                  x={bin.x}
                  y={bin.y}
                  fill={bin.color}
                  fillOpacity={bin.opacity}
                  onClick={() => {
                    if (!events) {
                      return
                    }
                    // todo: display modal of issue.
                    const { row, column } = bin
                    alert(JSON.stringify({ row, column, bin: bin.bin }))
                  }}
                />
              ))
            )
          }
        </HeatmapRect>
      </Group>
    </svg>
  )
}

export const HeatMap = memo(HeatMapComponent)
