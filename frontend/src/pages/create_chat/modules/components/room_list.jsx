import React from 'react'
import Room from './room'

function RoomList({ rooms, className }) {
  return (
    <div className={className}>
      {rooms.length === 0 ? (
        <></>
      ) : (
        rooms.map((room) => {
          return (
            <Room roomID={room.id} roomName={room.room_name} key={room.id} />
          )
        })
      )}
    </div>
  )
}

export default RoomList
