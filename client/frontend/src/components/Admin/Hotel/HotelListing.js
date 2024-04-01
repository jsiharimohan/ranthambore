import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { createPopper } from '@popperjs/core';
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import axios from 'axios';

export default function HotelListing() {

    const [hotels, setHotels] = useState([]);
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [city, setCity] = useState('');
    const [status, setStatus] = useState('');

    const [pageCount, setpageCount] = useState(0);
    const [page, setPage] = useState(1);
    let limit = 15;

    const HandleFilter = async () => {
        try {

            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels?page=1&size=${limit}&filter_name=${name}&filter_rating=${rating}&filter_availability=${status}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + localStorage.getItem('user')
                },
            });

            setHotels(result.data.data);
            setpageCount(Math.ceil(result.data.total / result.data.perPage));
            setPage(result.data.page);

        } catch (err) {
            swal(err, "error");

        }
    }

    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start"
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    const HandleShow = (id) => {
        var element = document.getElementById('action-' + id);
        element.classList.add('block');
        element.classList.remove('hidden');
        setDropdownPopoverShow(true);
    }

    const HandleClose = (id) => {
        var element = document.getElementById('action-' + id);
        element.classList.add('hidden');
        element.classList.remove('block');
        setDropdownPopoverShow(false);
    }

    const HandleReset = async () => {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels?page=1&size=${limit}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('user')
            },
        });

        setHotels(result.data.data);
        setpageCount(Math.ceil(result.data.total / result.data.perPage));
        setPage(result.data.page);
    }





    useEffect(() => {

        const getHotels = async (search = '') => {

            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels?page=${page}&size=${limit}`, {
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ` + localStorage.getItem('user')
                    },
                });

                setHotels(result.data.data);
                setpageCount(result.data.total);
                setpageCount(Math.ceil(result.data.total / result.data.perPage));
                setPage(result.data.page);


            } catch (err) {

            }

        }

        getHotels();
    }, [])


    const fetchComments = async (currentPage) => {
        const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/hotel/hotels?page=${currentPage}&size=${limit}&filter_name=${name}&filter_rating=${rating}&filter_availability=${status}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('tokenkey')
            },
        }
        );
        return res.data;
    };

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        const commentsFormServer = await fetchComments(currentPage);
        setHotels(commentsFormServer.data);
    };

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('user')
            },
        }).then(result => {
            swal("Data is deleted", "success");
            setTimeout(() => {
                window.location = '/admin/hotels';
            }, 1000);
        })
    }

    return (
        <>
            <>
                <form className="grid grid-cols-5 gap-4 mt-2 mb-2">
                    <div className='form-group'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Hotel Name</label>
                        <input type="text" placeholder='Hotel Name' onChange={(e) => setName(e.target.value)} id="hotelName" className="block w-full text-gray-900 bg-white rounded border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className='form-group'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Hotel Rating</label>
                        <select id="hotelRating" onChange={(e) => setRating(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Please Select</option>
                            <option value="3">3 star</option>
                            <option value="4">4 star</option>
                            <option value="5">5 star</option>
                        </select>
                    </div>
                    {/* <div className='form-group'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Location</label>
                        <select id="hotelLocation" onChange={(e) => setCity(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Please Select</option>
                            <option value="Sasan Gir">Sasan Gir</option>
                            <option value="Devalia Safari Park">Devalia Safari Park</option>
                            <option value="Kankai Temple">Kankai Temple</option>
                        </select>
                    </div> */}
                    <div className='form-group'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Availability</label>
                        <select id="hotelAvail" onChange={(e) => setStatus(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Please Select</option>
                            <option value="1">Available</option>
                            <option value="0">Not available</option>
                        </select>
                    </div>
                    <div className='form-group margin'>
                        {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label> */}
                        <button type='button' onClick={HandleFilter} className="min-150 text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <i className="fas fa-filter mr-2"></i> Filter
                        </button>
                    </div>
                    <div className='form-group margin'>
                        {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label> */}
                        <button type='button' onClick={HandleReset} className="min-150 text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <i className="fas fa-filter mr-2"></i> Reset
                        </button>
                    </div>
                </form>
            </>
            <>
            <div className='table-responsive'>
                <table className='table bg-white border border-slate-300 mt-4'>
                    <thead>
                        <tr>
                            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Hotel</th>
                            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Price</th>
                            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Location</th>
                            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Rating</th>
                            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Availability</th>
                            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels && hotels.map((item, index) => (

                            <tr key={index} >
                                <td className='border border-slate-300 text-center'>{index + 1}</td>
                                <td className='border border-slate-300 text-center'>{item.name}</td>
                                <td className='border border-slate-300 text-center'>₹{item.price}</td>
                                <td className='border border-slate-300 text-center'>{item.city}</td>
                                <td className='border border-slate-300 text-center'>{item.rating} Star</td>

                                <td className='border border-slate-300 text-center'>
                                    <label htmlFor={`default-toggle-`} className="inline-flex relative w-full cursor-pointer">
                                        <input type="checkbox" defaultChecked={item.status} value={item.status} id={`default-toggle-0`} className="sr-only peer" />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{item.status === 1 ? 'Available' : 'Not Available'}</span>
                                    </label>
                                </td>

                                <td className='border border-slate-300 text-center'>
                                    <div className="dropdown">
                                        <button className="text-white font-bold text-sm px-6 py-2 rounded shadow outline-none focus:outline-none mr-1 mb-1 bg-danger active:bg-hotel-maroon ease-linear transition-all duration-150 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            View
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <Link to={`/admin/edit-hotel/${item._id}`} className="text-sm py-2 px-4 font-normal whitespace-no-wrap bg-transparent text-black block" style={{ borderBottom: "1px solid #ddd" }}>
                                                Edit
                                            </Link>
                                            <Link to={`/admin/hotel-amenities/${item._id}`} className="text-sm py-2 px-4 font-normal block whitespace-no-wrap bg-transparent text-black" style={{ borderBottom: "1px solid #eee" }}>
                                                Hotel Amenities
                                            </Link>
                                            <Link to={`/admin/hotel-rooms/${item._id}`} className="text-sm py-2 px-4 font-normal block whitespace-no-wrap bg-transparent text-black" style={{ borderBottom: "1px solid #eee" }}>
                                                Hotel Rooms
                                            </Link>

                                            <button type="button" onClick={(e) => handleDelete(item._id)} className="text-left border-b-1 border-black text-sm py-2 px-4 font-normal block whitespace-no-wrap bg-transparent text-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>


                            </tr>

                        ))}

                    </tbody>
                </table>
                </div>

                <ReactPaginate
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
                />
            </>
        </>


    )
}
