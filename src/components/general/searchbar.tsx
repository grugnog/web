'use client'

import { SyntheticEvent } from 'react'
import { InputBase, Button } from '@material-ui/core'
import { alpha, makeStyles } from '@material-ui/core/styles'
import { useSearchFilter, useSearch } from '@app/data'
import { AppManager, HomeManager } from '@app/managers'
import { GrSearch } from 'react-icons/gr'

const useStyles = makeStyles((theme) => ({
  root: ({ noWidth }: any) => ({
    marginLeft: 12,
    marginRight: 12,
    maxWidth: noWidth ? '50%' : '35%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }),
  submit: {
    border: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingRight: 6,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: ({ noWidth }: any) => ({
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: noWidth ? 'auto' : 120,
      '&:focus': noWidth
        ? {}
        : {
            width: 200,
          },
    },
  }),
}))

export function SearchBar({ placeholder, noWidth, cta }: any) {
  const classes = useStyles({ noWidth })
  const { setSearchFilter } = useSearchFilter()
  const {
    search: ctaSearch = null,
    setSearch,
    loading = false,
    toggleModal = null,
  } = useSearch()

  const submit = (e: SyntheticEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (cta && ctaSearch) {
      HomeManager.submit(null, ctaSearch)

      if (toggleModal) {
        toggleModal(true, ctaSearch)
      }
    } else {
      AppManager.toggleSnack(true, 'Please enter a valid website url', 'error')
    }
  }
  const onSearchChangeEvent = (event: any) => {
    setSearch({ search: event?.target?.value })
  }

  const searchStyles = {
    input: classes.inputInput,
  }

  if (!cta) {
    return (
      <div className={classes.root}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <GrSearch />
          </div>
          <InputBase
            placeholder={placeholder || 'Search…'}
            classes={searchStyles}
            type={'search'}
            onChange={setSearchFilter}
            inputProps={{ 'aria-label': 'Search your websites' }}
          />
        </div>
      </div>
    )
  }

  return (
    <form className={classes.root} onSubmit={submit} noValidate>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <GrSearch />
        </div>
        <InputBase
          placeholder={placeholder || 'Search…'}
          classes={searchStyles}
          type={'search'}
          color={'primary'}
          onChange={onSearchChangeEvent}
          inputProps={{ 'aria-label': 'search your websites' }}
          value={ctaSearch}
        />
        <Button
          type='submit'
          className={classes.submit}
          style={{ visibility: !!ctaSearch ? 'visible' : 'hidden' }}
          disabled={!!loading}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}
