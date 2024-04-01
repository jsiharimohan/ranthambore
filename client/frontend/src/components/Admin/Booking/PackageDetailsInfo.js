import React from 'react'

export default function PackageDetailsInfo({ details }) {
  return (
    <div>
        <h1 className='text-2xl text-black font-bold mb-2'>Booking Details</h1>
        <div className='table-responsive'>
        <table className='table bg-white border border-slate-300'>
            <thead>
                <tr>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Booking Date</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Amount</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Payment Status</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Transaction ID</th>
                </tr>
            </thead>
            <tbody>
                { details &&
                    <tr>
                        <td className='border border-slate-300 text-center'>{details.date}</td>
                        <td className='border border-slate-300 text-center'>{details.amount}</td>
                        <td className='border border-slate-300 text-center'>{details.status}</td>
                        <td className='border border-slate-300 text-center'>{details.transaction_id}</td>
                    </tr>
                }   
            </tbody>
        </table>
        </div>
    </div>
  )
}
