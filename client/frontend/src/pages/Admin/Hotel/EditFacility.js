import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import axios from "axios";
import swal from 'sweetalert';


export default function EditFacility() {
  const navigate = useNavigate();
  const params = useParams();

  const [facility, setFacility] = useState('');
  const [status, setStatus] = useState(1);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      "facility": facility,
      "status": status,
    }

    try {
      const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/hotel/facilities/${params.id}`, data);

      navigate('/admin/room-facilities');
      swal(res.data.message, "success");


    } catch (err) {

      swal(err.response.data.error.message, "error");

    }
  }




  useEffect(() => {

    const getFacility = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/facilities/${params.id}`);

        setFacility(res.data.data.facility);
        setStatus(res.data.data.status);

      } catch (err) {

      }
    }

    getFacility();

  }, [params.id]);



  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <Navbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
          <div className='mt-4'>
            <h1 className='text-2xl text-black font-bold mb-3'>Edit Facility</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-900 ">Facility</label>
              <input type="text" id="facility" onChange={(e) => setFacility(e.target.value)} value={facility} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
            </div>
            <div className='mb-6'>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
              <select id="amenityStatus" value={status} onChange={(e) => { setStatus(e.target.value) }} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Please Select</option>
                <option value="1" >Available</option>
                <option value="0" >Not available</option>
              </select>
            </div>
            <div className='flex'>
              <button type="submit" className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
              <Link to='/admin/room-facilities' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
            </div>
          </form>
        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}
