import { useState, useEffect, memo } from 'react'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(
  () =>
    import('@monaco-editor/react'),
  { ssr: false, loading: () => <div>Loading editor...</div> }
) 

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
    <MonacoEditor
      onChange={setValue}
      value={value}
      language={language}
      defaultValue={children}
      theme='vs-dark'
      height={typeof window !== 'undefined' ? window.innerHeight / 1.4 : 500}
      width={'100%'}
    />
  )
}

export const WithEditor = memo(WithEditorComponent)
