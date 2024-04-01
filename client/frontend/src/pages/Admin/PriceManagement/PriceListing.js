import React from 'react'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import Listing from '../../../components/Admin/PriceManagement/Listing';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import { Link } from 'react-router-dom';

export default function PriceListing() {

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/> 
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 pt-12">
          <div className="grid grid-cols-2 gap-4">
            <div className='mt-50'>
              <h1 className='text-2xl text-black font-bold mb-3'>Safari Price </h1>
            </div>
            <div className='mt-50'>
              <Link to='/admin/add-safari-price' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add price</Link>
            </div>
          </div>
          <Listing />
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}
