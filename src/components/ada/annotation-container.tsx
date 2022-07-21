import { useRef } from 'react'
import { Modal, Paper, Typography, IconButton } from '@material-ui/core'
import { GrClose } from 'react-icons/gr'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { ToolTip } from './tool-tip'
import Draggable from 'react-draggable'

const useStyles = makeStyles(({ palette, spacing, shadows }: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: '400px',
      backgroundColor: palette.common.white,
      border: '2px solid #0E1116',
      boxShadow: shadows[5],
      overflow: 'hidden',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      overflow: 'hidden',
    },
    title: {
      flex: 1,
      pointerEvents: 'none',
      marginLeft: spacing(2),
      marginRight: spacing(2),
    },
    maxSize: {
      fontWeight: 300,
      maxWidth: '80%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  })
)

let modalStyle = {
  position: 'sticky' as 'sticky',
  left: 0,
  top: 0,
}

export function AnnotationContainer({
  store,
  contrastRatio,
  source,
  // errorType,
  portalID,
  elementParent,
  message,
  code,
  context,
  recurrence,
}: any) {
  const classes = useStyles()
  const annotationRef = useRef()
  const rootRef = useRef(null)

  const onClick = (event: any) => {
    event?.preventDefault()
    event?.stopPropagation()

    modalStyle = {
      position: 'sticky',
      left: event?.pageX,
      top: event?.pageY,
    }
    store.setActiveAnnotation(null)
  }

  return (
    <Modal
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      open={store.activeAnnotation}
      container={() => rootRef.current}
      onClose={onClick}
      keepMounted
    >
      <Draggable handle={'.annotationHeader'} allowAnyClick={false}>
        <Paper style={modalStyle} className={classes.paper} ref={annotationRef}>
          <div className={`annotationHeader ${classes.row} border-b`}>
            <Typography variant='h6' component='h3' className={classes.title}>
              RECOMMENDED
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='close modal'
              onClick={onClick}
              style={{ marginRight: 6 }}
            >
              <GrClose />
            </IconButton>
          </div>
          <Typography
            variant='body2'
            className={classes.title}
            style={{ fontWeight: 500 }}
            gutterBottom
          >
            {context}
          </Typography>
          <Typography
            variant='subtitle2'
            className={`${classes.title} ${classes.maxSize}`}
            gutterBottom
          >
            {code}
          </Typography>
          {recurrence ? (
            <p className={'truncate text-sm font-bold py-2'}>
              Recurred: {recurrence} times
            </p>
          ) : null}
          <Typography
            variant='subtitle1'
            className={classes.title}
            gutterBottom
          >
            {message}
          </Typography>
          {String(message)?.includes('contrast ratio') ? (
            <ToolTip
              visible={store.activeAnnotation}
              source={source}
              portalID={portalID}
              elementParent={elementParent}
              contrastRatio={contrastRatio}
              message={message}
              code={code}
              context={context}
              close={onClick}
            />
          ) : null}
        </Paper>
      </Draggable>
    </Modal>
  )
}
