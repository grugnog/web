import React, { useState, useEffect, useMemo } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core'
import { Button } from '@a11ywatch/ui'
import { scriptData } from '@app/data'
import { UserManager, AppManager } from '@app/managers'
import { a11yDark } from '@app/styles'
import Collapse from '@material-ui/core/Collapse'
import { EditableMixture } from '@app/components/mixtures/editable-mixture'
import { collaspeListStyles as useStyles } from './styles'
import { GrDomain, GrDown, GrUp } from 'react-icons/gr'
import { CdnBlock } from './blocks/cdn'
import { SCRIPTS_CDN_URL_HOST } from '@app/configs/app-config'

const handleClick = (item: any, open: boolean, cb?: any) => {
  cb(item === open ? '' : item)
}

const upgradeAccountError = (): void => {
  AppManager.toggleSnack(
    true,
    'You need to upgrade your account to edit scripts',
    'warning'
  )
}

function MainCell({
  source: sourceData,
  classes,
  updateScript,
  scriptLoading,
  newItemUpdate,
  cdn,
}: any) {
  const [source, setSource] = useState<any>(sourceData)
  const [newScript, setScript] = useState<any>(source?.script ?? sourceData)
  const [editMode, setEdit] = useState<boolean>(false)
  const freeAccount = UserManager.freeAccount && !UserManager.firstDay
  const skipContentEnabled = source?.scriptMeta?.skipContentEnabled

  useEffect(() => {
    if (newItemUpdate) {
      setSource(newItemUpdate)
    }
  }, [newItemUpdate])

  const handleChange = async (e: any) => {
    e?.preventDefault()

    if (freeAccount) {
      return upgradeAccountError()
    }
    try {
      await updateScript({
        variables: {
          url: source?.pageUrl,
          scriptMeta: {
            skipContentEnabled: !skipContentEnabled,
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
    if (freeAccount) {
      return upgradeAccountError()
    }
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

  return (
    <li>
      <div className={classes.info}>
        <ListItemText
          primaryTypographyProps={{
            className: classes.textHeader,
          }}
        >
          {source?.pageUrl}
        </ListItemText>
        {!source?.issueMeta?.skipContentIncluded ? (
          <div className={classes.row}>
            <ListItemText primaryTypographyProps={{ className: classes.text }}>
              Skip Content Button
            </ListItemText>
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

            {cdn && source?.cdnUrl ? (
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
    </li>
  )
}

function CollaspeListEntry({
  classes,
  item,
  updateScript,
  scriptLoading,
  open,
  setOpen,
  updateScriptData,
  cdn,
}: any) {
  const [sectionTitle, sectionData] = item
  const [newItemUpdate, setUpdate] = useState<any>({ key: null, script: null })

  // TODO: RE-VISIT
  useEffect(() => {
    const scriptData = updateScriptData?.updateScript

    if (scriptData) {
      const newScript = scriptData.script
      // const newDomain = newScript.domain
      const newPageUrl = newScript.pageUrl

      if (sectionData) {
        const dataSourceIndex = sectionData.findIndex(
          (source: any) => source.pageUrl === newPageUrl
        )
        if (sectionData[dataSourceIndex]) {
          setUpdate({ key: dataSourceIndex, script: newScript })
        }
      }
    }
  }, [updateScriptData, sectionData])

  return (
    <div className='border'>
      <ListItem button onClick={() => handleClick(sectionTitle, open, setOpen)}>
        <ListItemIcon>
          <GrDomain />
        </ListItemIcon>
        <ListItemText primary={sectionTitle} />
        {sectionTitle === open ? <GrUp /> : <GrDown />}
      </ListItem>
      <Collapse in={sectionTitle === open} timeout='auto' unmountOnExit>
        <ul>
          {sectionData?.map((source: any, index: number) => (
            <MainCell
              source={source}
              classes={classes}
              updateScript={updateScript}
              key={`${source.pageUrl}`}
              scriptLoading={scriptLoading}
              newItemUpdate={
                index === newItemUpdate?.key ? newItemUpdate?.script : null
              }
              cdn={cdn}
            />
          ))}
        </ul>
      </Collapse>
    </div>
  )
}

// List render - used for scripts and cdns
export function CollaspeList({ dataSource, cdn }: any) {
  const classes = useStyles()
  const [open, setOpen] = useState<boolean | string>(true)
  const { updateScript, updateScriptData, scriptLoading } = scriptData('')

  const entries = useMemo(() => Object.entries(dataSource), [dataSource])

  useEffect(() => {
    if (entries?.length === 1) {
      setOpen(entries[0][0])
    }
  }, [entries, setOpen])

  if (!entries.length) {
    return <div className='text-2xl'>No Scripts added yet</div>
  }

  return (
    <List aria-labelledby='nested-list-subheader' className={classes.root}>
      {entries?.map((item: any, ek: number) => (
        <CollaspeListEntry
          key={ek}
          item={item}
          cdn={cdn}
          classes={classes}
          setOpen={setOpen}
          open={open}
          updateScript={updateScript}
          scriptLoading={scriptLoading}
          updateScriptData={updateScriptData}
        />
      ))}
    </List>
  )
}
