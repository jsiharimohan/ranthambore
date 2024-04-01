import React from 'react'
import { Link } from 'react-router-dom'

export default function MainBanner() {
  return (
    <section id="mainbanner" style={{backgroundImage: "url(../image/banner.jpeg)"}}>
        <div className="container">
            <div className="row">
            <div className="col-sm-12 col-xs-12">
                <div className="bannercaption">
                <h1>Ranthambore National Park</h1>
                <p>Book your Jeep &amp; Canter Safari online</p>
                <Link to='/online-ranthambore-safari-booking' className="btn btn-dark">Book Now</Link>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}
