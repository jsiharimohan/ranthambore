import React, { useEffect, useState } from 'react'
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import { useAlert } from "react-alert";
import axios from 'axios';

export default function ContactDetails() {

    const alert = useAlert();
    const [phone, setPhone] = useState();
    const [altphone, setAltPhone] = useState();
    const [altphone2, setAltPhone2] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    
    const data = {
        "phone" : phone,
        "altphone" : altphone,
        "altphone2" : altphone2,
        "email" : email,
        "address" : address
    }

    function getDetails() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/settings/contact`, {
            headers: {
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
          }).then(res => {
              setPhone(res.data.data.value.phone);
              setAltPhone(res.data.data.value.altphone);
              setAltPhone2(res.data.data.value.altphone2);
              setEmail(res.data.data.value.email);
              setAddress(res.data.data.value.address);
          });
    }

    const HandleSubmit = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/admin/settings/contact`,  data, {
            headers: {
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
          }).then(res => {
              if(res.status === 200) {
                  alert.success("Data is updated successfully");
                  setTimeout(() => {
                      window.location = `/admin/contact-details`;
                  }, 1000);
  
              } else {
                    alert.error("Please do not fill blank email,phone and address fields")
              }
          });
    }

    useEffect(() => {
        getDetails();
    },[])

  return (
    <div className="relative md:ml-64 bg-default-skin">
     <Sidebar/>
     <Navbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
            <div className='mt-4'>
                <h1 className='text-2xl text-black font-bold mb-3'>Contact details</h1>
            </div>
            <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Phone Number</label>
                    <input type="text" id="phone" value = {phone} placeholder='Phone Number' onChange = {(e) => setPhone(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Alt. Phone Number</label>
                    <input type="text" id="altPhone"value = {altphone}  placeholder='Alt. Phone Number' onChange = {(e) => setAltPhone(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Second Alt. Phone Number</label>
                    <input type="text" id="altPhone" value = {altphone2}  placeholder='Second Alt. Phone Number' onChange = {(e) => setAltPhone2(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Contact Email</label>
                    <input type="email" id="contactEmail" value = {email} placeholder='Contact Email' onChange = {(e) => setEmail(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div> 
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Contact Address</label>
                    <textarea id="address" value = {address} onChange = {(e) => setAddress(e.target.value)} rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address"></textarea>
                </div>  
                <div className='form-group'>
                    <button type="button" onClick = {HandleSubmit} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                </div>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}