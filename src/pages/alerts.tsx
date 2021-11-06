/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { memo } from 'react'
import dynamic from 'next/dynamic'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  MiniPlayer,
  PageTitle,
  LinearBottom,
  Drawer,
} from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { IssueFeed } from '@app/components/feed'
import { WeekSelect } from '@app/components/alerts'
import { useIssueFeed, userData } from '@app/data'
import { withApollo } from '@app/apollo'
import { WithHydrate } from '@app/components/adhoc'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

const noSSR = {
  ssr: false,
}

const DynamicModal = dynamic(
  () => import('@app/components/modal').then((mod) => mod.DynamicModal) as any,
  noSSR
)

const UpgradeBanner = dynamic(
  () =>
    import('@app/components/general/upgrade-banner').then(
      (mod) => mod.UpgradeBanner
    ) as any,
  noSSR
)

const useStyles = makeStyles((theme) => ({
  sidePanelPadding: {
    paddingRight: '20vw',
    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
    },
  },
}))

const MiniPlayerMemo = memo(MiniPlayer)

function Alerts({ name }: PageProps) {
  const classes = useStyles()
  const { issueFeed, setIssueFeedContent } = useIssueFeed()
  const {
    filterEmailDatesData,
    onFilterEmailDates,
    filterEmailDatesLoading,
  } = userData()

  return (
    <WithHydrate>
      <Drawer title={name}>
        <Container maxWidth={'xl'}>
          <Box
            className={
              issueFeed?.data?.length && issueFeed.open
                ? classes.sidePanelPadding
                : ''
            }
          >
            <PageTitle title={'Alerts'} />
            <WeekSelect
              confirmDates={onFilterEmailDates}
              filterEmailDates={filterEmailDatesData}
            />
          </Box>
        </Container>
        <MiniPlayerMemo />
        <IssueFeed
          setIssueFeedContent={setIssueFeedContent}
          issueFeed={issueFeed}
        />
        <DynamicModal />
        <UpgradeBanner />
      </Drawer>
      <LinearBottom loading={filterEmailDatesLoading} />
    </WithHydrate>
  )
}

export default withApollo(metaSetter({ Alerts }))
