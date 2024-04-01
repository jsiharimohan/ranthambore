import React from 'react'

export default function HotelName({ hotel }) {
  const detail = hotel.hotel;

  return (
    <div className="Corbett-Paradise">
      <h1>{detail?.name}</h1>
      <p>{detail?.description}</p>
    </div>
  )
}
