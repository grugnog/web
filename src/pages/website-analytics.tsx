import React, { useMemo } from 'react'
import { red, grey, yellow } from '@material-ui/core/colors'
import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { VictoryLabel, VictoryTheme, VictoryBar, VictoryChart } from 'victory'
import { PageTitle, Drawer } from '@app/components/general'
import { analyticsData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { theme } from '@app-theme'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'

const useStyles = makeStyles(() => ({
  alignCenter: {
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  center: {
    justfiyContent: 'center',
    alignCenter: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  box: { marginTop: 30 },
  textLoader: {
    marginBottom: 30,
  },
  subtitle: {
    marginTop: 20,
    fontWeight: 500,
  },
}))

const getFill = (label: string) =>
  label === 'Errors' ? red[600] : label === 'Warnings' ? yellow[600] : grey[600]

function Analytics({ name }: PageProps) {
  const classes = useStyles()
  const { data: websiteData, loading: websiteLoading } = useWebsiteContext()
  const { data, error } = analyticsData(true)
  const { search } = useSearchFilter()

  const dataSource = useMemo(() => {
    return filterSort(data, search)
  }, [data, search])

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={'Analytics'} />
        <PageLoader
          loading={websiteLoading}
          hasWebsite={!!websiteData?.length}
          emptyTitle={'No Websites Added'}
          empty={dataSource?.length === 0}
          error={error}
        >
          <List>
            {dataSource?.map((source: any, i: number) => {
              return (
                <li key={`${source.pageUrl} ${i}`} className={classes.flex}>
                  <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 12 }}
                    height={180}
                  >
                    <VictoryLabel
                      text={source.pageUrl}
                      x={160}
                      y={22}
                      style={{ fill: theme.palette.text.secondary }}
                      textAnchor='middle'
                    />
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
                      events={[
                        {
                          target: 'data',
                          eventHandlers: {
                            onClick: () => {
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
                        },
                      ]}
                    />
                  </VictoryChart>
                </li>
              )
            })}
          </List>
        </PageLoader>
      </Drawer>
    </>
  )
}

export default metaSetter(
  { Analytics },
  {
    gql: true,
  }
)
