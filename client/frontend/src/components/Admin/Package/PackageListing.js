import React from 'react';
import { Link } from "react-router-dom";

import swal from 'sweetalert';
import axios from 'axios';


export default function PackageListing({ packages }) {


    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/package/packages/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            swal("Data is deleted", "success");
            setTimeout(() => {
                window.location = '/admin/packages';
            }, 1000);
        })
    }

    return (
        <div className='table-responsive'>
        <table className='table bg-white border border-slate-300 mt-4'>
            <thead>
                <tr>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Package</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Price</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Rating</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Package Type</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Availability</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                </tr>
            </thead>
            <tbody>

                {packages && packages.map((item, index) => (

                    <tr key={index} >
                        <td className='border border-slate-300 text-center'>{index + 1}</td>
                        <td className='border border-slate-300 text-center'>{item.name}</td>
                        <td className='border border-slate-300 text-center'>₹{item.price}</td>
                        <td className='border border-slate-300 text-center'>{item.rating} Star</td>
                        <td className='border border-slate-300 text-center'>Normal</td>


                        <td className='border border-slate-300 text-center'>
                            <label htmlFor={`default-toggle-${index}`} className="inline-flex relative items-center w-full cursor-pointer">
                                <input type="checkbox" value={item.availability} defaultChecked={item.availability} mid={`default-toggle-${index}`} className="sr-only peer" />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{item.availability === 1 ? 'Enabled' : 'Disabled'}</span>
                            </label>
                        </td>


                        <td className='border border-slate-300 text-center'>
                            <div className="dropdown">
                                <button className="text-white font-bold text-sm px-6 py-2 rounded shadow outline-none focus:outline-none mr-1 mb-1 bg-danger active:bg-hotel-maroon ease-linear transition-all duration-150 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    View
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link to={`/admin/edit-package/${item._id}`} style={{ borderBottom: "1px solid #ddd" }} className="text-sm py-2 px-2 font-normal block whitespace-no-wrap bg-transparent text-black">
                                        Edit
                                    </Link>
                                    <Link to={`/admin/package-to-features/${item._id}`} style={{ borderBottom: "1px solid #ddd" }} className="text-sm py-2 px-2 font-normal block whitespace-no-wrap bg-transparent text-black">
                                        Features
                                    </Link>
                                    <Link to={`/admin/package-to-inclusions/${item._id}`} style={{ borderBottom: "1px solid #ddd" }} className="text-sm py-2 px-2 font-normal block whitespace-no-wrap bg-transparent text-black">
                                        Inclusion
                                    </Link>
                                    <Link to={`/admin/package-to-exclusions/${item._id}`} style={{ borderBottom: "1px solid #ddd" }} className="text-sm py-2 px-2 font-normal block whitespace-no-wrap bg-transparent text-black">
                                        Exclusion
                                    </Link>
                                    <Link to={`/admin/package-categories/${item._id}`} style={{ borderBottom: "1px solid #ddd" }} className="text-sm py-2 px-2 font-normal block  whitespace-no-wrap bg-transparent text-black">
                                        Categories
                                    </Link>
                                    <Link to={`/admin/package-to-itineraries/${item._id}`} className="text-sm py-2 px-2 font-normal block whitespace-no-wrap bg-transparent text-black">
                                        Iternary
                                    </Link>
                                    <div className="h-0 border border-solid border-t-0 border-blueGray-800" />
                                    <button type="button" onClick={(e) => handleDelete(item._id)} className="text-left border-b-1 border-black text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-danger">
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
    )
}