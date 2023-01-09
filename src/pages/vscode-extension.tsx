import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header } from '@app/components/general/header'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { companyName } from '@app/configs'

function VSCodeExtension({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>{`VSCode Extension`}</Header>
        <p className='py-2 font-light'>Alpha - New</p>
        <p className='text-lg pb-5'>
          The new VSCode extension brings the power of the system right to you.
          Perform audits and perform features that improve development
          workflows.
        </p>

        <h2 className='text-xl font-bold'>Some of the IDE Features</h2>

        <p className='text-base'>
          Our primary feature is the audit handling across multiple pages
          connected directly to your web local servers. With the efficiency of
          our crawler and scanner perform real time evaluations with little down
          time if any at all.
        </p>

        <div className='py-5'>
          <h3 className='text-xl font-bold'>
            Web accessibility audits right from the editor
          </h3>
          <p>
            The extension is being actively developed at{' '}
            <a
              href='https://github.com/a11ywatch/vscode-extension'
              className='underline text-blue-800'
              target={'_blank'}
              rel='noreferrer'
            >
              A11yWatch VSCode Extension Github
            </a>
            .
          </p>

          <p>
            Once the extension is finished, it will be released to the VSCode
            marketing place.
          </p>
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { VSCodeExtension },
  {
    title: `The ${companyName} VSCode extension.`,
    description: `Web accessibility VSCode extension that brings the app straight to the IDE with automated workflows and other tools.`,
  }
)
