import React, { memo, FC } from 'react'
import { Button, CardHeader } from '@material-ui/core'
import { FormDialog } from '../form-dialog'
import Image from 'next/image'

const infoDetails = [
  {
    title: 'Detailed information',
    subTitle:
      'Get spot on details on how to improve your website in various areas. Stay up to date on the latest guidelines and more as they come out.',
  },
  {
    title: 'Safe Guard',
    subTitle: `Include your custom CDN at no cost and make sure issues are fixed upfront. Sometimes accidents happens thats why we got your back.`,
  },
  {
    title: 'Alerts',
    subTitle:
      'Get alerted when your page encounters new issues at any frequency.',
  },
]

interface EmptyWebsiteProps {
  emptyHeaderTitle?: string
  emptyHeaderSubTitle?: string
  hasWebsite?: boolean
}

const EmptyWebsiteFormComponent: FC<EmptyWebsiteProps> = ({
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  hasWebsite = false,
}) => {
  return (
    <div
      className={
        'flex flex-col w-full place-items-center py-10 my-2 text-center'
      }
    >
      <CardHeader
        title={emptyHeaderTitle}
        subheader={emptyHeaderSubTitle}
        titleTypographyProps={{ style: { fontSize: '3.1rem' } }}
      />
      {hasWebsite ? (
        <Button href={'/'} type='a' variant={'outlined'}>
          Go to Dashboard
        </Button>
      ) : (
        <FormDialog />
      )}
      <div className={'flex space-items-center space-x-10 py-10'}>
        <ul className={'w-full text-left space-y-2 md:w-1/2 md:pr-20'}>
          {infoDetails.map(
            (detail: { title: string; subTitle: string }, i: number) => {
              return (
                <li key={i}>
                  <div className={'text-3xl font-semibold'}>{detail.title}</div>
                  <div className={'text-xl'}>{detail.subTitle}</div>
                </li>
              )
            }
          )}
        </ul>
        <div className={'hidden md:block'}>
          <Image
            src={'/img/website_builder.svg'}
            height={540}
            width={660}
            alt='Website accessibility builder'
          />
        </div>
      </div>
    </div>
  )
}

export const EmptyWebsiteForm = memo(EmptyWebsiteFormComponent)
