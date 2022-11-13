import { memo } from 'react'
import { getErrorColor } from '@app/lib/base-colors'
import { Issue } from '@app/types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

type CellIssue = Partial<Issue> & {
  hidden?: boolean //the entire section is hidden
}

export const codeFormatter = (code?: string) => {
  const codeDisplay = code?.replace(/_+/g, '')

  const hrefCode = `https://www.w3.org/TR/WCAG20-TECHS/${codeDisplay
    ?.replace('.Fail', '')
    ?.replace('.Alpha', '')
    ?.replace('.BgColour', '')
    ?.replace('.BgImage', '')
    ?.replace('.Abs', '')
    ?.replace('.NoContent', '')
    ?.replace('.Button.Name', '')
    ?.replace('.A.Empty', '')
    ?.substring(codeDisplay?.lastIndexOf('.') + 1)}`.split(',')

  const codeHref = hrefCode?.length ? hrefCode[hrefCode.length - 1] : ''

  return {
    codeDisplay,
    codeHref,
  }
}

// Display issue UI without events
export function FeedIssueCardComponent({
  message,
  code,
  context,
  type: issueType = 'notice',
  selector,
  recurrence,
}: CellIssue) {
  const { codeHref, codeDisplay } = codeFormatter(code)
  const [m, rec] = message?.split('Recommendation:') || [message, '']

  return (
    <div className='px-3 py-1.5 flex flex-col space-y-1 place-content-between h-[inherit]'>
      <div className='flex space-x-2 items-center'>
        <div
          className={`${getErrorColor(
            issueType + ''
          )} min-w-[0.75rem] min-h-[0.75rem] w-3 h-3 rounded-full`}
        />
        <p className={`truncate text-sm font-bold max-w-[90%] flex-1`}>
          {selector}
        </p>
        <div className='justify-end flex flex-shrink'>
          {recurrence ? (
            <div className='px-2 bg-gray-200 rounded'>
              <p className={'truncate text-sm font-bold'}>
                Recurrence: {recurrence}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <div className='truncate max-w-[88vw] overflow-hidden'>
        <a
          href={codeHref}
          title={`view technique for ${codeDisplay}`}
          target='_blank'
          rel='noreferrer'
          className='text-blue-800 text-xs italic hover:underline'
        >
          {codeDisplay}
        </a>
      </div>
      <div className={'line-clamp-4'}>
        {m}
        {rec ? (
          <>
            {` Recommendation:`}
            <div className='text-blue-600 font-bold inline'>{rec}</div>
          </>
        ) : null}
      </div>
      {context ? (
        <SyntaxHighlighter language='html' style={docco}>
          {context}
        </SyntaxHighlighter>
      ) : null}
    </div>
  )
}

export const FeedIssueCard = memo(FeedIssueCardComponent)

// list item wrapper of issue cell
export function FeedIssueComponent({
  message,
  code,
  context,
  type: issueType = 'notice',
  selector,
  recurrence,
  hidden,
}: CellIssue) {
  return (
    <li className={`${!hidden ? 'visible' : 'hidden'} h-[inherit]`}>
      <FeedIssueCard
        selector={selector}
        type={issueType}
        context={context}
        code={code}
        message={message}
        recurrence={recurrence}
      />
    </li>
  )
}

// Generic issue UI display to re-use across application
export const FeedIssue = memo(FeedIssueComponent)
