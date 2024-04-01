import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import PackageAssets from '../../../components/Admin/Package/PackageAssets';
import axios from "axios";
import swal from 'sweetalert';

export default function PackageExclusion() {
  const [exclusions, setExclusions] = useState('');



  const getExclusions = async () => {

    try {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/exclusions/`);
      console.log('result', result);

      setExclusions(result.data.data);
      //setLoading(false);

    } catch (err) {
      swal(err, "error");


    }
  };


  useEffect(() => {
    getExclusions();

  }, []);




  const deleteExclusion = (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/package/exclusions/${id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      swal("Exclusion data is deleted successfully");
      setTimeout(() => {
        window.location = '/admin/package-exclusion';
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
              <h1 className='text-2xl text-black font-bold mb-3'>Exclusions</h1>
            </div>
            <div className='mt-4'>
              <Link to='/admin/add-package-exclusion' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add</Link>
            </div>
          </div>
          <PackageAssets data={exclusions} handleDelete={deleteExclusion} type='exclusion' />

        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}
