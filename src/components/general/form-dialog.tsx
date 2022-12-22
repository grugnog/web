'use client'

import React, { useState, useCallback, memo, Fragment } from 'react'
import { Button, InputActions } from '@app/components/general'
import { domainList as dmList } from '@app/utils'
import { GrAdd, GrChapterAdd, GrClose } from 'react-icons/gr'
import { AppManager } from '@app/managers'
import { InputHeaders } from './forms/input-headers'
import { useInputActions, useInputHeader } from './hooks'
import { useWebsiteContext } from '../providers/website'
import { WCAGSelectInput } from './select'
import { AccessibilityStandardKeys, Standard } from './select/select-input'
import { FormControl } from './form-control'
import { HeadlessModal } from '../modal/headless'
import { TextField } from './text-field'
import { useAuthContext } from '../providers/auth'
import { Checkbox } from './check-box'

const domainList = [...dmList, 'none']

interface FormDialogProps {
  buttonTitle?: string
  okPress?: (a: any) => void
  buttonStyles?: string
  icon?: boolean | 'add' // show btn with icon
}

interface InputHead {
  key: string
  value: string
}

const checkBoxContainerStyles =
  'flex place-items-center gap-x-2 min-w-[80px] md:min-w-20'

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
  icon,
}: FormDialogProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [websitUrl, setUrl] = useState<string>('')
  const [https, setTransportType] = useState<boolean>(true)
  const [pageInsights, setPageInsights] = useState<boolean>(false)
  const [mobileViewport, setMobile] = useState<boolean>(false)
  const [subdomains, setSubdomains] = useState<boolean>(false)
  const [tld, setTld] = useState<boolean>(false)

  const [ua, setUserAgent] = useState<string>('')
  const [standard, setWCAGStandard] = useState<AccessibilityStandardKeys>(
    Standard[Standard.WCAG2AA] as AccessibilityStandardKeys
  )
  const [robots, setRobots] = useState<boolean>(true)

  const { account } = useAuthContext()
  const { activeSubscription } = account
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
        url: websiteUrl.toLowerCase(),
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

  const onChangeUA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAgent(event.target.value)
  }

  // toggle actions form
  const onChangeActionsEvent = () => {
    if (account.activeSubscription) {
      actions.setCustomActions((v: boolean) => !v)
    } else {
      AppManager.toggleSnack(
        true,
        `Custom actions requires paid plan, upgrade your account to get access.`,
        'error',
        false,
        true
      )
    }
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
      <Button onClick={handleClickOpen} className={`${buttonStyles}`}>
        {buttonTitle}
        {icon ? (
          icon === 'add' ? (
            <GrAdd className='grIcon' />
          ) : (
            <GrChapterAdd className='grIcon' />
          )
        ) : null}
      </Button>
      <HeadlessModal
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        size={'3xl'}
      >
        <div className={'px-6 py-3 flex place-items-center'}>
          <h3 id='form-dialog-title' className={'flex-1 text-xl font-medium'}>
            Subscribe
          </h3>
          <Button aria-label='close modal' onClick={handleClose} iconButton>
            <GrClose className='grIcon' />
          </Button>
        </div>
        <form onSubmit={submit} noValidate>
          <div
            className={`px-7 py-1 overflow-hidden relative flex flex-col gap-y-2`}
          >
            <p className='text-base text-gray-700'>
              To add a website to your watchlist, enter the url below.
            </p>
            <FormControl htmlFor='name'>Enter Website Url</FormControl>
            <div className={'pb-1 py-4 w-full'}>
              <TextField
                autoFocus
                onChange={onChangeText}
                minLength={3}
                className={`w-full border px-3 py-2 rounded`}
                color='secondary'
                value={websitUrl}
                id='name'
                placeholder='Website url'
                type='url'
                required
              />
            </div>
            <div
              className={`flex flex-1 place-items-center space-x-3 overflow-x-auto pt-2 pb-1`}
            >
              <div className={checkBoxContainerStyles}>
                <Checkbox
                  checked={https}
                  onChange={() => {
                    setTransportType(!https)
                  }}
                  id={'https'}
                />
                <FormControl htmlFor='https' visible>
                  HTTPS
                </FormControl>
              </div>
              <div className={checkBoxContainerStyles}>
                <Checkbox
                  checked={pageInsights}
                  onChange={() => {
                    setPageInsights(!pageInsights)
                  }}
                  id={'lighthouse'}
                />
                <FormControl htmlFor='lighthouse' visible>
                  Lighthouse
                </FormControl>
              </div>

              <div className={checkBoxContainerStyles}>
                <Checkbox
                  checked={mobileViewport}
                  onChange={() => {
                    setMobile(!mobileViewport)
                  }}
                  id={'mobile'}
                />
                <FormControl htmlFor='mobile' visible>
                  Mobile
                </FormControl>
              </div>

              <div className={checkBoxContainerStyles}>
                <Checkbox
                  color='primary'
                  checked={robots}
                  onChange={onChangeRobotsEvent}
                  id={'robots'}
                />
                <FormControl htmlFor='robots' visible>
                  Robots
                </FormControl>
              </div>

              <div className={checkBoxContainerStyles}>
                <Checkbox
                  checked={subdomains}
                  onChange={onChangeSubdomainsEvent}
                  id={'subdomains'}
                  disabled={!activeSubscription}
                />
                <FormControl
                  htmlFor='subdomains'
                  visible
                  disabled={!activeSubscription}
                >
                  Subdomains
                </FormControl>
              </div>

              <div className={checkBoxContainerStyles}>
                <Checkbox
                  checked={tld}
                  onChange={onChangeTldEvent}
                  id={'tlds'}
                  disabled={!activeSubscription}
                />
                <FormControl
                  htmlFor='tlds'
                  visible
                  disabled={!activeSubscription}
                >
                  TLDs
                </FormControl>
              </div>
            </div>
            <div
              className={`flex flex-1 place-items-center space-x-3 overflow-x-auto pb-2`}
            >
              <div className={checkBoxContainerStyles}>
                <Checkbox
                  checked={customActions}
                  onChange={onChangeActionsEvent}
                  id={'actions'}
                />
                <FormControl htmlFor='actions' visible>
                  Actions
                </FormControl>
              </div>

              <div className={checkBoxContainerStyles}>
                <Checkbox
                  checked={customHeader}
                  onChange={onChangeHeadersEvent}
                  id={'headers'}
                />
                <FormControl htmlFor='headers' visible>
                  Headers
                </FormControl>
              </div>

              <WCAGSelectInput
                standard={standard}
                onStandardChange={onStandardChange}
                spacing
              />
              <FormControl htmlFor='ua'>Enter User Agent</FormControl>
              <TextField
                onChange={onChangeUA}
                className={`px-2 py-0.5 border-none`}
                style={{ maxWidth: 120 }}
                value={ua}
                id='ua'
                placeholder='User-Agent'
                type='text'
              />
            </div>
            {customHeader ? <InputHeaders {...headers} /> : null}
            {customActions ? <InputActions {...actions} /> : null}
          </div>
          <div className='pt-2'>
            <Button
              disabled={!websitUrl}
              type='submit'
              className={`w-full border rounded-none ${
                !websitUrl ? 'bg-gray-100 text-gray-500' : ''
              } md:py-3`}
            >
              Subscribe
            </Button>
          </div>
        </form>
      </HeadlessModal>
    </Fragment>
  )
}

export const FormDialog = memo(FormDialogWrapper)
