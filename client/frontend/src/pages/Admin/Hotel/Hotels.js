import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
//import Pagination from '../../../components/Admin/Footer/Pagination';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import HotelListing from '../../../components/Admin/Hotel/HotelListing';

export default function Hotels() {
  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <AdminNavbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 hotel">
          <div className="grid grid-cols-2 gap-4">
            <div className='mt-4'>
              <h1 className='text-2xl text-black font-bold mb-3'>Hotels</h1>
            </div>
            <div className='mt-4'>
              <Link to='/admin/add-hotel' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add Hotel</Link>
            </div>
          </div>
          
          <HotelListing />
          
        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}
