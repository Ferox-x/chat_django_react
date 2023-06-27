import React, { useEffect, useRef, useState } from 'react'
import Background from '../../../components/background'
import LogoutIcon from '../../../components/logout_icon'
import './room_chat.scss'
import SendButton from './components/send_button'
import MessagesList from './components/messages_list'
import InputMessage from './components/input_message'
import Loader from '../../../components/loader'
import { RoomChatApi } from './api/api'

function RoomChat() {
  const [loader, setLoader] = useState(false)
  const [roomName, setRoomName] = useState('******')
  const [users, setUsers] = useState('1 участник')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [userID, setUserID] = useState('')
  const [wsMessage, setWSMessage] = useState({
    action: '',
    data: {},
  })
  const location = window.location
  const roomUUID = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1,
  )
  useEffect(() => {
    RoomChatApi.getMe().then((responseID) => {
      setUserID(responseID)
    })
    RoomChatApi.getMessages(roomUUID).then((responseMessages) => {
      setMessages(responseMessages)
      setLoader(true)
    })
  }, [])

  useEffect(() => {
    const actionReceiveMessage = (data) => {
      const messageTime = new Date(data.datetime).toISOString()
      const newMessage = {
        time: messageTime,
        text: data.message,
        user_id: data.user_id,
        delivered: data.delivered,
        username: data.username,
      }

      if (data.user_id === userID) {
        const newMessages = messages.filter((message) => {
          return message.time !== messageTime
        })
        setMessages([...newMessages, newMessage])
      } else {
        setMessages([...messages, newMessage])
      }
    }
    const actionConnect = (data) => {
      setRoomName(data.room_name)
    }

    const actionUpdateUsers = (data) => {
      setUsers(data.users)
    }

    switch (wsMessage.action) {
      case 'receive_message':
        actionReceiveMessage(wsMessage.data)
        break
      case 'connect':
        actionConnect(wsMessage.data)
        break
      case 'update_users':
        actionUpdateUsers(wsMessage.data)
    }
  }, [userID, wsMessage])

  const websocket = useRef(null)
  if (!websocket.current) {
    const ws = new WebSocket(
      'ws://' + location.host + '/ws/chat/' + roomUUID + '/',
    )

    ws.onopen = () => {
      console.log('Соединение WebSocket установлено')
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setWSMessage(message)
      console.log('Получено сообщение:', message)
    }

    ws.onclose = () => {
      console.log('Соединение WebSocket закрыто')
    }
    websocket.current = ws
  }

  const addNewMessage = (text, time) => {
    const message = {
      time: time,
      text: text,
      user_id: userID,
      delivered: false,
    }
    setMessages([...messages, message])
  }

  const sendMessage = (message) => {
    const cleanedMessage = message.trim()
    if (cleanedMessage) {
      const currentTime = new Date(Date.now()).toISOString()
      addNewMessage(message, currentTime)
      websocket.current.send(
        JSON.stringify({
          action: 'send_message',
          data: {
            message: message,
            time: currentTime,
          },
        }),
      )
    }
    setMessage('')
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage(message)
    }
  }

  return (
    <Background>
      <div className={'room_chat'}>
        <div className={'room_chat__header'}>
          <div className={'room_chat__invis_block'}></div>
          <div className={'room_chat__info'}>
            <div className={'room_chat__room_name'}>{roomName}</div>
            <div className={'room_chat__members'}>{users}</div>
          </div>
          <a href="/chat">
            <LogoutIcon />
          </a>
        </div>
        {!loader ? (
          <Loader />
        ) : (
          <MessagesList
            className={'room_chat__messages'}
            userID={userID}
            messages={messages}
          />
        )}

        <div className={'room_chat__text_input'}>
          <InputMessage
            message={message}
            setMessage={setMessage}
            pressKeyFunc={handleKeyPress}
            className={'room_chat__input'}
          />
          <SendButton
            onClick={() => sendMessage(message)}
            className={'room_chat__send'}
          />
        </div>
      </div>
    </Background>
  )
}

export default RoomChat
