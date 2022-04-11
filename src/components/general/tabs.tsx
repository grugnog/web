import { useCallback, useState } from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type TabPanelProps = {
  children: any
  index: any
  value: any
  className: any
}

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
    '& > section': {
      height: '100% !important',
      width: '100% !important',
    },
  },
  wrapper: {
    height: '100%',
    width: '100%',
  },
}))

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`a11y-tabpanel-${index}`}
      aria-labelledby={`a11y-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `a11y-tab-${index}`,
    'aria-controls': `a11y-tabpanel-${index}`,
  }
}

export function WebsiteTabs({ issues, html, playground }: any) {
  const [value, setValue] = useState<number>(0)
  const classes = useStyles()

  const handleChange = useCallback((_: any, newValue: number) => {
    setValue(newValue)
  }, [])

  const playgroundIndex = !html ? 1 : 2

  return (
    <div className={classes.wrapper}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='tabs to compare problems and fixes'
        variant={'fullWidth'}
      >
        <Tab label='Insights' {...a11yProps(0)} />
        {html ? <Tab label='HTML' {...a11yProps(1)} /> : null}
        {playground ? (
          <Tab label='Playground' {...a11yProps(playgroundIndex)} />
        ) : null}
      </Tabs>
      <TabPanel value={value} index={0} className={classes.container}>
        {issues}
      </TabPanel>
      {html ? (
        <TabPanel value={value} index={1} className={classes.container}>
          {html}
        </TabPanel>
      ) : null}
      {playground ? (
        <TabPanel
          value={value}
          index={playgroundIndex}
          className={classes.container}
        >
          {playground}
        </TabPanel>
      ) : null}
    </div>
  )
}
