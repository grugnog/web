'use client'

import { SyntheticEvent, useCallback } from 'react'
import { AppManager } from '@app/managers'
import { useRestWebsiteContext } from '@app/components/providers/rest/rest-website'
import { EditableMixture } from '@app/components/mixtures/editable-mixture'
import { a11yDark } from '@app/styles'
import { AccessibilityStandardKeys } from '@app/components/general/select/select-input'

function CtaHtmlInputRest({standard}: {standard?: AccessibilityStandardKeys}) {
  const { html, setHtml, loading, toggleModal } = useRestWebsiteContext()

  const submitForm = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e?.preventDefault()
      if (!html) {
        return AppManager.toggleSnack(true, `Please enter valid HTML5`, 'error')
      }
      await toggleModal({html, standard}, true)
    },
    [toggleModal, html]
  )

  return (
    <form
      className={`w-full block`}
      onSubmit={submitForm}
      noValidate
    >
        <EditableMixture
          language='html'
          style={a11yDark}
          lineProps={() => ({
            style: { display: 'block', cursor: 'pointer' },
          })}
          setScript={setHtml}
          editMode={true}
        >
          {html || ""}
        </EditableMixture>
      <button
        className={`w-full min-w-[187.562px] py-1.5 text-xl border font-bold rounded-b-md md:rounded-bl-none md:rounded-r-md ${
          loading || !html ? 'text-gray-600' : ''
        } hover:bg-[#0E1116] hover:text-white`}
        type={'submit'}
        disabled={loading || !html}
        aria-label={loading ? 'Scanning html loading' : 'Analyze html markup'}
      >
        ANALYZE MARKUP
      </button>
    </form>
  )
}

export { CtaHtmlInputRest }
