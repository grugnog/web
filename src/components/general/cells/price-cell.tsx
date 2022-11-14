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
}: any) {
  return (
    <button
      className={`md:min-w-[340px] w-full rounded flex flex-1 flex-col justify-between border border-[#2A2A2A] ${highLight(
        'border-blue-500 text-gray-900',
        selected,
        ''
      )} border-t-[4px] border-2 ${
        onClick
          ? `hover:border-blue-700 hover:opacity-95 active:opacity-90 active:opacity-100 active:border-[#2A2A2A]`
          : ''
      } rounded`}
      onClick={onClick}
    >
      <>
        <div className='w-full'>
          <div
            className={`text-left w-full flex-col text-white px-8 py-1 text-gray-800 ${highLight(
              'bg-blue-500 text-white',
              selected,
              selectHighPlans ? 'bg-gradient-radial' : `bg-[${textColor}]`
            )}`}
          >
            <SubHeading
              className={`text-2xl font-bold w-full  ${highLight(
                'text-white',
                selected,
                selectHighPlans ? 'text-gray-800' : ''
              )}`}
              pricingPage={pricingPage}
            >
              <span>{title}</span>
              {cost ? (
                <span className={'text-xl font-semibold block'}>
                  {yearly ? costYearly : cost}
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
