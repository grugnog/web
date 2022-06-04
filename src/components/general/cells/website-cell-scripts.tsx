import React, { useState, useEffect } from 'react'
import { Checkbox } from '@material-ui/core'
import { Button } from '@a11ywatch/ui'
import { a11yDark } from '@app/styles'
import { EditableMixture } from '@app/components/mixtures/editable-mixture'
import { CdnBlock } from '../blocks/cdn'
import { SCRIPTS_CDN_URL_HOST } from '@app/configs/app-config'
import { useScript } from '@app/data/external/scripts/scripts'

const classes = {
  info: 'px-2 py-2',
  textHeader: 'text-lg',
  row: 'flex',
  text: '',
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
        <p className={classes.textHeader}>{source?.pageUrl}</p>
        {!source?.issueMeta?.skipContentIncluded ? (
          <div className={`${classes.row} ${classes.centerAlign}`}>
            <p className={classes.text}>Skip Content Button</p>
            {!source?.issueMeta?.skipContentIncluded ? (
              <Checkbox
                checked={
                  !!(
                    !source?.issueMeta?.skipContentIncluded &&
                    source?.scriptMeta?.skipContentEnabled
                  )
                }
                onChange={handleChange}
                inputProps={{
                  'aria-label': `Skip content ${skipContentEnabled}`,
                  title:
                    'Inject a skip content button at the top of your page that shows on tab focus.',
                }}
                disabled={scriptLoading}
                size='small'
              />
            ) : null}
          </div>
        ) : null}
        <>
          <div style={{ flex: 1 }} />
          <div className='flex flex-1 py-2 space-x-2 place-items-center'>
            {editMode ? (
              <Button onClick={submitEdit} className={'hover:text-green-600'}>
                SAVE
              </Button>
            ) : null}
            {source?.cdnUrl ? (
              <div className='flex-1 overflow-hidden'>
                <CdnBlock
                  cdn_url={cdnUrl}
                  cdn_url_min={cdnUrlMinifed}
                  hideUrl
                />
              </div>
            ) : null}
          </div>
        </>
      </div>
      <div className='relative'>
        <div className='absolute top-2 right-3'>
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
