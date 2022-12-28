import { FC, useState, memo } from 'react'
import { InnerWrapper } from './list-wrapper'
import { useScriptsData } from '@app/data/external/scripts/scripts'
import { ScriptCell } from '../cells'
import { LoadMoreButton } from '../buttons'
import { listStyle } from '@app/styles/lists/tw'

// return Scripts maped todo refactor
function ScriptsWrapper(props: any) {
  const [visible, setVisible] = useState<boolean>(false)
  const onTogglelist = () => setVisible((v: boolean) => !v)

  return (
    <li>
      <button
        className={`px-3 py-3 hover:opacity-70 w-full text-left md:text-base ${
          visible ? 'rounded-b-none' : ''
        }`}
        onClick={onTogglelist}
        aria-expanded={visible}
        aria-label={`Toggle section visible for ${props?.pageUrl}`}
      >
        {props?.pageUrl}
      </button>
      <div
        aria-hidden={!visible}
        className={`${visible ? 'visible' : 'hidden'} rounded-b`}
      >
        <ScriptCell source={props} />
      </div>
    </li>
  )
}

// memo expensiveScripts
const Scripts = memo(ScriptsWrapper)

export const RenderInnerScripts: FC<any> = (props) => {
  const { pageUrl, generalProps } = props
  const all = props?.data?.subdomains || props?.data?.tld

  const {
    data: scriptSource,
    loading,
    onLoadMore,
  } = useScriptsData(pageUrl, all)

  return (
    <>
      <InnerWrapper
        {...props}
        data={!!scriptSource?.length}
        loading={loading}
        generalProps={generalProps}
        emptyHeaderTitle={
          'Scripts not set, DNS requires verification in order to enable.'
        }
      >
        <ul>
          {scriptSource?.map((page: any) => (
            <Scripts key={page._id} {...page} {...generalProps} />
          ))}
        </ul>
      </InnerWrapper>
      <div className={`pb-8 ${scriptSource?.length > 1 ? '' : 'hidden'}`}>
        <LoadMoreButton
          visible={scriptSource?.length > 1}
          onLoadMoreEvent={onLoadMore}
          loading={loading}
          title={'Load more scripts'}
        />
      </div>
    </>
  )
}

const ListCell = ({
  item,
  loading,
  error,
  emptyHeaderTitle,
  emptyHeaderSubTitle,
  generalProps,
}: any) => {
  const [visible, setVisible] = useState<boolean>(false)

  const onTogglelist = () => {
    setVisible((v: boolean) => !v)
  }

  return (
    <li
      key={item?._id}
      className={`border-4 rounded ${visible ? 'rounded-b-none' : ''}`}
    >
      <button
        className={`px-3 py-3 w-full text-left`}
        onClick={onTogglelist}
        aria-expanded={visible}
        aria-label={`Toggle section visible for ${item?.domain}`}
      >
        <div className={'text-lg md:text-xl font-semibold truncate'}>
          {item?.domain}
        </div>
      </button>
      {visible ? (
        <RenderInnerScripts
          data={item}
          pageUrl={item.url}
          loading={loading}
          error={error}
          emptyHeaderTitle={emptyHeaderTitle}
          emptyHeaderSubTitle={emptyHeaderSubTitle}
          generalProps={generalProps}
        />
      ) : null}
    </li>
  )
}

export function ListComponent({
  data,
  error,
  loading,
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  refetch,
  setModal,
  mutatationLoading,
  children,
}: any) {
  return (
    <ul className={listStyle}>
      {data?.map((item: any) => (
        <ListCell
          key={item?._id}
          item={item}
          pageUrl={item.url}
          loading={loading}
          error={error}
          emptyHeaderTitle={emptyHeaderTitle}
          emptyHeaderSubTitle={emptyHeaderSubTitle}
          generalProps={{
            refetch,
            setModal,
            mutatationLoading: mutatationLoading,
          }}
        />
      ))}
      {children}
    </ul>
  )
}

export const List = memo(ListComponent)
