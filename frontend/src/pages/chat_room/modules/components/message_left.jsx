import React from 'react'
import './styles/messages.scss'
import { getFormattedDate, getFormattedTime } from '../../../../hooks'

function MessageLeft({ text, time, username }) {
  const formattedTime = getFormattedTime(time)
  const formattedDate = getFormattedDate(time)
  return (
    <div className={'message message_left'}>
      <div className={'message__container message__container_left'}>
        <div className={'message_date'}>{formattedDate}</div>
        <div className={'message__corner message__corner_left'}></div>
        <div className={'message__message message__message_left'}>
          <div className={'message__username'}>{username}</div>
          <div className={'message__data'}>
            <div className={'message__text'}>{text}</div>
            <div className={'message__additional_info'}>
              <div className={'message__time message__time_left'}>
                {formattedTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageLeft
