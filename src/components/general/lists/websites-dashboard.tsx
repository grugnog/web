/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { WebsiteCellDashboard } from '@app/components/general/cells'

// LIST
export function WebSitesDashboard({
  data,
  removePress,
  handleClickOpen,
  refetch,
  handleClickOpenPlayer,
  crawlWebsite,
  setModal,
  mutatationLoading,
  loading,
}: any) {
  return data?.map(({ url, id, pageUrl, ...props }: any, index: number) => (
    <WebsiteCellDashboard
      handleClickOpen={handleClickOpen}
      url={url || pageUrl}
      key={`${id}-${url || pageUrl}`}
      removePress={removePress}
      refetch={refetch}
      handleClickOpenPlayer={handleClickOpenPlayer}
      crawlWebsite={crawlWebsite}
      setModal={setModal}
      loading={loading}
      mutatationLoading={mutatationLoading}
      index={index}
      {...props}
    />
  ))
}
