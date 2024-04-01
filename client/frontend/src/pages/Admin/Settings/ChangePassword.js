import React , { useState } from 'react';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import { useAlert } from "react-alert";
import axios from 'axios';

export default function ChangePassword() {

  const [pwd , setPwd] = useState();
  const [pwd_conf , setPwdConf] = useState();
  const [pwd_curr_conf , setPwdCurrConf] = useState();
  const alert = useAlert();

  const HandleSubmit = () => {

     const data = {
        "password": pwd,
        "password_confirmation" : pwd_conf,
        "current_password" : pwd_curr_conf
     }

       axios.post(`${process.env.REACT_APP_BASE_URL}/admin/auth/update-password`, data, {
            headers: {
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
        }).then(res => {
            console.log(res);
            if(res.status === 200) {
                alert.success("Updated");
                setTimeout(() => {
                    window.location.href = '/admin/change-password';
                },1000);
            } else if(res.status === 201) {
                alert.error(res.data.error.message);
            } 
        });
  }

  return (
    <div className="relative md:ml-64 bg-default-skin">
     <Sidebar/>
     <Navbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
            <div className='mt-4'>
                <h1 className='text-2xl text-black font-bold mb-3'>Change Password</h1>
            </div>
            <form>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Current password*</label>
                    <input type="text" id="currentPass"  onChange= {(e) => setPwdCurrConf(e.target.value)} placeholder='Enter current password' className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">New password*</label>
                    <input type="text" id="newPass" onChange= {(e) => setPwd(e.target.value)} placeholder='Enter new password' className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">New password confirmation*</label>
                    <input type="text" id="confirmNewPass"  onChange= {(e) => setPwdConf(e.target.value)} placeholder='Confirm new password' className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div> 
                <div className='form-group mt-2'>
                    <button type="button"  onClick={HandleSubmit} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                </div>
            </form>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}