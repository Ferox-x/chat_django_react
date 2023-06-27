import React from 'react'
import { getCSRFToken } from '../hooks'

function CsrfTokenInput(props) {
  const csrfToken = getCSRFToken()
  return (
    <>
      <input type={'hidden'} value={csrfToken} name={'csrfmiddlewaretoken'} />
    </>
  )
}

export default CsrfTokenInput
