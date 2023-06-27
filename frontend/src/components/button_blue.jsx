import React from 'react'
import './styles/button_blue.scss'

function ButtonBlue({ children }) {
  return <input type={'submit'} className={'button'} value={children} />
}

export default ButtonBlue
