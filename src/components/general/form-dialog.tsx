/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useRef, useState, Fragment } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core'
import { domainList as dmList } from '@app/utils'
import { Close as CloseIcon } from '@material-ui/icons'
import { InputHeaders } from './input-headers'
import { useInputHeader } from './hooks'
import { formDialogStyles as useStyles } from './styles'
import { useWebsiteContext } from '../providers/website'

const domainList = [...dmList, 'none']

export function FormDialog({
  buttonTitle = 'Subscribe',
  okPress,
  buttonStyles = '',
}: any) {
  const [open, setOpen] = useState<boolean>(false)
  const [websitUrl, setUrl] = useState<string>('')
  const [https, setTransportType] = useState<boolean>(true)
  const [extension, setExtension] = useState<string>('.com')
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

  const handleClickOpen = () => {
    setOpen(true)
  }

  const onChangeText = (event: any) => {
    setUrl(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
    setUrl('')
  }

  const handleChangeExt = (event: any) => {
    setExtension(event.target.value)
  }

  const submit = async (event: any) => {
    event?.preventDefault()
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
    let blockExt = extension === 'none'

    if (cleanUrl.includes('localhost:')) {
      blockExt = true
    }

    const ex =
      blockExt || domainList.some((element: any) => cleanUrl.includes(element))
        ? ''
        : extension

    const websiteUrl = `${tpt}${urlBase}${cleanUrl}${ex}`.trim()
    const websiteCustomHeaders = customHeader ? customFields : null

    const params = {
      url: websiteUrl,
      customHeaders: websiteCustomHeaders,
    }

    if (okPress && typeof okPress === 'function') {
      await okPress(params)
    } else {
      await addWebsite(params)
    }

    handleClose()
  }

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

  return (
    <Fragment>
      <Button
        variant={'outlined'}
        onClick={handleClickOpen}
        className={[classes.buttonAdjust, buttonStyles].join(' ')}
      >
        {buttonTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <div className={classes.topRow}>
          <DialogTitle id='form-dialog-title' className={classes.topTitle}>
            Subscribe
          </DialogTitle>
          <IconButton aria-label='close modal' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={submit} noValidate>
          <DialogContent className={classes.dialogPadding}>
            <DialogContentText>
              To add a website to your watchlist, please enter the website url
              below.
            </DialogContentText>
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
            <div className={classes.row}>
              <FormControl
                variant='outlined'
                className={classes.formControl}
                size='small'
              >
                <Select
                  labelId='extany-select-outlined-label'
                  id='ext-select-outlined'
                  value={extension}
                  onChange={handleChangeExt}
                  classes={{
                    selectMenu: classes.inputSelect,
                  }}
                >
                  {domainList.map((value: any) => (
                    <MenuItem value={value} key={value}>
                      {value.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            </div>
            {customHeader ? <InputHeaders {...inputProps} /> : null}
          </DialogContent>
          <DialogActions style={{ padding: 0 }}>
            <Button
              disabled={!websitUrl}
              type='submit'
              style={{ width: '100%', borderRadius: 0 }}
            >
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}
