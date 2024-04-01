import axios from 'axios';
import React from 'react'
import swal from 'sweetalert';
import moment from 'moment';


export default function EnquiryList({ enquiries, type }) {

    const handleDelete = (id) => {
        console.log("id", id);
        axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/enquiries/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            swal("Data is deleted");
            setTimeout(() => {
                window.location = '/admin/general-enquiries';
            }, 1000);
        })
    }

    return (
        <>
        <div className='table-responsive'>
            <table className='table bg-white border border-slate-300 mt-4'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                        {type !== 'contact' && <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Booking Date</th>}
                        {type === 'hotel' && <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Hotel</th>}
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Name</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Phone</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Message</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Type</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Created at</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {enquiries && enquiries?.map((item, index) => (
                        <tr key={index}>
                            <td className='border border-slate-300 text-center'>{index + 1}</td>
                            {type !== 'contact' && <td className='border border-slate-300 text-center'>{item.booking_date}</td>}
                            {type === 'hotel' && <td className='border border-slate-300 text-center'>{item.hotel}</td>}
                            <td className='border border-slate-300 text-center'>{type === 'contact' ? item?.name : item.traveller_name}</td>
                            <td className='border border-slate-300 text-center'>{item.phone}</td>
                            <td className='border border-slate-300 text-center'>{item.message}</td>
                            <td className='border border-slate-300 text-center'><span className='bg-enquiry-brown text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center mr-2'>{item.type}</span></td>
                            <td className='border border-slate-300 text-center'>{moment(item.createdAt).format('YYYY-MM-DD')}</td>
                            <td className='border border-slate-300 text-center'>
                                <button onClick={(e) => handleDelete(item._id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                    <i className='fas fa-trash'></i>
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
