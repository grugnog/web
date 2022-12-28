import { memo } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '../general'
import { Header3 } from '../general/header'
import { settingsHeadingStyle } from '@app/styles/headings'
import { classNames } from '@app/utils/classes'

const ThemesViewComponent = () => {
  const { theme, setTheme } = useTheme()

  const onLightThemeEvent = () => setTheme('light')
  const onDarkThemeEvent = () => setTheme('dark')
  const onSystemThemeEvent = () => setTheme('system')

  return (
    <div className='py-2 pb-6 gap-y-2 border-t space-x-1.5'>
      <div className='py-3'>
        <Header3 className={settingsHeadingStyle}>Appearance</Header3>
        <p className='text-sm'>The current theme is: {theme}</p>
      </div>
      <Button
        onClick={onLightThemeEvent}
        className={classNames(
          theme === 'light' ? 'border-blue-700' : '',
          'border-2'
        )}
      >
        Light
      </Button>
      <Button
        onClick={onDarkThemeEvent}
        className={classNames(
          theme === 'dark' ? 'border-blue-700' : '',
          'border-2'
        )}
      >
        Dark
      </Button>
      <Button
        onClick={onSystemThemeEvent}
        className={classNames(
          theme === 'system' ? 'border-blue-700' : '',
          'border-2'
        )}
      >
        Auto
      </Button>
    </div>
  )
}

export const ThemesView = memo(ThemesViewComponent)
