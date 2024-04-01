import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin'
import Navbar from '../../../components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import axios from "axios";
import swal from 'sweetalert';

export default function EditPackageCancellationPolicy() {
    const navigate = useNavigate();
    const params = useParams();

    const [policies, setPolicies] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            "policy": policies,
        }

        try {
            const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/package/cancellation-policies/${params.id}`, data);

            navigate('/admin/package-cancellation-policy');
            swal(res.data.message, "success");


        } catch (err) {

            swal(err.response.data.error.message, "error");

        }
    }




    useEffect(() => {

        const getFeature = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/cancellation-policies/${params.id}`);
                setPolicies(res.data.data.policy);

            } catch (err) {

            }
        }

        getFeature();

    }, [params.id]);



    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
                    <div className='mt-4'>
                        <h1 className='text-2xl text-black font-bold mb-3'>Edit Cancellation Policy</h1>
                    </div>
                    <div className="mb-3">
                        <textarea rows="3" onChange={(e) => setPolicies(e.target.value)} value={policies} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                    </div>
                    <div className='flex'>
                        <button type="button" onClick={handleSubmit} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                        <Link to='/admin/package-cancellation-policy' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                    </div>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
