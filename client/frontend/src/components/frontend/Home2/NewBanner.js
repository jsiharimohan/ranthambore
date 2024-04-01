import React from 'react'
import { Link } from 'react-router-dom'


export default function NewBanner() {
  return (
    <div className='Nabnner'>
      <div className='nCaption'>
        <div className='container'>
          <h1>Ranthambore National Park</h1>
          <p>Book your Jeep and Canter Safari Online</p>
          <div className='text-center'>
              <Link to='/online-ranthambore-safari-booking'>
                <img src='../image/bookbtn.png' className='img-fluid' alt='Book Now' style={{margin: "0 auto"}} />
              </Link>
          </div>
        </div>
      </div>
      <img src='../image/tiger.png' className='img-fluid' alt='Banner' style={{width: "100%"}}/>
    </div>
  )
}
