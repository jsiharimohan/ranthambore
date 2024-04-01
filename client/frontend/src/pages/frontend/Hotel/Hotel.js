import React from 'react'
import HotelBanner from '../../../components/frontend/Hotel/HotelBanner'
import HotelList from '../../../components/frontend/Hotel/HotelList'
import EnquiryForm from '../../../components/frontend/Common/EnquiryForm'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function Hotel() {
  return (
    <>
    <Helmet>
        <title>Hotels in Ranthambore National Park</title>
        <meta name="description" content="Discover the best hotels and accommodations for your trip to Ranthambore National Park through our online booking platform. Our website offers a variety of options, including luxury resorts, budget-friendly lodges, and eco-friendly stays. Whether you're planning a family vacation or a solo adventure, we have the perfect accommodation for you. Browse through our listings, check availability and book your stay today for an unforgettable experience in the wild." />
    </Helmet>
    <div className='hotel-listing-page'>
      <HotelBanner />
      <div className='container sectionFrame'>
        <h2>Hotels Available</h2>
        {/* <p className='book-special'>Book your hotel &amp; enjoy your holidays with distinctive experience</p> */}
        <p className='book-special'>If you are planning a visit to the Ranthambore National Park in India, then the website <Link to="http://www.ranthamboretigerreserve.in" target="_blank">http://www.ranthamboretigerreserve.in</Link> can be very beneficial for you. This website provides a hassle-free way to book your stay in the luxurious Ranthambore Hotels located near the park. With just a few clicks, you can easily find and book the hotel that suits your preferences and budget. Simply use the keywords Ranthambore Hotels and Ranthambore National Park to search and explore the various options available on the website.</p>
        <div className='row'>
          <div className='col-sm-9 width70'>
            <HotelList />
          </div>
          <div className='col-sm-3 width30'>
            <EnquiryForm hotel_id='' type="hotel" />
          </div>
        </div>

      </div>
    </div>
    </>
  )
}
