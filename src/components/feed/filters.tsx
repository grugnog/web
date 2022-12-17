import React from 'react'
import { observer } from 'mobx-react-lite'
import { FilterItem, FilterManager } from '@app/managers/filters'
import { DropDown } from './dropdown'
import { Menu } from '@headlessui/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const CheckBox = observer(({ name }: FilterItem & { name: string }) => {
  const { checked } = FilterManager.filters.get(name) ?? {}

  const onClick = () => FilterManager.toggleFilter(name)

  const id = `check-${name}`

  return (
    <div className='text-gray-700 px-3 py-2 overflow-hidden text-xs'>
      <input
        className='appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onClick}
      />
      <label
        className='text-gray-800 inline-block max-w-[82%] lg:max-w-[84%] xl:max-w-[89%] pt-0.5 truncate'
        htmlFor={id}
      >
        {name}
      </label>
    </div>
  )
})

export const FilterList = observer(() => {
  const filters = FilterManager.filterList

  if (!filters.length) {
    return (
      <div className='py-3 px-3 max-h-40' role='none'>
        No items to filter yet...
      </div>
    )
  }

  return (
    <ul className='py-1 max-h-40 overflow-y-auto z-20' role='none'>
      {filters.map((item) => {
        return (
          <Menu.Item key={item}>
            {({ active }) => {
              return (
                <div
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  )}
                >
                  <CheckBox name={item} />
                </div>
              )
            }}
          </Menu.Item>
        )
      })}
    </ul>
  )
})

export const FilterDropdown = ({
  open,
  right,
}: {
  open?: boolean
  right?: boolean
}) => {
  return (
    <DropDown open={open} right={right}>
      <FilterList />
    </DropDown>
  )
}
