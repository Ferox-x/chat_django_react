import React from 'react'
import './styles/loader.scss'

function Loader() {
  return (
    <div className={'loader'}>
      <div className="loader__preloader"></div>
      <span className="loader__text">Пожалуйста, подождите...</span>
    </div>
  )
}

export default Loader
