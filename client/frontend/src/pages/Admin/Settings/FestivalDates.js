import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import { useAlert } from "react-alert";
import axios from 'axios';
import swal from 'sweetalert';

export default function FestivalDates() {

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [list, setList] = useState([]);
    const alert = useAlert();

    const deleteDate = (e,id) =>{
      e.preventDefault();
      console.log('id:'+id);
      axios.get(`${process.env.REACT_APP_ADMIN_SERVER_URL}/festival/delete-festival/${id}`).then((res) => {
        if(res.data.data_status == 200) {  swal('Date Deleted','') };
        setTimeout(() => {
            window.location.href = '/admin/festival-dates';
        }, 1000);
    });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ADMIN_SERVER_URL}/festival/get-festivals`).then((res) => {
            setList(res.data.data);
        });
    }, []);

    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 hotel">
                    <div className="grid grid-cols-2 gap-4">
                        <div className='mt-4'>
                            <h1 className='text-2xl text-black font-bold mb-3'>Festival Dates</h1>
                        </div>
                        <div className='mt-4'>
                            <Link to='/admin/add-festival-dates' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add Date</Link>
                        </div>
                    </div>

                    <div className='table-responsive'>
                        <table className='table bg-white border border-slate-300 mt-4'>
                            <thead>
                                <tr>
                                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Sno.</th>
                                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Date Range</th>
                                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list && list.map((item, index) => (

                                    <tr key={index} >
                                        <td className='border border-slate-300 text-center'>{index + 1}</td>
                                        <td className='border border-slate-300 text-center'>{item.startDate} - {item.endDate}</td>

                                        <td  class="border border-slate-300 text-center"><a class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" href={`/admin/edit-festival-date/${item._id}`}><i class="fas fa-pencil"></i></a>
                                           <a onClick={e=>deleteDate(e,item._id)}  class="text-white bg-red-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><i class="fas fa-trash"></i></a></td>


                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}