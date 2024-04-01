import React from 'react'

export default function CustomerDetails({ details }) {
  return (
    <div>
        <h2 className='text-2xl text-black font-bold mb-2 mt-12'>Customer Details</h2>
        <div className='table-responsive'>
        <table className='table bg-white border border-slate-300'>
            <thead>
                <tr>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Name</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Mobile Number</th>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    details &&
                    <tr>
                        <td className='border border-slate-300 text-center'>{details.name}</td>
                        <td className='border border-slate-300 text-center'>{details.mobile}</td>
                        <td className='border border-slate-300 text-center'>{details.email}</td>
                    </tr>
                }
                   
            </tbody>
        </table>
        </div>
    </div>
  )
}
