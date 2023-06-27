import React from 'react'
import Background from '../../../components/background'
import './logout.scss'

function Logout() {
  return (
    <Background>
      <div className={'logout'}>
        <div className={'logout__message'}>Вы успешно вышли</div>
        <a className={'logout__link'} href="/login">
          Войти
        </a>
      </div>
    </Background>
  )
}

export default Logout
