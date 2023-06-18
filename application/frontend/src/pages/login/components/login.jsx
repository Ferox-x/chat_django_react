import React from 'react'
import './login.scss'
import Background from '../../../components/background'
import ButtonBlue from '../../../components/button_blue'
import CsrfTokenInput from '../../../components/csrf_token_input'
import ContainerCentre from '../../../components/container_centre'

function Login() {
  return (
    <Background>
      <div className={'login'}>
        <ContainerCentre title={'Авторизация'}>
          <form method={'post'} className={'login__form'}>
            <input
              type="text"
              className={'login__input'}
              placeholder={'Логин'}
              name={'username'}
            />
            <input
              type="password"
              className={'login__input'}
              placeholder={'Пароль'}
              name={'password'}
            />
            <CsrfTokenInput />
            <div className={'login__button'}>
              <ButtonBlue>Войти</ButtonBlue>
            </div>
          </form>
        </ContainerCentre>
      </div>
    </Background>
  )
}

export default Login
