import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import axios from "axios";
import swal from 'sweetalert';

export default function PackageItineraries() {
  const [itineraries, setItineraries] = useState('');



  const getItineraries = async () => {

    try {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/iternaries/`);
      console.log('result', result);

      setItineraries(result.data.data);
      //setLoading(false);

    } catch (err) {
      swal(err, "error");


    }
  };


  useEffect(() => {
    getItineraries();

  }, []);




  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/package/iternaries/${id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      swal("Exclusion data is deleted successfully");
      setTimeout(() => {
        window.location = '/admin/package-itineraries';
      }, 1000);
    })
  }

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <AdminNavbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 hotel">
          <div className="grid grid-cols-2 gap-4">
            <div className='mt-4'>
              <h1 className='text-2xl text-black font-bold mb-3'>Tour Itineraries</h1>
            </div>
            <div className='mt-4'>
              <Link to='/admin/add-package-itinerary' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add</Link>
            </div>
          </div>
          <div className='table-responsive'>
          <table className='table bg-white border border-slate-300 mt-4'>
            <thead>
              <tr>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                <th className='border border-slate-300 text-left bg-hotel-maroon text-white'>Title</th>
                <th className='border border-slate-300 text-left bg-hotel-maroon text-white'>Availability</th>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
              </tr>
            </thead>
            <tbody>{itineraries && itineraries.map((item, index) => (
              <tr key={index}>
                <td className='border border-slate-300 text-center'>{index + 1}</td>
                <td className='border border-slate-300 text-left'>{item.title}</td>
                <td className='border border-slate-300 text-center'>
                  <label htmlFor={`default-toggle-${index}`} className="inline-flex relative items-center w-full cursor-pointer">
                    <input type="checkbox" value={item.status} defaultChecked={item.status} mid={`default-toggle-${index}`} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{item.status === '1' ? 'Enabled' : 'Disabled'}</span>
                  </label>
                </td>
                <td className='border border-slate-300 text-left'>
                  <Link to={`/admin/edit-package-itinerary/${item._id}`} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <i className="fas fa-pencil"></i>
                  </Link>
                  <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => handleDelete(item._id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>))}</tbody></table></div>
        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}
