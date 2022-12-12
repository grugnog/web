import { memo } from 'react'
import { AppBar, List, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { NavBarTitle } from './navigation'
import { useInputHeader } from './hooks'

import { Link } from './link'
import { WebsitePrimaryCell } from './cells'
import { Button } from './buttons/button'

import { InputHeaders } from './forms/input-headers'
import { useWebsiteData } from '@app/data'
import { GrClose } from 'react-icons/gr'
import { Spacer } from './spacer'
import { theme } from '@app-theme'
import { AppManager } from '@app/managers'
import { FeedIssue } from './feed/issue'
import { Header3 } from './header'
import { HeadlessFullScreenModal } from '../modal/headless-full'
import { fetcher } from '@app/utils/fetcher'

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: theme.palette.background.default,
    height: theme.mixins.toolbar.minHeight,
    justifyContent: 'center',
  },
}))

export const defaultModalState = {
  open: false,
  data: null,
  title: '',
  url: '',
  error: '',
}

function UpperInput({ data, url }: any) {
  const { customFields, removeFormField, addFormField, updateFormField } =
    useInputHeader(data)

  const customHeaders = customFields?.map((item: any) => {
    return {
      key: item?.key,
      value: item?.value,
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
      AppManager.toggleSnack(true, 'Headers updated successfully.')
      // todo find website and apply headers
    } catch (e) {
      console.error(e)
      AppManager.toggleSnack(true, e, 'error')
    }
  }

  return (
    <>
      <div className='py-2'>
        <InputHeaders {...inputProps} />
      </div>
      <div className='p-1'>
        <Button onClick={onUpdateWebsite}>Update</Button>
      </div>
    </>
  )
}

interface FullScreenModalProps {
  open: boolean
  role?: number
  handleClose(x?: any): any
  handleClickOpen?(data: any, title: any, url: any, error: any): any
  handleClickOpenPlayer?(x?: any): any
  refetch(x?: any): any
  error?: string
  title?: string
  url: string
  data?: any
}

export function FullScreenModalWrapper({
  handleClickOpen,
  handleClose,
  open,
  data,
  title = 'Issues',
  // onPress,
  refetch,
  url,
  handleClickOpenPlayer,
  error,
}: FullScreenModalProps) {
  const classes = useStyles()

  const issuesModal = title === 'Issues'
  const headerModal = title === 'Custom Headers'
  const pagesModal = title === 'All Pages'
  const verifyModal = title === 'Verify DNS'

  const issueCount = data?.length

  // check to see if the dns was confirmed
  const onDnsStatusEvent = async () => {
    const domain = new URL(url).hostname
    const source = await fetcher('/website/dns', { domain }, 'POST')

    AppManager.toggleSnack(
      open,
      `${domain} is ${!source?.data?.verified ? 'Not ' : ''}Verified`
    )

    if (source?.data?.verified && refetch && handleClose) {
      refetch()
      handleClose()
    }
  }

  // todo: split props into component
  const Body = () => {
    if (verifyModal) {
      return (
        <div className='p-4 space-y-6 container mx-auto'>
          <Header3>Verify DNS</Header3>
          <div className='py-2 space-y-2'>
            <p className='text-gray-800 text-lg'>
              Enter the following .txt record to confirm your domain. You can
              remove the record after confirmation.
            </p>
            <p className='text-gray-700'>
              By verifying your domain, you can enable the CDN to store content.
              If you need help please, contact support for alternative
              validation steps.
            </p>
          </div>
          <div className='border border-gray-700 text-gray-600 rounded'>
            {data?.data?.txtRecord ? (
              <>
                <div className='flex flex-1 space-x-3'>
                  <div className='border-r px-4 bg-black'>
                    <div className='py-2 text-gray-100 font-medium'>.TXT</div>
                  </div>
                  <div className='py-2'>{data?.data?.txtRecord}</div>
                </div>
              </>
            ) : (
              <div className='py-4 px-4'>{data?.message}</div>
            )}
          </div>
          <div>
            <Button onClick={onDnsStatusEvent}>Check Status</Button>
          </div>
        </div>
      )
    }
    if (headerModal) {
      return <UpperInput data={data} url={url} />
    }
    // TODO: remove for different way of determine issues content.
    const isFlatIssues =
      data && Array.isArray(data) && data?.some((o) => 'domain' in o == false)

    if (issuesModal && isFlatIssues) {
      return (
        <List>
          {data?.map((item: any, listIndex: number) => {
            return (
              <FeedIssue
                key={`${listIndex} ${item?.selector} ${item?.code}`}
                error={error}
                {...item}
                pagesModal={pagesModal}
              />
            )
          })}
        </List>
      )
    }

    // render the the list data exist
    if (data && Array.isArray(data) && issueCount) {
      return (
        <List>
          {data?.map((item: any, listIndex: number) => {
            return (
              <WebsitePrimaryCell
                handleClickOpenPlayer={handleClickOpenPlayer}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                key={`${listIndex} ${item?.selector} ${item?.code}`}
                refetch={refetch}
                openError
                issuesModal={issuesModal}
                noMaxHeight={issueCount === 1}
                error={error}
                item={item}
                url={url}
                pagesModal={pagesModal}
              />
            )
          })}
        </List>
      )
    }

    return (
      <Container>
        <Typography variant='subtitle1' component='p'>
          No data found yet, please try again later or reload the page.
        </Typography>
        <Button
          aria-label='refetch data'
          aria-haspopup='true'
          onClick={() => refetch()}
        >
          Reload Data
        </Button>
      </Container>
    )
  }

  return (
    <HeadlessFullScreenModal open={open} onClose={handleClose}>
      <AppBar position={'fixed'} className={classes.navbar}>
        <div className='flex flex-1 align-center place-content-between px-5'>
          <div className={'flex space-x-2 place-items-center'}>
            <Button onClick={handleClose} aria-label='close' iconButton>
              <GrClose className='grIcon inline-block text-black text-sm md:text-base' />
            </Button>
            <NavBarTitle title={title} />
          </div>
          <div className={'flex space-x-1 place-items-center'}>
            {url ? (
              <div className={'text-right text-black'}>
                <Link href={`/website-details?url=${encodeURIComponent(url)}`}>
                  {url}
                </Link>
                {issueCount && (issuesModal || pagesModal) ? (
                  <p className='truncate max-w-[50vw]'>
                    {issueCount} {issuesModal && error ? 'issue' : 'page'}
                    {issueCount === 1 ? '' : 's'}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </AppBar>
      <Spacer height={theme.mixins.toolbar.minHeight} />
      <Body />
    </HeadlessFullScreenModal>
  )
}

export const FullScreenModal = memo(FullScreenModalWrapper)
