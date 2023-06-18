import React from 'react'

function InputMessage({ message, setMessage, pressKeyFunc, className }) {
  return (
    <input
      value={message}
      placeholder={'Сообщение...'}
      className={className}
      onChange={(event) => {
        setMessage(event.target.value)
      }}
      onKeyDown={(event) => {
        pressKeyFunc(event)
      }}
    ></input>
  )
}

export default InputMessage
