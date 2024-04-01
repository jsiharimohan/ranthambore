import { React, useState } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from '../../../components/Admin/Navbar/AdminNavbar';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditKankaiEvents() {
  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/> 
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
        <h1 className='text-2xl text-black font-bold mb-3'>Edit Kankai event date</h1>
        <form className='mt-4 shadow-md p-4 rounded bg-white'>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Start Date</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">End Date</label>
          <DatePicker selected={EndDate} onChange={(date) => setEndDate(date)} />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Availability</label>
          <select id="availability" className="max193 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Please select</option>
            <option value="Available">Available</option>
            <option value="Not available">Not available</option>
        </select>
        </div>
        <div className='flex'>
          <button type="submit" className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
          <Link to='/admin/kankai-events' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
        </div>
      </form>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}