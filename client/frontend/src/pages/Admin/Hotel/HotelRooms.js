import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';

export default function HotelRooms() {

    const params = useParams();
    const [details, setDetails] = useState([]);

    function GetDetails() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/${params.id}/rooms`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('user')
            },
        }).then(result => {
            setDetails(result.data.data);
        })
    }


    useEffect(() => {
        GetDetails(params.id);
    }, [])

    const HandleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/hotel/hotel-rooms/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('tokenkey')
            },
        }).then(result => {
            swal("Data is deleted", "success");
            setTimeout(() => {
                window.location = `/admin/hotel-rooms/${params.id}`;
            }, 1000);
        })
    }

    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
                    <div className="grid grid-cols-2 gap-4">
                        <div className='mt-4'>
                            <h1 className='text-2xl text-black font-bold mb-3'>Hotel Rooms</h1>
                        </div>
                        <div className='mt-4'>
                            <Link to={`/admin/add-room/${params.id}`} type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add Room</Link>
                        </div>
                    </div>
                    <div className='table-responsive'>
                    <table className='table bg-white border border-slate-300 mt-4'>
                        <thead>
                            <tr>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Room</th>
                                <th className='border border-slate-300 text-left bg-hotel-maroon text-white'>Availability</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details && details.map((item, index) => (
                                <tr key={index}>
                                    <td className='border border-slate-300 text-center'>{index + 1}</td>
                                    <td className='border border-slate-300 text-center'>{item.room}</td>
                                    <td className='border border-slate-300 text-center'>
                                        <label htmlFor="default-toggle-1" className="inline-flex relative w-full cursor-pointer">
                                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{item.status === 1 ? 'Available' : 'Not Available'}</span>
                                        </label>
                                    </td>
                                    <td className='border border-slate-300 text-center'>
                                        <Link to={`/admin/edit-room/${item._id}`} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                            <i className="fas fa-pencil"></i>
                                        </Link>
                                        <Link onClick={() => HandleDelete(item._id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                            <i className="fas fa-trash"></i>
                                        </Link>
                                    </td>
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
