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
        'Want to host A11yWatch on your own? In one command start the project with docker or directly on the machine. Tear up or down the project in seconds with our slim multi-staged binary builds.',
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
      <SectionHeading>Accessibility CLI</SectionHeading>
      <p className='text-lg pb-4 leading-10'>
        Run A11yWatch on any machine using the Rust Command Line Interface. With{' '}
        <a
          href='https://www.rust-lang.org/tools/install'
          target={'_blank'}
          rel='noreferrer'
          aria-label='Rust lang install link'
          className='text-blue-600'
        >
          Rust
        </a>{' '}
        and{' '}
        <a
          href='https://www.docker.com/products/docker-desktop'
          target={'_blank'}
          rel='noreferrer'
          aria-label='Docker install link'
          className='text-blue-600'
        >
          Docker
        </a>{' '}
        build the suite anywhere. Get the CLI simply in shell using{' '}
        <code className='text-gray-700 bg-gray-300 p-1'>
          cargo install a11ywatch_cli
        </code>
        .
      </p>
      <div className='space-y-4'>
        <div className='flex flex-wrap space-x-5 space-y-4'>
          <div className='flex-1 bg-white rounded sm:w-1/3 shadow'>
            <FakeButtonContainer title='Bash' />
            <div className='border-b' />
            <div className='bg-white'>
              <div className='py-3 px-3 text-lg'>
                <div className='text-gray-600'>
                  <span className='text-gray-500'>~ </span> cargo install
                  a11ywatch_cli
                </div>
                <div className='text-gray-600'>
                  <span className='text-gray-500'>~ </span> a11ywatch start
                </div>
                <div className='text-gray-800'>
                  <span className='text-gray-600'>~ </span> a11ywatch scan -u
                  https://hbo.com
                  <span style={previewStyles}></span>
                </div>
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
