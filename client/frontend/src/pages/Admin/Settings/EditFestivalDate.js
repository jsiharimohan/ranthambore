import React, { useEffect, useState } from 'react';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import { useAlert } from "react-alert";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditFestivalDates() {

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const params = useParams();
    const alert = useAlert();

    const HandleSubmit = () => {

        const data = {
            "startDate": startDate,
            "endDate": endDate,
        }

        axios.post(`${process.env.REACT_APP_ADMIN_SERVER_URL}/festival/update-festival/${params.id}`, data, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {

            if (res.status === 200) {
                alert.success("Updated");
                setTimeout(() => {
                    window.location.href = '/admin/festival-dates';
                }, 1000);
            } else if (res.status === 201) {
                alert.error(res.data.error.message);
            }
        });
    }

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_ADMIN_SERVER_URL}/festival/get-festival/${params.id}`).then((res) => {
            setStartDate(res.data.data[0].startDate);
            setEndDate(res.data.data[0].endDate);
        })
    }, []);

    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
                    <div className='mt-4'>
                        <h1 className='text-2xl text-black font-bold mb-3'>Add Festival Dates</h1>
                    </div>
                    <form>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Start Date</label>
                            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">End Date</label>
                            <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>

                        <div className='form-group mt-2'>
                            <button type="button" onClick={HandleSubmit} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}