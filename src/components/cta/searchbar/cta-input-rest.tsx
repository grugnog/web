'use client'

import { useState, useRef, SyntheticEvent, useCallback } from 'react'
import { AppManager } from '@app/managers'
import { useRestWebsiteContext } from '@app/components/providers/rest/rest-website'

function CtaInputRest({ small }: { small?: boolean }) {
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
      className={`flex flex-col md:flex-row br-4 w-initial md:w-fit ${
        searchFocused ? ' ring' : ''
      }`}
      onSubmit={submitForm}
      noValidate
    >
      <div
        className={`relative flex bg-gray-200 rounded-t-md md:rounded-tr-none md:rounded-bl-md md:rounded-l-md md:rounded-tr-none hover:bg-gray-300`}
      >
        <label htmlFor='search-input-c' className='sr-only'>
          Scan your website for issues
        </label>
        <input
          placeholder={'Enter website url'}
          id='search-input-c'
          ref={ref}
          type='url'
          className={`w-full md:w-inherit px-6 ${
            small ? 'py-1.5' : 'py-3'
          } text-lg bg-transparent `}
          onBlur={toggleSearch(false)}
          onFocus={toggleSearch(true)}
          onChange={setSearch}
          minLength={4}
          name={'search'}
        />
      </div>
      <button
        className={`min-w-[187.562px] text-xl border font-bold rounded-b-md md:rounded-bl-none md:rounded-r-md ${
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
