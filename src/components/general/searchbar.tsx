'use client'

import { SyntheticEvent } from 'react'
import { useSearchFilter, useSearch } from '@app/data'
import { AppManager, HomeManager } from '@app/managers'
import { GrSearch } from 'react-icons/gr'

export function SearchBar({ placeholder, noWidth, cta }: any) {
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
  const onSearchChangeEvent = (event: any) =>
    setSearch({ search: event?.target?.value })

  if (!cta) {
    return (
      <div className={`px-2`}>
        <div
          className={`bg-gray-100 hover:bg-gray-50 rounded-2xl relative flex place-items-center rounded ${
            noWidth ? '' : 'md:w-full'
          }`}
        >
          <div
            className={'absolute w-12 flex place-content-center pointer-none'}
          >
            <GrSearch />
          </div>
          <label className='sr-only' id={'search-w'}>
            Search your websites
          </label>
          <input
            placeholder={placeholder || 'Search…'}
            className={`bg-transparent pl-12 pr-2 py-2 transition duration-150 ease-in hover:ease-out w-32 focus:w-full`}
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
      <div
        className={`bg-gray-100 transition-colors hover:bg-black hover:text-white  rounded-2xl relative flex place-items-center ${
          noWidth ? 'md:min-w-[287.516px]' : 'md:w-full'
        }`}
      >
        <div className={'absolute w-12 flex place-content-center pointer-none'}>
          <GrSearch className='grIcon' />
        </div>
        <label className='sr-only' id={'search-w'}>
          Search your websites
        </label>
        <input
          placeholder={placeholder || 'Search…'}
          className={`bg-transparent pl-12 pr-2 py-2 outline-none hover:outline-none focus:outline-none transition duration-150 ease-in hover:ease-out w-full`}
          type={'search'}
          onChange={onSearchChangeEvent}
          aria-labelledby='search-w'
          value={ctaSearch}
        />

        <button
          type='submit'
          className={`bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-r-2xl ${
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
