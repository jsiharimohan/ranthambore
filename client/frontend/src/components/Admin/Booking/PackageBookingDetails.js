import React from 'react'
import * as moment from 'moment';

export default function BookingDetails({details}) {
  return (
    <div>
        <h1 className='text-2xl text-black font-bold mb-2'>Package Booking Details</h1>
        <div className='table-responsive'>
        <table className='table bg-white border border-slate-300'>
            <thead>
                <tr>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Booking Date</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Order Date</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Package Name</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Room Type</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Nationality</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>No of Kids</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>No of Rooms</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>No of dults</th>
                </tr>
            </thead>
            <tbody>
                { details &&
                    <tr>
                        <td className='border border-slate-300 text-center'>{details.date}</td>
                        <td className='border border-slate-300 text-center'>{moment(details.createdAt).format("YYYY-MM-DD h:mm:ss a")}</td>
                        <td className='border border-slate-300 text-center'>{details.package_name}</td>
                        <td className='border border-slate-300 text-center'>{details.category_name}</td>
                        <td className='border border-slate-300 text-center'>{details.nationality_type}</td>
                        <td className='border border-slate-300 text-center'>{details.no_of_kids}</td>
                        <td className='border border-slate-300 text-center'>{details.no_of_rooms}</td>
                        <td className='border border-slate-300 text-center'>{details.no_of_adult}</td>
                    </tr>
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}
