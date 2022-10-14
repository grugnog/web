import { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrShield } from 'react-icons/gr'
import { prismStyles } from '@app/styles'
import { copyClipboard } from '@app/lib'
import { PrismLight } from 'react-syntax-highlighter'
import { Link } from '@app/components/general'

export const StatusBadgeBoxWrapper = ({
  statusBadgeUrl,
  reportsLink,
  domain,
  reportsPageLink,
}: {
  statusBadgeUrl?: string
  reportsLink?: string
  domain?: string
  reportsPageLink?: string // path to reports page for website locally
}) => {
  const [isMarkdown, setMarkdown] = useState<boolean>(true)

  const statusBadgeLanguage = isMarkdown ? 'markdown' : 'html'

  const labelId = `${domain}-form-markdown`

  return (
    <InfoBlock title={'Badge'} icon={<GrShield />}>
      <div className='flex space-x-1'>
        <label className='text-sm pb-2 font-medium' htmlFor={labelId}>
          Markdown
        </label>
        <input
          checked={isMarkdown}
          type='checkbox'
          id={labelId}
          onChange={() => setMarkdown((minified: boolean) => !minified)}
          className={
            'outline-none relative inline-flex flex-shrink-0 h-4 w-7 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }
        ></input>
      </div>
      <PrismLight
        language={statusBadgeLanguage}
        style={prismStyles as any}
        onClick={copyClipboard}
        className={'hover:bg-blue-500 hover:text-white cursor-pointer'}
      >
        {statusBadgeLanguage === 'markdown'
          ? `[![A11yWatch](${statusBadgeUrl})](${reportsLink})`
          : `<a href="${reportsLink}"><img src="${statusBadgeUrl}" /></a>`}
      </PrismLight>
      {statusBadgeUrl && reportsPageLink ? (
        <Link href={reportsPageLink} className={'block py-2'}>
          <img
            src={statusBadgeUrl}
            alt={`Status badge for ${domain}`}
            width={112}
            height={20}
          />
        </Link>
      ) : null}
    </InfoBlock>
  )
}

export const StatusBadgeBox = memo(StatusBadgeBoxWrapper)
