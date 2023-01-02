import React from 'react'
import Draggable from 'react-draggable'
import { NavBarTitle } from './navigation'
import { GrClose } from 'react-icons/gr'
import { issueExtractor } from '@app/utils'
import { FeedIssue } from './feed/issue'
import { Button } from './buttons'
import { HeadlessModal } from '../modal/headless'
import { useInteractiveContext } from '../providers/interactive'

export function IssueModal({ issue }: any) {
  const { miniPlayer, setMiniPlayerContent } = useInteractiveContext()
  const { open, title } = miniPlayer

  const pageIssues = issueExtractor(issue)

  const onModalCloseEvent = () => {
    setMiniPlayerContent(false)
  }

  return (
    <HeadlessModal open={open} hideBackdrop onClose={onModalCloseEvent}>
      <Draggable allowAnyClick={false} handle={'.appBar'}>
        <div className='shadow'>
          <div className={`appBar text-white bg-black rounded-t`}>
            <div className='flex place-items-center py-2 px-2'>
              <Button
                onClick={onModalCloseEvent}
                aria-label='close'
                iconButton
                className='text-white hover:opacity-80'
              >
                <GrClose className='grIcon' />
              </Button>
              <div
                className={`flex space-x-2 place-items-center place-content-between`}
              >
                <NavBarTitle title={title} flex />
                {issue?.pageUrl ? (
                  <p className='line-clamp-1 text-white text-xl'>
                    {issue.pageUrl}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          {pageIssues?.length ? (
            <ul
              className={`${
                pageIssues?.length === 1
                  ? 'max-h-auto'
                  : 'max-h-[50vh] overflow-y-scroll'
              } list-none bg-white z-100`}
            >
              {pageIssues?.map((item: any) => {
                return (
                  <FeedIssue
                    {...item}
                    url={issue?.pageUrl}
                    key={`${item?.selector}-${item?.code}`}
                  />
                )
              })}
            </ul>
          ) : null}
        </div>
      </Draggable>
    </HeadlessModal>
  )
}
