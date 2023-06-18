import React, { useEffect, useState } from 'react'
import Background from '../../../components/background'
import ContainerCentre from '../../../components/container_centre'
import './create_chat.scss'
import CsrfTokenInput from '../../../components/csrf_token_input'
import ButtonBlue from '../../../components/button_blue'
import LogoutIcon from '../../../components/logout_icon'
import { CreateChatApi } from '../api/api'
import RoomList from './components/room_list'

function CreateChat() {
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    CreateChatApi.getRooms().then((responseRooms) => {
      setRooms(responseRooms)
    })
  }, [])

  return (
    <Background>
      <div className={'create_chat'}>
        <div className={'create_chat__header'}>
          <a href={'/logout'}>
            <LogoutIcon />
          </a>
        </div>
        <ContainerCentre title={'Выберите / создайте чат'}>
          <div className={'create_chat__container'}>
            <RoomList rooms={rooms} className={'create_chat__rooms'} />
            <form method={'post'}>
              <div className={'create_chat__form'}>
                <input
                  className={'create_chat__input'}
                  type="text"
                  name={'room_name'}
                  placeholder={'Введите название чата'}
                />
                <CsrfTokenInput />
                <div className={'create_chat__button'}>
                  <ButtonBlue>Создать</ButtonBlue>
                </div>
              </div>
            </form>
          </div>
        </ContainerCentre>
      </div>
    </Background>
  )
}

export default CreateChat
