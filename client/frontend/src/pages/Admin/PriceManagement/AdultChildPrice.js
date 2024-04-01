import React from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import { Link } from 'react-router-dom';

export default function AdultChildPrice() {
  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <h1 className='text-2xl text-black font-bold mb-3'>Adult and Child Price</h1>
                </div>
                <div>
                    <Link to='/admin/add-adult-child-price' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add slot</Link>
                </div>
            </div>
            <table className='table bg-white border border-slate-300 mt-4'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>#</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>No. of Adults</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>No. of Childs</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Price</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border border-slate-300 text-center'>1</td>
                        <td className='border border-slate-300 text-center'>1 Adult</td>
                        <td className='border border-slate-300 text-center'>1 Child</td>
                        <td className='border border-slate-300 text-center'>4200</td>
                        <td className='border border-slate-300 text-center'>
                        <Link to='/admin/edit-adult-child-price' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <i className="fas fa-pencil"></i>
                        </Link>
                        <Link className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            <i className="fas fa-trash"></i>
                        </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='border border-slate-300 text-center'>2</td>
                        <td className='border border-slate-300 text-center'>2 Adult</td>
                        <td className='border border-slate-300 text-center'>1 Child</td>
                        <td className='border border-slate-300 text-center'>4400</td>
                        <td className='border border-slate-300 text-center'>
                        <Link to='/admin/edit-adult-child-price' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <i className="fas fa-pencil"></i>
                        </Link>
                        <Link className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            <i className="fas fa-trash"></i>
                        </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='border border-slate-300 text-center'>3</td>
                        <td className='border border-slate-300 text-center'>4 Adult</td>
                        <td className='border border-slate-300 text-center'>2 Child</td>
                        <td className='border border-slate-300 text-center'>6200</td>
                        <td className='border border-slate-300 text-center'>
                        <Link to='/admin/edit-adult-child-price' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <i className="fas fa-pencil"></i>
                        </Link>
                        <Link className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            <i className="fas fa-trash"></i>
                        </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}