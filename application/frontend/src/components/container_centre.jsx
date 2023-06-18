import React from 'react'
import './styles/container_centre.scss'

function ContainerCentre({ title, children }) {
  return (
    <div className={'container_centre'}>
      <div className={'container_centre__title'}>{title}</div>
      {children}
    </div>
  )
}

export default ContainerCentre
