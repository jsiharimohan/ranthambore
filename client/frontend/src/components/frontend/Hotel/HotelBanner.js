import React from 'react'

export default function HotelBanner() {
  return (
    <div style={{backgroundImage: "url('../image/hotel-banner2.jpeg')", backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat"}}>
        <div className='container'>
            <div className='bannerCaption'>
                <h1>Hotels in Ranthambore National Park</h1>
                <p>Special Discount | Luxury Rooms| Lunch &amp; Breakfast</p>
            </div>
        </div>
    </div>
  )
}
