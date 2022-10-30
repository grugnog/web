import { GrFormCheckmark } from 'react-icons/gr'

const highLight = (
  name: string = '',
  highLightStyles: any,
  { basic, premium, free }: any
) =>
  (basic && name === 'Basic') ||
  (premium && name === 'Premium') ||
  (free && name === 'Free')
    ? highLightStyles
    : ''

export function PriceCell({
  basic = false,
  premium = false,
  onClick,
  details,
  pricingPage,
  textColor,
  title,
  yearly,
  subTitle,
  costYearly,
  cost,
  free,
}: any) {
  const SubHeading = ({ children, ...extra }: any) =>
    pricingPage ? (
      <h3 {...extra}>{children}</h3>
    ) : (
      <h4 {...extra}> {children}</h4>
    )

  // feature with plan
  const Description = ({ children, ...extra }: any) =>
    pricingPage ? (
      <h4 {...extra}>{children}</h4>
    ) : (
      <h5 {...extra}>{children}</h5>
    )

  return (
    <button
      className={`min-w-[330px] rounded flex flex-1 flex-col justify-between ${highLight(
        title,
        'bg-gray-800 text-white',
        {
          premium,
          basic,
          free,
        }
      )}  border border-[#2A2A2A] border-t-[4px] border-2 ${
        onClick
          ? `hover:border-blue-700 hover:opacity-95 active:opacity-90 active:opacity-100 active:border-[#2A2A2A]`
          : ''
      } rounded`}
      onClick={onClick}
    >
      <>
        <div className='w-full'>
          <div
            className='text-left w-full flex-col text-white px-8 py-2 pb-3'
            style={{ backgroundColor: textColor }}
          >
            <SubHeading className='text-3xl font-bold'>
              <span>{title}</span>
              {cost ? (
                <span className={'text-2xl font-semibold block'}>
                  {yearly ? costYearly : cost}
                </span>
              ) : null}
            </SubHeading>
            <div className='lg max-w-[350px] xl:max-w-[380px]'>
              <p className='text-xl max-w-[320px]'>{subTitle}</p>
            </div>
          </div>

          <ul className='px-4 space-y-1 py-2'>
            {details?.map((item: string, i: number) => (
              <li
                className={'flex gap-x-3 place-items-center text-left'}
                key={`${item}-${i}`}
                aria-hidden={!String(item).trim()}
              >
                <div
                  className='rounded-xl text-white stroke-white'
                  style={{
                    backgroundColor: textColor,
                  }}
                >
                  <GrFormCheckmark className='grIcon' />
                </div>
                <Description className='text-base'>{item}</Description>
              </li>
            ))}
          </ul>
        </div>
      </>
    </button>
  )
}
