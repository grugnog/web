import React, { useRef, useState, useCallback, memo, Fragment } from 'react'
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
  FormLabel,
} from '@material-ui/core'
import { Button } from '@app/components/general'
import { domainList as dmList } from '@app/utils'
import { GrClose } from 'react-icons/gr'
import { InputHeaders } from './input-headers'
import { useInputHeader } from './hooks'
import { formDialogStyles as useStyles } from './styles'
import { useWebsiteContext } from '../providers/website'
import { AppManager } from '@app/managers'
import { theme } from '@app/theme'
import { WCAGSelectInput } from './select'
import { Standard } from './select/select-input'
import type { StandardKeys } from './select/select-input'

const domainList = [...dmList, 'none']

interface FormDialogProps {
  buttonTitle?: string
  okPress?: (a: any) => void
  buttonStyles?: string
}

export function FormDialogWrapper({
  buttonTitle = 'Subscribe',
  okPress,
  buttonStyles = '',
}: FormDialogProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [websitUrl, setUrl] = useState<string>('')
  const [https, setTransportType] = useState<boolean>(true)
  const [pageInsights, setPageInsights] = useState<boolean>(true)
  const [mobileViewport, setMobile] = useState<boolean>(false)
  const [ua, setUserAgent] = useState<string>('')
  const [standard, setWCAGStandard] = useState<StandardKeys>(
    Standard[1] as StandardKeys
  )

  const inputRef = useRef(null)
  const classes = useStyles()

  const {
    customHeader,
    customFields,
    removeFormField,
    addFormField,
    updateFormField,
    setCustomHeader,
  } = useInputHeader()

  const { addWebsite } = useWebsiteContext()

  const handleClickOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const onChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(event.target.value)
    },
    [setUrl]
  )

  const onStandardChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setWCAGStandard(event.target.value)
    },
    [setWCAGStandard]
  )

  const handleClose = useCallback(() => {
    setOpen(false)
    setUrl('')
  }, [setOpen, setUrl])

  const submit = useCallback(
    async (event: any) => {
      event?.preventDefault()
      if (!websitUrl) {
        // prevent empty
        AppManager.toggleSnack(
          true,
          'Please enter a valid website url.',
          'error'
        )
        return
      }

      let cleanUrl = String(websitUrl)
        .replace(https ? 'https' : 'http', https ? 'http' : 'https')
        .replace(/^(?:https?:\/\/)?/i, '')
        .split('/')[0]

      if (cleanUrl[cleanUrl.length - 1] === '/') {
        cleanUrl = cleanUrl.slice(0, -1)
      }

      let tpt = 'https'

      if (websitUrl.includes('http://') || !https) {
        tpt = 'http'
      }

      let urlBase = cleanUrl.includes('://') ? '' : `://`

      let blockExt

      if (cleanUrl.includes('localhost:')) {
        blockExt = true
      }

      // determine whether to add an extension or not
      const ex =
        blockExt ||
        cleanUrl.includes('.') ||
        domainList.some((element: any) => cleanUrl.includes(element))
          ? ''
          : '.com'

      const websiteUrl = `${tpt}${urlBase}${cleanUrl}${ex}`.trim()
      const websiteCustomHeaders = customHeader ? customFields : null

      const params = {
        url: websiteUrl,
        customHeaders: websiteCustomHeaders,
        pageInsights,
        mobile: mobileViewport,
        ua,
        standard,
      }

      // CLOSE pre-optimistic prevent dialog unmount state error
      handleClose()

      if (okPress && typeof okPress === 'function') {
        try {
          await okPress(params)
        } catch (e) {
          console.error(e)
        }
      } else {
        AppManager.toggleSnack(
          true,
          'Checking all pages for issues, please wait...',
          'success'
        )
        try {
          await addWebsite({
            variables: params,
          })
        } catch (e) {
          console.error(e)
        }
      }
    },
    [
      handleClose,
      addWebsite,
      okPress,
      websitUrl,
      customFields,
      customHeader,
      https,
      pageInsights,
      mobileViewport,
      standard,
      ua,
    ]
  )

  const formLabelStyles = {
    root: classes.formLabel,
    label: classes.formLabelText,
  }

  const inputProps = {
    customHeader,
    customFields,
    removeFormField,
    addFormField,
    updateFormField,
  }

  const onChangeUA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAgent(event.target.value)
  }

  return (
    <Fragment>
      <Button onClick={handleClickOpen} className={buttonStyles}>
        {buttonTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        maxWidth={'xl'}
      >
        <div className={classes.topRow}>
          <DialogTitle id='form-dialog-title' className={classes.topTitle}>
            Subscribe
          </DialogTitle>
          <IconButton aria-label='close modal' onClick={handleClose}>
            <GrClose />
          </IconButton>
        </div>
        <form onSubmit={submit} noValidate>
          <DialogContent
            className={`${classes.dialogPadding} overflow-hidden relative`}
          >
            <DialogContentText>
              To add a website to your watchlist, please enter the website url
              below.
            </DialogContentText>
            <FormLabel>
              <TextField
                autoFocus
                onChange={onChangeText}
                className={classes.input}
                inputProps={{
                  className: classes.textInput,
                  minLength: 3,
                }}
                inputRef={inputRef}
                color='secondary'
                margin='dense'
                value={websitUrl}
                id='name'
                placeholder='Url'
                type='url'
                required
              />
            </FormLabel>
            <div
              className={`flex flex-1 place-items-center space-x-3 py-2 overflow-x-auto`}
            >
              <Tooltip title={'Use http or https for protocol on scans'}>
                <FormControlLabel
                  classes={formLabelStyles}
                  control={
                    <Checkbox
                      checked={https}
                      onChange={() => {
                        setTransportType(!https)
                      }}
                      value={https}
                      color='primary'
                    />
                  }
                  label='HTTPS'
                />
              </Tooltip>
              <Tooltip
                title={
                  "Run Google Lighthouse across page's. Remove to greatly increase performance."
                }
              >
                <FormControlLabel
                  classes={formLabelStyles}
                  control={
                    <Checkbox
                      checked={pageInsights}
                      onChange={() => {
                        setPageInsights(!pageInsights)
                      }}
                      value={pageInsights}
                      color='primary'
                    />
                  }
                  label='Lighthouse'
                />
              </Tooltip>
              <Tooltip title={'Scan pages using mobile viewport for issues.'}>
                <FormControlLabel
                  classes={formLabelStyles}
                  control={
                    <Checkbox
                      checked={mobileViewport}
                      onChange={() => {
                        setMobile(!mobileViewport)
                      }}
                      value={mobileViewport}
                      color='primary'
                    />
                  }
                  label='Mobile'
                />
              </Tooltip>
              <Tooltip
                title={
                  'Add custom headers to use for authenticated pages or etc.'
                }
              >
                <FormControlLabel
                  classes={formLabelStyles}
                  control={
                    <Checkbox
                      color='primary'
                      checked={customHeader}
                      value={customHeader}
                      onChange={() => setCustomHeader(!customHeader)}
                    />
                  }
                  label='Headers'
                />
              </Tooltip>
              <WCAGSelectInput
                standard={standard}
                onStandardChange={onStandardChange}
              />
              <FormLabel>
                <TextField
                  onChange={onChangeUA}
                  className={classes.input}
                  value={ua}
                  color='secondary'
                  margin='dense'
                  id='ua'
                  placeholder='User Agent'
                  type='text'
                />
              </FormLabel>
            </div>
            {customHeader ? <InputHeaders {...inputProps} /> : null}
          </DialogContent>
          <DialogActions style={{ padding: 0 }}>
            <Button
              disabled={!websitUrl}
              type='submit'
              style={{
                width: '100%',
                borderRadius: 0,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export const FormDialog = memo(FormDialogWrapper)
