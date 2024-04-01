import { React, useState } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Admin/Footer/Pagination';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function KankaiEvents() {
    const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h1 className='text-2xl text-black font-bold mb-3'>Kankai Temple Safari</h1>
                    <div className='mt-2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Import CSV file</label>
                        <input className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                    </div>
                </div>
                <div className='mt-50'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Filter by date</label>
                    <div className='flex'>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <button type="button" className="min-150 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2">
                            Filter
                        </button>
                    </div>
                    
                </div>
                <div className='mt-77'>
                    <Link to='/admin/add-kankai-event' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Create Event</Link>
                </div>
            </div>
            <table className='table bg-white border border-slate-300 mt-4'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Date</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Start Time</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>End Time</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Availability</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border border-slate-300 text-center'>19-09-2022</td>
                        <td className='border border-slate-300 text-center'>19-09-2022, <span className='font-bold'>08:30:00</span></td>
                        <td className='border border-slate-300 text-center'>30-09-2022, <span className='font-bold'>11:30:00</span></td>
                        <td className='border border-slate-300 text-center'>
                        <label htmlFor="default-toggle-1" className="inline-flex relative items-center w-full cursor-pointer">
                            <input type="checkbox" value="" id="default-toggle-1" className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable</span>
                        </label>
                        </td>
                        <td className='border border-slate-300 text-center'>
                        <Link to='/admin/edit-kankai-events' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <i className="fas fa-pencil"></i>
                        </Link>
                        <Link className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            <i className="fas fa-trash"></i>
                        </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='border border-slate-300 text-center'>19-09-2022</td>
                        <td className='border border-slate-300 text-center'>19-09-2022, <span className='font-bold'>08:30:00</span></td>
                        <td className='border border-slate-300 text-center'>30-09-2022, <span className='font-bold'>11:30:00</span></td>
                        <td className='border border-slate-300 text-center'>
                        <label htmlFor="default-toggle-2" className="inline-flex relative items-center w-full cursor-pointer">
                            <input type="checkbox" value="" id="default-toggle-2" className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable</span>
                        </label>
                        </td>
                        <td className='border border-slate-300 text-center'>
                        <Link to='/admin/edit-kankai-events' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <i className="fas fa-pencil"></i>
                        </Link>
                        <Link className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            <i className="fas fa-trash"></i>
                        </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='border border-slate-300 text-center'>19-09-2022</td>
                        <td className='border border-slate-300 text-center'>19-09-2022, <span className='font-bold'>08:30:00</span></td>
                        <td className='border border-slate-300 text-center'>30-09-2022, <span className='font-bold'>11:30:00</span></td>
                        <td className='border border-slate-300 text-center'>
                        <label htmlFor="default-toggle-3" className="inline-flex relative items-center w-full cursor-pointer">
                            <input type="checkbox" value="" id="default-toggle-3" className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable</span>
                        </label>
                        </td>
                        <td className='border border-slate-300 text-center'>
                        <Link to='/admin/edit-kankai-events' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <i className="fas fa-pencil"></i>
                        </Link>
                        <Link className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            <i className="fas fa-trash"></i>
                        </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination/>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}