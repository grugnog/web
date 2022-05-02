import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'absolute',
      left: 10,
      ['& > span']: {
        display: 'inline-block',
        position: 'relative',
        height: 10,
        width: 10,
        borderRadius: 10,
        marginRight: 3,
      },
    },
    close: {
      background: '#ff5c5c',
      border: '1px solid #e33e41',
    },
    minimize: {
      background: '#ffbd4c',
      border: '1px solid #e09e3e',
    },
    zoom: {
      background: '#00ca56',
      border: '1px solid #14ae46',
    },
  })
)

function FakeButtonContainer({ title }: { title?: string }) {
  const { container, close, zoom, minimize } = useStyles()

  return (
    <div className='flex flex-1 place-items-center relative py-2'>
      <span className={container}>
        <span className={close} />
        <span className={minimize} />
        <span className={zoom} />
      </span>
      {title ? (
        <div className='flex flex-1 place-content-center'>{title}</div>
      ) : null}
    </div>
  )
}

export { FakeButtonContainer }
