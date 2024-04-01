import React , { useState , useEffect } from 'react';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import { useAlert } from "react-alert";
import axios from 'axios';

export default function Razorpay() {

  const [key , setKey] = useState();
  const [secret , setSecret] = useState();
  const alert = useAlert();

  const HandleSubmit = () => {

     const data = {
        "razorpay_key": key,
        "razorpay_secret_key" : secret
     }

        axios.post(`${process.env.REACT_APP_BASE_URL}/admin/settings/razorpay`, data , {
            headers: {
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
        }).then(res => {
            if(res.status === 200) {
                alert.success("Updated");
                setTimeout(() => {
                   window.location.href = '/admin/razorpay-settings';
                },1000);
            } else if(res.status === 201) {
                alert.error(res.data.error.message);
            }
        });
  }

    function GetDetails() {
      axios.get(`${process.env.REACT_APP_BASE_URL}/admin/settings/razorpay` , {
        headers: {
            'Authorization': `Bearer `+localStorage.getItem('accessToken')
        },
    }).then(res => {
        setKey(res.data.data.value.razorpay_key);
        setSecret(res.data.data.value.razorpay_secret_key);
    });
    }

    useEffect(() => {
      GetDetails();
    },[])


  return (
    <div className="relative md:ml-64 bg-default-skin">
     <Sidebar/>
     <Navbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
            <div className='mt-4'>
                <h1 className='text-2xl text-black font-bold mb-3'>Razorpay settings</h1>
                <img style={{maxWidth: "200px"}} src='../image/admin/razorpay.png' className='img-responsive mb-3' alt='Razorpay' />
            </div>
            <form>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Razorpay Key</label>
                    <input type="text" id="razorpayKey" onChange = {(e) => setKey(e.target.value)} value = {key} placeholder='Razorpay Key' className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Razorpay Secret Key</label>
                    <input type="text" id="razorpaySecretKey" onChange = {(e) => setSecret(e.target.value)} value= {secret} placeholder='Razorpay Secret Key' className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>  
                <div className='form-group'>
                    <button type="button" onClick = {HandleSubmit} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                </div>
            </form>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}
