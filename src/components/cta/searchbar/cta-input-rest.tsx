import { useState, useRef, SyntheticEvent, useCallback } from 'react'
import { InputLabel, InputBase } from '@material-ui/core'
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import { AppManager } from '@app/managers'
import { useRestWebsiteContext } from '@app/components/providers/rest/rest-website'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: 'fit-content',
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
        flexDirection: 'column',
        width: 'auto',
      },
    },
    search: {
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
      padding: 4,
      paddingLeft: 12,
      backgroundColor: alpha(theme.palette.common.black, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
      },
      borderTopLeftRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: theme.shape.borderRadius,
      [theme.breakpoints.down('sm')]: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    hiddenLabel: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: 1,
    },
    submit: {
      width: 'auto',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      borderColor: 'rgba(0, 0, 0, 0.12) !important',
      borderWidth: 1,
      minWidth: '187.562px',
      fontWeight: 'bold',
      fontSize: '1.5rem',
      [theme.breakpoints.down('sm')]: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
    },
    inputRoot: {
      color: 'inherit',
    },
  })
)

function CtaInputRest() {
  const classes = useStyles()
  const ref = useRef<HTMLInputElement>(null)
  const [searchFocused, setSearchFocused] = useState<boolean>()
  const { search, setSearch, loading, toggleModal } = useRestWebsiteContext()

  const toggleSearch =
    (open: boolean = false) =>
    () => {
      if (open && !searchFocused && ref?.current) {
        ref?.current?.focus()
      }
      setSearchFocused(!!open)
    }

  const submitForm = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e?.preventDefault()
      if (!search) {
        return AppManager.toggleSnack(
          true,
          `Please enter a valid web url`,
          'error'
        )
      }
      await toggleModal(search)

      if (ref.current) {
        ref.current.value = ''
      }
    },
    [toggleModal, ref, search]
  )

  return (
    <form
      className={`${classes.root}${searchFocused ? ' ring' : ''}`}
      onSubmit={submitForm}
      noValidate
    >
      <div className={classes.search}>
        <InputLabel
          htmlFor='search-input-c'
          classes={{ root: classes.hiddenLabel }}
        >
          Scan your website for issues
        </InputLabel>
        <InputBase
          placeholder={'Enter website url'}
          id='search-input-c'
          inputRef={ref}
          color={'primary'}
          type='url'
          classes={{
            root: classes.inputRoot,
            input: 'p-1',
          }}
          onBlur={toggleSearch(false)}
          onFocus={toggleSearch(true)}
          onChange={setSearch}
          inputProps={{
            minLength: 4,
            name: 'search',
          }}
        />
      </div>
      <button
        className={`${classes.submit} ${
          loading || !search ? 'text-gray-500' : ''
        } hover:bg-[#0E1116] hover:text-white`}
        type={'submit'}
        disabled={loading || !search}
        aria-label={loading ? 'Scanning website loading' : 'Analyze website'}
      >
        ANALYZE
      </button>
    </form>
  )
}

export { CtaInputRest }
