import React, { useEffect, useRef, useState } from 'react'
import MessageRight from './message_right'
import MessageLeft from './message_left'
import { getFormattedDate } from '../../../../hooks'

function MessagesList({ messages, className, userID }) {
  const chatRef = useRef(null)
  const [visibleDate, setVisibleDate] = useState(getFormattedDate(Date.now()))

  useEffect(() => {
    const handleScroll = () => {
      const chatElement = chatRef.current

      const messages = chatElement.getElementsByClassName('message')
      const visibleMessages = []

      for (let i = 0; i < messages.length; i++) {
        const message = messages[i]
        const rect = message.getBoundingClientRect()

        if (rect.top >= 0 && rect.bottom <= chatElement.clientHeight) {
          visibleMessages.push(message)
        }
      }

      if (visibleMessages.length > 0) {
        const dateElement =
          visibleMessages[0].getElementsByClassName('message_date')[0]
        setVisibleDate(dateElement.textContent)
      }
    }

    const chatElement = chatRef.current
    chatElement.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      chatElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      <div className={'room_chat__date'}>{visibleDate}</div>
      <div className={className} ref={chatRef}>
        {messages.map((message) => {
          if (message.user_id === userID) {
            return (
              <MessageRight
                key={message.time}
                text={message.text}
                time={message.time}
                date={message.time}
                delivered={message.delivered}
              />
            )
          } else {
            return (
              <MessageLeft
                key={message.time}
                text={message.text}
                time={message.time}
                date={message.time}
                username={message.username}
              />
            )
          }
        })}
      </div>
    </>
  )
}

export default MessagesList
