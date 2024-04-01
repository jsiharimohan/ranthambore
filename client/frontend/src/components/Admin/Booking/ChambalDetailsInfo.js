import React from 'react'
import * as moment from 'moment';

export default function ChambalDetailsInfo({ details }) {
  return (
    <div>
        <h1 className='text-2xl text-black font-bold mb-2'>Chambal Booking Details</h1>
        <div className='table-responsive'>
        <table className='table bg-white border border-slate-300'>
            <thead>
                <tr>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Chambal Booking Type</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Booking Date</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Order Date</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Timing</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Amount</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Payment Status</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Transaction ID</th>
                </tr>
            </thead>
            <tbody>
                { details &&  
                     <tr>
                        <td className='border border-slate-300 text-center'>{details.booking_name}</td>
                        <td className='border border-slate-300 text-center'>{details.date}</td>
                        <td className='border border-slate-300 text-center'>{moment(details.createdAt).format("YYYY-MM-DD h:mm:ss a")}</td>
                        <td className='border border-slate-300 text-center'>{details.time}</td>
                        <td className='border border-slate-300 text-center'>{details.amount}</td>
                        <td className='border border-slate-300 text-center'>{ details.transaction_id ? 'Paid' : 'Unpaid' }</td>
                        <td className='border border-slate-300 text-center'>{details.transaction_id}</td>
                    </tr>
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}
