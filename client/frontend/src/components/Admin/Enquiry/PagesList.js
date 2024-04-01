import axios from 'axios';
import React from 'react'
import swal from 'sweetalert';
import moment from 'moment';


export default function PagesList({ enquiries, type }) {

    const handleDelete = (id) => {
        window.location = '/admin/pages/edit/'+id;
    }

    return (
        <>
        <div className='table-responsive'>
            <table className='table bg-white border border-slate-300 mt-4'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Title</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Slug</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Created at</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {enquiries && enquiries?.map((item, index) => (
                        <tr key={index}>
                            <td className='border border-slate-300 text-center'>{index + 1}</td>
                            <td className='border border-slate-300 text-center'>{item.title}</td>
                            <td className='border border-slate-300 text-center'>{item.slug}</td>
                            <td className='border border-slate-300 text-center'>{moment(item.createdAt).format('YYYY-MM-DD')}</td>
                            <td className='border border-slate-300 text-center'>
                                <button onClick={(e) => handleDelete(item._id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                    <i className='fas fa-pencil'></i>
                                </button>
                            </td>
                        </tr>

                    ))}
                    {(!enquiries || enquiries.length === 0) &&
                        <tr>
                            <td className='border border-slate-300 text-center' colSpan="7">No data Found</td>


                        </tr>

                    }
                </tbody>
            </table>
            </div>



        </>

    )
}
