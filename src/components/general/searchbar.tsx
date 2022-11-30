'use client'

import { SyntheticEvent } from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles'
import { useSearchFilter, useSearch } from '@app/data'
import { AppManager, HomeManager } from '@app/managers'
import { GrSearch } from 'react-icons/gr'

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.up('sm')]: {
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

  if (!cta) {
    return (
      <div className={`px-2`}>
        <div className={`rounded-xl ${classes.search}`}>
          <div className={classes.searchIcon}>
            <GrSearch />
          </div>
          <label className='sr-only' id={'search-w'}>
            Search your websites
          </label>
          <input
            placeholder={placeholder || 'Search…'}
            className={`bg-gray-100 pl-12 pr-2 py-2 ${classes.inputInput}`}
            type={'search'}
            onChange={setSearchFilter}
            aria-labelledby='search-w'
          />
        </div>
      </div>
    )
  }

  return (
    <form className={`px-2 hidden md:block`} onSubmit={submit} noValidate>
      <div className={`rounded ${classes.search}`}>
        <div className={classes.searchIcon}>
          <GrSearch />
        </div>
        <label className='sr-only' id={'search-w'}>
          Search your websites
        </label>
        <input
          placeholder={placeholder || 'Search…'}
          className={`bg-gray-100 pl-14 pr-2 py-2 ${classes.inputInput}`}
          type={'search'}
          onChange={onSearchChangeEvent}
          aria-labelledby='search-w'
          value={ctaSearch}
        />

        <button
          type='submit'
          className={`bg-black text-white text-base font-semibold px-4 py-2 hover:bg-100 rounded-r ${
            !!ctaSearch ? 'visible' : 'hidden'
          }`}
          disabled={!!loading}
        >
          Submit
        </button>
      </div>
    </form>
  )
}
