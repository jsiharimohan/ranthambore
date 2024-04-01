import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import axios from "axios";
import swal from 'sweetalert';


export default function EditAmenity() {
    const navigate = useNavigate();
    const params = useParams();

    const [amenity, setAmenity] = useState('');
    const [status, setStatus] = useState(1);
    const [image, setImage] = useState('');
    const [src, setSrc] = useState('');
    const HSURL = process.env.REACT_APP_HOTEL_SERVER_URL;




    const handleInputImageChange = (event) => {
        setImage(event.target.files[0]);

        if (event.target.files[0]) {
            setSrc(URL.createObjectURL(event.target.files[0]));
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData()
        data.append('amenity', amenity);
        data.append('image', image);
        data.append('status', status);

        try {
            const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/hotel/amenities/${params.id}`, data);

            navigate('/admin/amenities');

            swal(res.data.message, "success").then(() => {

            });


        } catch (err) {

            swal(err.response.data.error.message, "error");

        }
    }




    useEffect(() => {

        const getAmenity = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/amenities/${params.id}`);
                setAmenity(res.data.data.amenity);
                setStatus(res.data.data.status);
                setSrc(res.data.data.image);
                setImage(res.data.data.image);


            } catch (err) {

            }
        }

        getAmenity();

    }, [params.id]);



    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
                    <div className='mt-4'>
                        <h1 className='text-2xl text-black font-bold mb-3'>Edit Amenity</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">Amenity</label>
                            <input type="text" id="amenity" onChange={(e) => setAmenity(e.target.value)} value={amenity} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                        </div>
                        <div className='mb-6'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Availability</label>
                            <select id="amenityStatus" value={status} onChange={(e) => { setStatus(e.target.value) }} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Please Select</option>
                                <option value="1" >Available</option>
                                <option value="0" >Not available</option>
                            </select>
                        </div>
                        <div className='mb-6'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 " htmlFor="file_input">Upload Amenity Logo</label>
                            <input className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={handleInputImageChange} />

                            {((typeof src === 'string') && src.indexOf('blob') === -1)
                                ? <img src={(`${HSURL}/${src}`)} alt={amenity} className="img-responsive mt-2" width="85" height="85" />
                                : <img src={src} alt={amenity} className="img-responsive mt-2" width="85" height="85" />}

                        </div>
                        <div className='flex'>
                            <button type="submit" className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                            <Link to='/admin/amenities' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>
                    </form>
                </div>
            </div >
            <FooterAdmin />
        </div >
    )
}
