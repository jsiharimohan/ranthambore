import { React, useState } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from '../../../components/Admin/Navbar/AdminNavbar';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import * as moment from 'moment';
import { useAlert } from "react-alert";
export default function CreateChambalDates() {
 
  const [startDate, setStartDate] = useState(new Date());
  const alert = useAlert();

  const HandleSaveData = (e) => {
    e.preventDefault();

    const data = {
       "date": moment(startDate).format("YYYY-MM-DD")
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}/chambal/disable-dates` , data , {
        headers: {
            'Authorization': `Bearer `+localStorage.getItem('accessToken')
        },
    }).then(res => {
        if(res.status === 200) {
            alert.success("Data is created successfully");
            setTimeout(() => {
                window.location = '/admin/chambal-dates';
            }, 1000);

        } else {
            alert.error("Please fill the date field");
        }
    });
  }

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/> 
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
        <h1 className='text-2xl text-black font-bold mb-3'>Add event date</h1>
        <form className='mt-4 shadow-md p-4 rounded bg-white'>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Start Date</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} minDate={moment().toDate()}/>
        </div>
        <div className='flex'>
          <button ype="button"  onClick = {HandleSaveData} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
          <Link to='/admin/chambal-dates' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
        </div>
      </form>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}