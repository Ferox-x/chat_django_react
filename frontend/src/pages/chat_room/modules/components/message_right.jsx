import React from 'react'
import './styles/messages.scss'
import { getFormattedDate, getFormattedTime } from '../../../../hooks'

function MessageRight({ text, time, delivered }) {
  const formattedTime = getFormattedTime(time)
  const formattedDate = getFormattedDate(time)

  let deliveredClassName = ''

  if (delivered) {
    deliveredClassName = 'message__check_double_tick'
  } else {
    deliveredClassName = 'message__check_one_tick'
  }

  return (
    <div className={'message message_right'}>
      <div className={'message__container message__container_right'}>
        <div className={'message_date'}>{formattedDate}</div>
        <div className={'message__message message__message_right'}>
          <div className={'message__text'}>{text}</div>
          <div className={'message__additional_info'}>
            <div className={'message__time'}>{formattedTime}</div>
            <div className={'message__check ' + deliveredClassName}></div>
          </div>
        </div>
        <div className={'message__corner message__corner_right'}></div>
      </div>
    </div>
  )
}

export default MessageRight
