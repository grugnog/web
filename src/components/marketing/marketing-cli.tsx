import React from 'react'
import { FakeButtonContainer } from '../fake'
import { SectionContainer } from '../general'
import { SectionHeading } from '../text'

export function MarketingCli() {
  const previewStyles = {
    width: '10px',
    display: 'inline-block',
    height: '1.25rem',
    marginLeft: '0.2rem',
    transform: 'translateY(0.2rem)',
    backgroundColor: 'rgb(160, 160, 160)',
  }

  const infoDetails = [
    {
      title: 'Local',
      subTitle:
        'Want to host A11yWatch on your own? In one command start the project with docker or directly on the machine. It takes less than 2gb to handle the entire suite.',
    },
    {
      title: 'Remote Deployment',
      subTitle: `Run anywhere, with the CLI you can target AWS, GCP, or Azure to host the application via terraform. Quickly bring up or down a full A11yWatch suite in one command.`,
    },
    {
      title: 'CI',
      subTitle:
        'Need to run accessibility test after each PR? Use on any CI that supports docker like CircleCI, Jenkins, and Github Actions.',
    },
  ]

  return (
    <SectionContainer className={'bg-gray-100'}>
      <SectionHeading>Accessibility Portability CLI</SectionHeading>
      <p className='text-lg pb-4'>
        Run A11yWatch on any machine with the Rust Command Line Interface. Make
        sure{' '}
        <a
          href='https://www.rust-lang.org/tools/install'
          target={'_blank'}
          rel='noreferrer'
          aria-label='rust install link'
          className='text-blue-400'
        >
          Rust
        </a>{' '}
        and{' '}
        <a
          href='https://www.docker.com/products/docker-desktop'
          target={'_blank'}
          rel='noreferrer'
          aria-label='docker install link'
          className='text-blue-400'
        >
          Docker
        </a>{' '}
        is installed first to get started.
      </p>
      <div className='space-y-4'>
        <pre className='p-4 bg-white rounded'>cargo install a11ywatch_cli</pre>
        <div className='flex flex-wrap space-x-5 space-y-4'>
          <div className='flex-1 bg-white rounded sm:w-1/3'>
            <FakeButtonContainer title='Bash' />
            <div className='border-b' />
            <div className='bg-white'>
              <div className='py-4 px-4 text-gray-800 text-lg'>
                <span className='text-gray-400'>~ </span> a11ywatch start -f{' '}
                <i className='text-gray-400'># view browser localhost:3270</i>
                <span style={previewStyles}></span>
              </div>
            </div>
          </div>
          <div className='md:w-1/2 sm:w-1/3'>
            <ul className={'text-left space-y-2'}>
              {infoDetails.map(
                (detail: { title: string; subTitle: string }, i: number) => {
                  return (
                    <li key={i}>
                      <div className={'text-2xl font-semibold'}>
                        {detail.title}
                      </div>
                      <div className={'text-lg'}>{detail.subTitle}</div>
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
