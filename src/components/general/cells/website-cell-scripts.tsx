import { useState, useEffect } from 'react'
import { Button } from '@app/components/general/buttons/button'
import dynamic from 'next/dynamic'
import { a11yDark } from '@app/styles'
import { CdnBlock } from '../blocks/cdn'
import { SCRIPTS_CDN_URL_HOST } from '@app/configs/app-config'
import { useScript } from '@app/data/external/scripts/scripts'
import { Checkbox } from '../check-box'

const EditableMixture = dynamic(
  () =>
    import('../../mixtures/editable-mixture').then(
      (mod) => mod.EditableMixture
    ),
  { ssr: false, loading: () => <div>Loading editor...</div> }
)

const classes = {
  info: 'px-2 py-2',
  textHeader: 'text-lg',
  row: 'flex',
  text: 'text-sm',
  centerAlign: 'place-items-center',
}

function ScriptCell({ source: sourceData }: any) {
  const [source, setSource] = useState<any>(sourceData)
  const [newScript, setScript] = useState<any>(source?.script ?? sourceData)
  const [editMode, setEdit] = useState<boolean>(false)

  const {
    updateScript,
    scriptLoading,
    updateScriptData: newItemUpdate,
  } = useScript(source.pageUrl, true)

  useEffect(() => {
    if (newItemUpdate) {
      setSource(newItemUpdate)
    }
  }, [newItemUpdate])

  const handleChange = async (e: any) => {
    e?.preventDefault()

    try {
      await updateScript({
        variables: {
          url: source?.pageUrl,
          scriptMeta: {
            skipContentEnabled: !source?.scriptMeta?.skipContentEnabled,
          },
          editScript: false,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const onEditPress = (e: any) => {
    e?.preventDefault()
    setEdit(!editMode)
  }

  const submitEdit = async (e: any) => {
    e?.preventDefault()
    const confirm = window.confirm(
      'Are you sure you wish to save this script? Your script may be changed to reflect your page as problems arise.'
    )
    if (confirm) {
      try {
        await updateScript({
          variables: {
            url: source?.pageUrl,
            scriptMeta: {
              skipContentEnabled,
            },
            editScript: true,
            newScript,
          },
        })
        setSource({ ...source, script: newScript })
        setEdit(false)
      } catch (e) {
        console.error(e)
      }
    }
  }

  // TODO: REMOVE ALL URL CLIENT APPENDING
  const cdnUrl = source?.cdnUrl
    ? `${SCRIPTS_CDN_URL_HOST}/${source?.cdnUrl}`
    : 'N/A'
  const cdnUrlMinifed = source?.cdnUrlMinified
    ? `${SCRIPTS_CDN_URL_HOST}/${source?.cdnUrlMinified}`
    : 'N/A'

  const skipContentEnabled = source?.scriptMeta?.skipContentEnabled

  return (
    <div>
      <div className={classes.info}>
        {!source?.issueMeta?.skipContentIncluded ? (
          <div className={`${classes.row} ${classes.centerAlign} space-x-2`}>
            <p className={classes.text}>Skip content button</p>
            {!source?.issueMeta?.skipContentIncluded ? (
              <Checkbox
                checked={
                  !!(
                    !source?.issueMeta?.skipContentIncluded &&
                    source?.scriptMeta?.skipContentEnabled
                  )
                }
                onChange={handleChange}
                aria-label={`Skip content ${skipContentEnabled}`}
                title='Inject a skip content button at the top of your page that shows on tab focus.'
                disabled={scriptLoading}
              />
            ) : null}
          </div>
        ) : null}
        <>
          <div className='flex = py-2 space-x-2 place-items-center py-2'>
            {source?.cdnUrl ? (
              <CdnBlock cdn_url={cdnUrl} cdn_url_min={cdnUrlMinifed} hideUrl />
            ) : null}
          </div>
          {editMode ? (
            <div className='flex space-x-2'>
              <Button
                onClick={submitEdit}
                className={
                  'text-green-800 border-green-800 font-medium rounded-3xl'
                }
              >
                Save
              </Button>
              <Button
                onClick={onEditPress}
                className={
                  'text-gray-800 border-gray-800 font-medium rounded-3xl'
                }
              >
                Cancel
              </Button>
            </div>
          ) : null}
        </>
      </div>
      <div className='relative'>
        <div className='absolute top-2 right-5'>
          <button
            onClick={onEditPress}
            className={
              'hover:bg-blue-800 text-white border-white h-8 px-4 border rounded'
            }
          >
            {editMode ? 'Default' : 'Edit'}
          </button>
        </div>
        <EditableMixture
          language='javascript'
          style={a11yDark}
          lineProps={() => ({
            style: { display: 'block', cursor: 'pointer' },
          })}
          setScript={setScript}
          editMode={editMode}
        >
          {source?.script || ''}
        </EditableMixture>
      </div>
    </div>
  )
}

export { ScriptCell }
