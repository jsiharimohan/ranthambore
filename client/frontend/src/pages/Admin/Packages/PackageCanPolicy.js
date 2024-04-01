import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import PackageAssets from '../../../components/Admin/Package/PackageAssets';
import axios from "axios";
import swal from 'sweetalert';

export default function PackageCanPolicy() {

  const [policies, setPolicies] = useState('');



  const getCancellationPolicies = async () => {

    try {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/cancellation-policies/`);
      console.log('result', result);

      setPolicies(result.data.data);
      //setLoading(false);

    } catch (err) {
      swal(err, "error");


    }
  };


  useEffect(() => {
    getCancellationPolicies();

  }, []);




  const deleteCancellationPolicy = (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/package/cancellation-policies/${id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      swal("Cancellation Policy data is deleted successfully");
      setTimeout(() => {
        window.location = '/admin/package-cancellation-policy';
      }, 1000);
    })
  }

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <AdminNavbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
          <div className="grid grid-cols-2 gap-4">
            <div className='mt-4'>
              <h1 className='text-2xl text-black font-bold mb-3'>Cancellation Policy</h1>
            </div>
            <div className='mt-4'>
              <Link to='/admin/add-package-cancellation-policy' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add</Link>
            </div>
          </div>
          <PackageAssets data={policies} handleDelete={deleteCancellationPolicy} type='policy' editType='cancellation-' />
        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}
