import React from 'react'
import { Typography } from '@material-ui/core'
import { strings } from '@app-strings'
import { SectionHeading } from '../text'

import { Link, SectionContainer } from '../general'
import {
  GrAccessibility,
  GrAggregate,
  GrCloud,
  GrCode,
  GrCompare,
  GrGithub,
  GrNotification,
  GrTime,
  GrTip,
} from 'react-icons/gr'

const RenderIcon = ({ index, ...props }: any): any =>
  React.createElement(
    (() => {
      let FeatureIcon

      switch (index) {
        case 0:
          FeatureIcon = GrAccessibility
          break
        case 1:
          FeatureIcon = GrNotification
          break
        case 2:
          FeatureIcon = GrTip
          break
        case 3:
          FeatureIcon = GrCloud
          break
        case 4:
          FeatureIcon = GrCode
          break
        case 5:
          FeatureIcon = GrCompare
          break
        case 6:
          FeatureIcon = GrAggregate
          break
        case 7:
          FeatureIcon = GrGithub
          break
        case 8:
          FeatureIcon = GrTime
          break
        default:
          FeatureIcon = 'div'
          break
      }
      return FeatureIcon
    })(),
    props
  )

function FeatureItem({ item, index }: { item: any; index: number }) {
  return (
    <div
      className={`py-3 flex flex-col flex-1 border-b border-dashed border-gray-400 sm:px-3 sm:border`}
    >
      <div className='flex space-x-2 pb-4 items-center'>
        <div className='flex rounded-3xl border w-10 h-10 justify-center items-center'>
          <RenderIcon index={index} fontSize='16px' />
        </div>
        <Typography variant='h5' component='div'>
          {item.title}
        </Typography>
      </div>
      <div className={'flex-1'} />
      <Typography variant='subtitle1' component='p' gutterBottom>
        {item.detail}
      </Typography>
    </div>
  )
}

const CtaFeatures = ({
  alternative,
  all,
}: {
  alternative?: boolean
  all?: boolean
}) => {
  return (
    <SectionContainer>
      <div className={alternative ? 'pb-2' : undefined}>
        <SectionHeading>
          {alternative ? 'Some more of the features.' : strings.headers[2][0]}
        </SectionHeading>
        {alternative ? null : (
          <Typography variant='h6' component='p' gutterBottom>
            {strings.headers[2][1]}
          </Typography>
        )}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
        <>
          {strings.features
            .filter((_, i) => {
              return all ? true : i < 6
            })
            .map((item: any, index: number) => (
              <FeatureItem item={item} index={index} key={item.id} />
            ))}
        </>
      </div>
      {all ? null : (
        <div className='flex py-5 place-content-center text-center underline'>
          <Link href={'/features'}>Learn More</Link>
        </div>
      )}
    </SectionContainer>
  )
}

export { CtaFeatures }
