import { GrFormCheckmark } from 'react-icons/gr'

const highLight = (highLightStyles: any, selected: boolean, d: string = '') =>
  selected ? highLightStyles : d

const SubHeading = ({ children, pricingPage, ...extra }: any) =>
  pricingPage ? <h3 {...extra}>{children}</h3> : <h4 {...extra}> {children}</h4>

// feature with plan
const Description = ({ children, pricingPage, ...extra }: any) =>
  pricingPage ? <h4 {...extra}>{children}</h4> : <h5 {...extra}>{children}</h5>

export function PriceCell({
  selected,
  onClick,
  details,
  pricingPage,
  textColor,
  title,
  yearly,
  subTitle,
  costYearly,
  cost,
  selectHighPlans,
  activePlan,
  pageCount,
}: any) {
  const pageCountFormatted = Intl.NumberFormat().format(pageCount || 0)

  return (
    <button
      className={`md:min-w-[386.53px] w-full h-full rounded flex flex-1 flex-col justify-between border border-[#2A2A2A] ${highLight(
        'border-blue-600 text-gray-900',
        selected,
        ''
      )} border-t-[4px] border-2 ${
        onClick
          ? `hover:border-blue-700 hover:opacity-95 active:opacity-90 active:opacity-100 active:border-[#2A2A2A]`
          : ''
      } rounded`}
      onClick={onClick}
      disabled={activePlan}
    >
      <>
        <div className='w-full'>
          <div
            className={`text-left w-full flex-col text-white px-8 py-4 text-gray-800 ${highLight(
              'bg-blue-700 text-white',
              selected,
              selectHighPlans ? 'bg-gradient-radial' : `bg-[${textColor}]`
            )}`}
          >
            <SubHeading
              className={`w-full ${highLight(
                'text-gray-50',
                selected,
                selectHighPlans ? 'text-gray-800' : ''
              )}`}
              pricingPage={pricingPage}
            >
              <span className='text-xl'>
                {title}
                {activePlan ? (
                  <span className='text-sm'>{' Active Plan'}</span>
                ) : null}
              </span>
              {cost ? (
                <span className={'text-base block font-light'}>
                  {yearly ? costYearly : cost} |{' '}
                  <span
                    className={`text-sm ${
                      selectHighPlans && !selected
                        ? 'text-gray-800'
                        : 'text-gray-100'
                    }`}
                  >
                    up to {pageCountFormatted} daily analyzations
                  </span>
                </span>
              ) : null}
            </SubHeading>
            {subTitle ? (
              <div className='max-w-[350px] xl:max-w-[380px]'>
                <p className='text-lg max-w-[325px]'>{subTitle}</p>
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
                <div
                  className='rounded-xl text-white stroke-white'
                  style={{
                    backgroundColor: textColor,
                  }}
                >
                  <GrFormCheckmark className='grIcon' />
                </div>
                <Description className='text-base' pricingPage={pricingPage}>
                  {item}
                </Description>
              </li>
            ))}
          </ul>
        </div>
      </>
    </button>
  )
}
