import React from 'react'
import {
  AppBar,
  Button,
  Dialog,
  List,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Slide,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { NavBarTitle } from './navigation'
import { useInputHeader } from './hooks'

import { Link } from './link'
import { WebsitePrimaryCell } from './cells'
import { InputHeaders } from './input-headers'
import { useWebsiteData } from '@app/data'
import { GrClose } from 'react-icons/gr'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
  list: {
    paddingTop: 70,
  },
  submit: {
    margin: theme.spacing(1),
  },
  navbar: {
    backgroundColor: theme.palette.background.default,
  },
}))

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction='up' ref={ref} {...props} />
})

function UpperInput({ data, url }: any) {
  const classes = useStyles()
  const {
    customFields,
    removeFormField,
    addFormField,
    updateFormField,
  } = useInputHeader(data)

  const customHeaders = customFields?.map((item: any) => {
    return {
      key: item.key,
      value: item.value,
    }
  })

  const { updateWebsite } = useWebsiteData('', url, customHeaders, true)

  const inputProps = {
    customHeader: true,
    customFields,
    removeFormField,
    addFormField,
    updateFormField,
  }

  const onUpdateWebsite = async () => {
    try {
      await updateWebsite({
        variables: { url, customHeaders, filter: '' },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className={classes.list}>
        <InputHeaders {...inputProps} />
      </div>
      <Button className={classes.submit} onClick={onUpdateWebsite}>
        Update
      </Button>
    </>
  )
}

export function FullScreenModal({
  handleClickOpen,
  handleClose,
  open,
  data = [],
  title = 'Issues',
  // onPress,
  refetch,
  url,
  handleClickOpenPlayer,
  error,
}: any) {
  const classes = useStyles()
  const issuesModal = title === 'Issues'
  const headerModal = title === 'Custom Headers'
  const pagesModal = title === 'All Pages'

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition as any}
    >
      <AppBar position={'fixed'} className={classes.navbar}>
        <Toolbar>
          <IconButton
            edge='start'
            onClick={handleClose}
            aria-label='close'
            className={classes.menuButton}
          >
            <GrClose />
          </IconButton>
          <div className={'flex flex-1 place-content-center'}>
            <NavBarTitle title={title} flex />
            {url ? (
              <div className={'truncate max-w-[70vw] text-right text-black'}>
                <Link href={`/website-details?url=${encodeURIComponent(url)}`}>
                  {url}
                </Link>
                {data?.length && (issuesModal || pagesModal) ? (
                  <p>
                    {data?.length} {issuesModal && error ? 'issue' : 'page'}
                    {data?.length === 1 ? '' : 's'}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
      {headerModal ? (
        <UpperInput data={data} url={url} />
      ) : (
        <List className={classes.list}>
          {Array.isArray(data) && data?.length ? (
            data?.map((item: any, listIndex: number) => {
              return (
                <WebsitePrimaryCell
                  handleClickOpenPlayer={handleClickOpenPlayer}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                  key={`${listIndex} ${item?.selector} ${item?.code}`}
                  refetch={refetch}
                  openError
                  issuesModal={issuesModal}
                  noMaxHeight={data?.length === 1}
                  error={error}
                  item={item}
                  url={url}
                  pagesModal={pagesModal}
                />
              )
            })
          ) : (
            <Container>
              <Typography variant='subtitle1' component='p'>
                No data found yet, please try again later or reload the page.
              </Typography>
              <Button
                aria-label='refetch data'
                aria-haspopup='true'
                onClick={() => refetch()}
                color='inherit'
              >
                Reload Data
              </Button>
            </Container>
          )}
        </List>
      )}
    </Dialog>
  )
}
