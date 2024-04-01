import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import AmenityStatus from '../../../components/Admin/Hotel/AmenityStatus';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import ReactPaginate from "react-paginate";



export default function HotelAmenities() {
    const [amenities, setAmenities] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [mHotelAmenities, setMHotelAmenities] = useState([]);
    const HSURL = process.env.REACT_APP_HOTEL_SERVER_URL;


    const params = useParams();
    let hotel_id = '';

    if (params.id) {
        hotel_id = params.id;
    }




    useEffect(() => {




        const getMHotelAmenities = async () => {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/${hotel_id}/amenities`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + localStorage.getItem('user')
                },
            });


            if (result.data.data.length) {

                //const fa = result.data.data.map(item => ({ value: item.amenity._id, label: item.amenity.amenity }));

                setMHotelAmenities(result.data.data);
            }
        }
        let limit = 10;

        const getAmenities = async () => {

            setLoading(true);

            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/amenities/?page=1&size=${limit}`);

                setAmenities(result.data.data);
                setpageCount(Math.ceil(result.data.total / result.data.perPage));
                //setPage(result.data.page);
                setLoading(false);

            } catch (err) {

                setLoading(false);
            }

        };

        if (hotel_id) {
            getMHotelAmenities();

        }

        getAmenities();

    }, []);


    const handlePageClick = async (data) => {
        setLoading(true);

        try {

            let currentPage = data.selected + 1;
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/amenities/?page=${currentPage}`);
            setAmenities(result.data.data);

            setpageCount(Math.ceil(result.data.total / result.data.perPage));
            // setPage(result.data.page);
            setLoading(false);

        } catch (err) {

            setLoading(false);

        }
    };

    const handleDelete = (amenity_id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/hotel/amenities/${amenity_id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            alert.success("Amenity is deleted");
            setTimeout(() => {
                window.location = '/admin/amenities';
            }, 1000);
        })
    }

    console.log("hotelAmenities", mHotelAmenities)


    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 amenities">
                    <div className="grid grid-cols-2 gap-4">
                        <div className='mt-4'>
                            <h1 className='text-2xl text-black font-bold mb-3'> {hotel_id ? 'Hotel Amenities' : 'Amenities'} </h1>
                        </div>
                        <div className='mt-4'>
                            <Link to='/admin/add-hotel-amenity' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add Amenity</Link>
                        </div>
                    </div>
                    {hotel_id && <AmenityStatus hotelId={hotel_id} amenities={amenities} />}
                    <div className='table-responsive'>
                    <table className='table bg-white border border-slate-300 mt-4'>
                        <thead>
                            <tr>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Amenity</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Logo</th>
                                <th className='border border-slate-300 text-left bg-hotel-maroon text-white'>Availability</th>
                                {!hotel_id && (<th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>)}
                            </tr>
                        </thead>
                        <tbody>

                            {mHotelAmenities?.map((item, index) => (
                                <tr key={index}>
                                    <td className='border border-slate-300 text-center'>{index + 1}</td>
                                    <td className='border border-slate-300 text-center'>{item.amenity.amenity}</td>
                                    <td className='border border-slate-300 text-center'>

                                        {/* <img style={{ margin: "0 auto" }} src={(`${item.amenity.image.substring(item.amenity.image.indexOf('/uploads'), item.amenity.image.length)}`)} alt='swimming pool' width="50" /> */}

                                        <img style={{ margin: "0 auto" }} src={(`${HSURL}/${item.amenity.image}`)} alt={item.amenity} width="50" />

                                    </td>
                                    <td className='border border-slate-300 text-center'>
                                        <label htmlFor={`default-toggle-`} className="inline-flex relative w-full cursor-pointer">
                                            <input type="checkbox" defaultChecked={item.amenity.status} value={item.amenity.status} id={`default-toggle-0`} className="sr-only peer" />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Available</span>
                                        </label>
                                    </td>

                                </tr>

                            ))}



                            {!hotel_id && amenities?.map((item, index) => (

                                <tr key={item._id}>
                                    <td className='border border-slate-300 text-center'>{index + 1}</td>
                                    <td className='border border-slate-300 text-center'>{item.amenity}</td>
                                    <td className='border border-slate-300 text-center'>
                                        <img style={{ margin: "0 auto" }} src={(`${HSURL}/${item.image}`)} alt={item.amenity} width="50" />
                                    </td>
                                    <td className='border border-slate-300 text-center'>
                                        <label htmlFor={`default-toggle-`} className="inline-flex relative w-full cursor-pointer">
                                            <input type="checkbox" defaultChecked={item.status} value={item.status} id={`default-toggle-0`} className="sr-only peer" />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Available</span>
                                        </label>
                                    </td>
                                    <td className='border border-slate-300 text-center'>
                                        <Link to={`/admin/edit-hotel-amenity/${item._id}`} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                            <i className="fas fa-pencil"></i>
                                        </Link>
                                        <Link className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => handleDelete(item._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Link>
                                    </td>
                                </tr>

                            ))}
                            {loading &&
                                <tr>
                                    <td className='border border-slate-300 text-center' col-span="5">loading..</td>
                                </tr>
                            }



                        </tbody>
                    </table>
                    </div>

                    {!hotel_id && <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />}

                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
