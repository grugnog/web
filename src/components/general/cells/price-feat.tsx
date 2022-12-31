import { PropsWithChildren } from 'react'
import { GrFormCheckmark } from 'react-icons/gr'

const SubHeading = ({ children, pricingPage, ...extra }: any) =>
  pricingPage ? <h3 {...extra}>{children}</h3> : <h4 {...extra}> {children}</h4>

// feature with plan
const Description = ({ children, pricingPage, ...extra }: any) =>
  pricingPage ? <h4 {...extra}>{children}</h4> : <h5 {...extra}>{children}</h5>

export const PriceFeat = ({
  details,
  pricingPage,
  textColor,
  title,
  yearly,
  subTitle,
  costYearly,
  cost,
  children,
}: PropsWithChildren<any>) => {
  return (
    <div
      className={`w-full flex-1 md:w-auto min-w-[330px] rounded flex flex-col justify-between bg-white dark:bg-black border border-[#2A2A2A] border-t-[4px] border-2 rounded`}
    >
      <>
        <div className='w-full'>
          <div
            className='text-left w-full flex-col  px-8 py-1 border-b'
            style={{ backgroundColor: textColor }}
          >
            <SubHeading
              className='text-3xl font-semibold'
              pricingPage={pricingPage}
            >
              <span>{title}</span>
              {cost ? (
                <span className={'text-2xl font-semibold block'}>
                  {yearly ? costYearly : cost}
                </span>
              ) : null}
            </SubHeading>
            {subTitle ? (
              <div className='lg max-w-[350px] xl:max-w-[380px]'>
                <p className='text-xl max-w-[320px]'>{subTitle}</p>
              </div>
            ) : null}
          </div>

          <ul className='px-4 space-y-1 py-2'>
            {details?.map((item: string, i: number) => (
              <li
                className={'flex gap-x-3 place-items-center text-left'}
                key={`${item}-${i}`}
                aria-hidden={!item}
              >
                <div className='rounded-xl text-white stroke-white bg-gray-800'>
                  <GrFormCheckmark className='grIcon' />
                </div>
                <Description className='text-base' pricingPage={pricingPage}>
                  {item}
                </Description>
              </li>
            ))}
          </ul>

          {children}
        </div>
      </>
    </div>
  )
}
