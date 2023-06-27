import React from 'react'
import './styles/background.scss'

function Background({ children }) {
  return <div className={'blur_background'}>{children}</div>
}

export default Background
