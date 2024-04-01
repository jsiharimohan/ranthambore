import React from 'react'
import { Link } from 'react-router-dom'

export default function Adventures() {
  return (
    <div className='adventures'>
        <div className='container'>
            <h2 className='common-title'>Services we offer in Ranthambore National Park</h2>
            <div className='row'>
                <div className='col-sm-3 col-6'>
                    <Link to='/online-ranthambore-safari-booking'>
                        <img src='../image/tiger-safari.jpeg' className='img-fluid' alt='Jeep Safari Booking'/>
                        <h5>Jeep Safari Booking</h5>
                    </Link>
                </div>
                <div className='col-sm-3 col-6'>
                    <Link to='/online-Chambal-moter-boat-safari-booking'>
                        <img src='../image/chambal-boat.jpeg' className='img-fluid' alt='Chambal Boat Safari Booking'/>
                        <h5>Chambal Boat Safari Booking</h5>
                    </Link>
                </div>
                <div className='col-sm-3 col-6'>
                    <Link to='/hotels'>
                        <img src='../image/resort.jpeg' className='img-fluid' alt='Hotel Booking'/>
                        <h5>Hotel Booking</h5>
                    </Link>
                </div>
                <div className='col-sm-3 col-6'>
                    <Link to='/ranthambore-packages'>
                        <img src='../image/sight.jpeg' className='img-fluid' alt='Sight Seeing'/>
                        <h5>Holiday Package Booking</h5>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
