import React from 'react'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import Navbar from '../../../components/Admin/Navbar/AdminNavbar'
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin'

import CurrentEnquiryList from '../../../components/Admin/Enquiry/CurrentEnquiryList'


export default function CurrentBooking() {
  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <Navbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 bigTable hotel formstyle CurrentB">
          <div className='mt-4'>
            <h1 className='text-2xl text-black font-bold mb-3'>Current Booking Enquiries</h1>
          </div>          
          <CurrentEnquiryList/>
        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}
