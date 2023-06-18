import React from 'react'

function Room({ roomName, roomID }) {
  return (
    <a className={'create_chat__room_link'} href={'/chat/' + roomID}>
      <div className={'create_chat__room'}>
        {roomName}
        <div className={'create_chat__connect_room'}></div>
      </div>
    </a>
  )
}

export default Room
