import React, { useRef, useState, useCallback, memo, Fragment } from 'react'
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
  FormLabel,
} from '@material-ui/core'
import { Button, InputActions } from '@app/components/general'
import { domainList as dmList } from '@app/utils'
import { GrClose } from 'react-icons/gr'
import { InputHeaders } from './forms/input-headers'
import { useInputActions, useInputHeader } from './hooks'
import { formDialogStyles as useStyles } from './styles'
import { useWebsiteContext } from '../providers/website'
import { AppManager } from '@app/managers'
import { WCAGSelectInput } from './select'
import { Standard } from './select/select-input'
import type { StandardKeys } from './select/select-input'

const domainList = [...dmList, 'none']

interface FormDialogProps {
  buttonTitle?: string
  okPress?: (a: any) => void
  buttonStyles?: string
}

// interface ActionsInput {
//   path: string
//   events: string // comma seperated values
// }

interface InputHead {
  key: string
  value: string
}

// validate the headers inputs and send
function validateHeaders(object: InputHead[]) {
  const headers = []

  for (const p of object) {
    const { key, value } = p

    if (key && value) {
      headers.push(p)
    }
  }

  return headers
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
  const [subdomains, setSubdomains] = useState<boolean>(false)
  const [tld, setTld] = useState<boolean>(false)

  const [ua, setUserAgent] = useState<string>('')
  const [standard, setWCAGStandard] = useState<StandardKeys>(
    Standard[1] as StandardKeys
  )
  const [robots, setRobots] = useState<boolean>(true)

  const inputRef = useRef(null)
  const classes = useStyles()

  const headers = useInputHeader()
  const actions = useInputActions()

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

  // fields
  const customActions = actions.customActions
  const customActionFields = actions.customFields
  // headers
  const customHeader = headers.customHeader
  const customFields = headers.customFields

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

      const websiteCustomHeaders = customHeader
        ? validateHeaders(customFields)
        : null

      // make all paths start with slash
      const websiteActions = customActions
        ? customActionFields.map((items) => {
            const pathName =
              items.path && items.path[0] === '/'
                ? items.path
                : `/${items.path}`

            return {
              ...items,
              path: pathName,
            }
          })
        : null

      const params = {
        url: websiteUrl,
        customHeaders: websiteCustomHeaders,
        pageInsights,
        mobile: mobileViewport,
        ua,
        standard,
        actions: websiteActions,
        robots,
        subdomains,
        tld,
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
      https,
      pageInsights,
      mobileViewport,
      standard,
      ua,
      customFields,
      customHeader,
      customActionFields,
      customActions,
      robots,
      subdomains,
      tld,
    ]
  )

  const formLabelStyles = {
    root: classes.formLabel,
    label: classes.formLabelText,
  }

  const onChangeUA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAgent(event.target.value)
  }

  // toggle actions form
  const onChangeActionsEvent = () => {
    actions.setCustomActions((v: boolean) => !v)
  }
  // toggle headers form
  const onChangeHeadersEvent = () => {
    headers.setCustomHeader((v: boolean) => !v)
  }

  const onChangeRobotsEvent = () => {
    setRobots((a: boolean) => !a)
  }

  const onChangeSubdomainsEvent = () => {
    setSubdomains((a: boolean) => !a)
  }

  const onChangeTldEvent = () => {
    setTld((a: boolean) => !a)
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
        <div className={'px-6 py-2 flex place-items-center'}>
          <h3 id='form-dialog-title' className={'flex-1 text-xl font-semibold'}>
            Subscribe
          </h3>
          <IconButton aria-label='close modal' onClick={handleClose}>
            <GrClose />
          </IconButton>
        </div>
        <form onSubmit={submit} noValidate>
          <DialogContent
            className={`${classes.dialogPadding} overflow-hidden relative`}
          >
            <DialogContentText>
              To add a website to your watchlist, enter the website url below.
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
                placeholder='Website url'
                type='url'
                required
              />
            </FormLabel>
            <div
              className={`flex flex-1 place-items-center space-x-3 overflow-x-auto pt-2 pb-1`}
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
              <Tooltip title={'Respect robots.txt file for crawling pages.'}>
                <FormControlLabel
                  classes={formLabelStyles}
                  control={
                    <Checkbox
                      color='primary'
                      checked={robots}
                      value={robots}
                      onChange={onChangeRobotsEvent}
                    />
                  }
                  label='Robots'
                />
              </Tooltip>
              <Tooltip
                title={'Allow crawling subdomains [Basic Plan Required].'}
              >
                <FormControlLabel
                  classes={formLabelStyles}
                  control={
                    <Checkbox
                      color='primary'
                      checked={subdomains}
                      value={subdomains}
                      onChange={onChangeSubdomainsEvent}
                    />
                  }
                  label='Subdomains'
                />
              </Tooltip>
              <Tooltip
                title={
                  'Allow crawling all Top Level Domains [Premium Plan Required].'
                }
              >
                <FormControlLabel
                  classes={formLabelStyles}
                  control={
                    <Checkbox
                      color='primary'
                      checked={tld}
                      value={tld}
                      onChange={onChangeTldEvent}
                    />
                  }
                  label='TLD'
                />
              </Tooltip>
            </div>
            <div
              className={`flex flex-1 place-items-center space-x-3 overflow-x-auto pb-2`}
            >
              <Tooltip
                title={'Add custom actions to run on pages before test.'}
              >
                <FormControlLabel
                  classes={formLabelStyles}
                  control={
                    <Checkbox
                      color='primary'
                      checked={customActions}
                      value={customActions}
                      onChange={onChangeActionsEvent}
                    />
                  }
                  label='Actions'
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
                      onChange={onChangeHeadersEvent}
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
                  style={{ maxWidth: 120 }}
                  value={ua}
                  color='secondary'
                  margin='dense'
                  id='ua'
                  placeholder='User-Agent'
                  type='text'
                />
              </FormLabel>
            </div>
            {customHeader ? <InputHeaders {...headers} /> : null}
            {customActions ? <InputActions {...actions} /> : null}
          </DialogContent>
          <DialogActions style={{ padding: 0 }}>
            <Button
              disabled={!websitUrl}
              type='submit'
              className='w-full border'
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
