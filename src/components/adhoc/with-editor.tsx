import { useState, useEffect, memo } from 'react'
import MonacoEditor from '@monaco-editor/react'
import ReactSizeDetector from 'react-resize-detector'

const WithEditorComponent = ({
  setScript,
  children = '',
  language = 'javascript',
}: any) => {
  const [value, setValue] = useState<any>(children || '')

  useEffect(() => {
    setScript && setScript(value)
  }, [setScript, value])

  return (
    <ReactSizeDetector handleWidth handleHeight>
      {({ height, width }: { width?: number; height?: number }) => (
        <MonacoEditor
          onChange={setValue}
          value={value}
          language={language}
          defaultValue={children}
          theme='vs-dark'
          height={
            typeof height === 'undefined'
              ? typeof window !== 'undefined'
                ? window.innerHeight / 1.4
                : 500
              : height || '100%'
          }
          width={width || '100%'}
        />
      )}
    </ReactSizeDetector>
  )
}

export const WithEditor = memo(WithEditorComponent)
