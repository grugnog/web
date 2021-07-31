/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useEffect, memo, useRef, useCallback } from 'react'
import { fixes, row, reccList } from '@app/stylesheets/main.module.css'
import { IframeManager } from '@app/managers'
import { Button } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

const dataSource = [
  0.05,
  0.07,
  0.09,
  0.15,
  0.175,
  0.2,
  0.225,
  0.25,
  0.275,
  0.3,
  0.325,
  0.35,
  0.38,
  0.4,
  0.425,
  0.45,
  0.47,
  0.5,
]

const useStyles = makeStyles(() => ({
  colorItem: {
    flex: 1,
    minWidth: '55px',
    width: '100%',
    height: '100%',
    border: 0,
    borderRadius: 0,
  },
}))

const toggleItem = (item: any, source?: any, type: string = 'color'): void => {
  if (source) {
    source.style[type] = item
  }
}

const ReccomendedItem = memo(
  ({
    item,
    source,
    type,
    lastItem,
    autoFixType,
    autoFixSource,
    portalID,
  }: any) => {
    const classes = useStyles()
    const onClick = () => {
      toggleItem(item, source, type)
      IframeManager.removePortal(portalID)
    }
    const listRef = useRef<
      HTMLButtonElement & { animate: (a: any, time: number) => void }
    >(null)

    const mouseover = () => {
      listRef?.current?.animate(
        {
          opacity: [0.9, 1],
          transform: ['scale(1)', 'scale(1.2)'],
        },
        300
      )
      if (listRef?.current?.style?.transform) {
        listRef.current.style.transform = 'scale(1.2)'
      }
    }

    const mouseout = useCallback(() => {
      listRef?.current?.animate(
        {
          opacity: [1, 0.9],
          transform: ['scale(1.2)', 'scale(1)'],
        },
        300
      )
      if (listRef?.current?.style?.transform) {
        listRef.current.style.transform = ''
      }
    }, [listRef])

    useEffect(() => {
      if (lastItem) {
        IframeManager.addFixFrame(() => {
          toggleItem(item, autoFixSource, autoFixType)
          IframeManager.removePortal(portalID)
        })
        IframeManager.addScriptFix({ item, autoFixSource, autoFixType })
      }
    }, [item, autoFixSource, autoFixType, lastItem, portalID])

    return (
      <li style={{ flex: 1 }}>
        <Button
          ref={listRef}
          onMouseOut={mouseout}
          onMouseOver={mouseover}
          onClick={onClick}
          style={{
            background: item,
          }}
          className={`${fixes} ${classes.colorItem}`}
          aria-label={`${item} color`}
        >
          {''}
        </Button>
      </li>
    )
  }
)

ReccomendedItem.displayName = 'ReccomendedItem'

export function ReccomendedFixes({
  source,
  primaryColorContrast,
  portalID,
  textFix,
  contrastRatio,
  elementParent,
  visible,
}: any) {
  const amp = primaryColorContrast.isLight() ? 'lighten' : 'darken'
  const type = textFix ? 'color' : 'backgroundColor'
  const autoFixType = contrastRatio >= 3 ? 'color' : 'backgroundColor'
  const autoFixSource = contrastRatio >= 3 ? elementParent : source

  return (
    <ul className={`${reccList} ${row}`}>
      {dataSource.map((item: any, index: number) => (
        <ReccomendedItem
          item={primaryColorContrast[amp](item)}
          source={source}
          primaryColorContrast={primaryColorContrast}
          type={type}
          index={index}
          visible={visible}
          elementParent={elementParent}
          autoFixType={autoFixType}
          portalID={portalID}
          key={item}
          lastItem={index === dataSource.length - 1}
          autoFixSource={autoFixSource}
        />
      ))}
    </ul>
  )
}
