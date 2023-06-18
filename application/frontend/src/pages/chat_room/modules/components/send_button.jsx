import React, { useState } from 'react'

function SendButton({ onClick, className }) {
  const [clicked, setClicked] = useState(false)
  const timeout = 150
  const handleClick = (func) => {
    if (!clicked) {
      func()
      setClicked(true)
      setTimeout(() => {
        setClicked(false)
      }, timeout)
    }
  }

  return (
    <div
      onClick={() => {
        handleClick(() => {
          onClick()
        })
      }}
      className={className}
    ></div>
  )
}

export default SendButton
