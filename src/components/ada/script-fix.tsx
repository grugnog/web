import { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Paper, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AdaManager } from '@app/managers'
import { GrCopy } from 'react-icons/gr'
import { Header3 } from '../general/header'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxHeight: '60vh',
    position: 'absolute',
    width: 'auto',
    backgroundColor: theme.palette.divider,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: 'auto',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
}))

const ScriptFixContainer = observer(({ store }: { store: any }) => {
  const classes = useStyles()
  const annotationRef = useRef()
  const rootRef = useRef(null)

  const onClick = () => {
    store.toggleScriptFix()
  }

  //TODO: ADD SYNTAX HIGHLIGHTER AND ACTUAL SCRIPT FOR FIX
  const copyText = () => {
    const stringFix = store.scriptFix?.map(({ css }: any) => {
      return css
    })

    const fixString = `<style>
    ${stringFix.join('\n')}
</style>
    `
    navigator.clipboard.writeText(fixString)
  }

  return (
    <Modal
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      open={store.scriptFixOpen}
      container={() => rootRef.current}
      onClose={onClick}
      className={classes.modal}
    >
      <Paper className={classes.paper} ref={annotationRef}>
        <div className={classes.row}>
          <Header3>
            CSS FIX
          </Header3>
          <IconButton style={{ left: 20 }} onClick={copyText}>
            <GrCopy />
          </IconButton>
        </div>
        <code style={{ color: 'rgb(183,83,90' }}>
          {`<style>`}
          <br />
          {store.scriptFix?.map(
            ({ className, getFixStyle, color }: any, i: number) => {
              if (className === '.') {
                return null
              }
              return (
                <code key={i} style={{ marginLeft: 14 }}>
                  <code
                    style={{ color: 'rgb(209,142,96' }}
                  >{`${className}`}</code>
                  <code style={{ color: 'rgb(160,160,160' }}>{` {`}</code>
                  <br />
                  <code
                    style={{ color: 'rgb(157,166,179', marginLeft: 28 }}
                  >{`${getFixStyle}: `}</code>
                  <code style={{ color: 'rgb(209,142,96' }}>{color}</code>
                  <br />
                  <code style={{ marginLeft: 14, color: 'rgb(160,160,160' }}>
                    {`
					}`}
                  </code>
                  <br />
                </code>
              )
            }
          )}
          {`</style>`}
        </code>
      </Paper>
    </Modal>
  )
})

const ScriptFix = () => {
  return <ScriptFixContainer store={AdaManager} />
}

export { ScriptFix }
