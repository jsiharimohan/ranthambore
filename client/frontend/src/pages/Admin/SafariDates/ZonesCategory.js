import React  , { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import Navbar from '../../../components/Admin/Navbar/AdminNavbar'
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin'
import axios from 'axios'

export default function ZoneCategory() {

  const [details , setDetails] = useState([]);
  
  useEffect( () =>  {
    axios.get(`${process.env.REACT_APP_BASE_URL}/safari/zone-categories`, {
        headers: {
        'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+localStorage.getItem('accessToken')
        },
        }).then(result => { 
            if(result.data.data.length > 0) {
                setDetails(result.data.data);
            } else {
                setDetails([]);
            }
         })  
    },[]);

  return (
    <div className="relative md:ml-64 bg-default-skin">
     <Sidebar/>
      <Navbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 bigTable">
            <div className='mt-4'>
                <h1 className='text-2xl text-black font-bold mb-3'>Zone Categories</h1>
            </div>
            <table className='table bg-white border border-slate-300 mt-4'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Zone Name</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Availability</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                    </tr>
                </thead>
                 <tbody>
                    { details && details.map((item,index) => (
                         <tr>
                            <td className='border border-slate-300 text-center'>{index+1}</td>
                            <td className='border border-slate-300 text-center'>{item.name}</td>
                            <td className='border border-slate-300 text-center'>{item.availability == 1 ? 'Available' : 'NA'}</td>
                            <td class="border border-slate-300 text-center">
                                <Link class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to={`/admin/edit-zone/${item._id}`} >
                                    <i class="fas fa-pencil"></i>
                                </Link>
                                {/* <a class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" href="/admin/ranthambore-dates"><i class="fas fa-trash"></i></a> */}
                            </td>
                         </tr>
                    )) }
                 </tbody>
            </table>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}