import React from 'react'
import { Link } from 'react-router-dom'

export default function SafariPriceList() {

  return (
    <>      
    <div className='table-responsive'>
             <table className='table bg-white border border-slate-300 mt-4'>
             <thead>
                 <tr>
                     <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>#</th>
                     <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Safari Zone</th>
                     <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                 </tr>
             </thead>
             <tbody>
                 <tr>
                     <td className='border border-slate-300 text-center'>1</td>
                     <td className='border border-slate-300 text-center'>Default</td>
                     <td className='border border-slate-300 text-center'>
                     <Link to='/admin/price-list/default' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                         <i className="fas fa-pencil"></i>
                     </Link>
                     </td>
                 </tr>
                 <tr>
                     <td className='border border-slate-300 text-center'>2</td>
                     <td className='border border-slate-300 text-center'>Weekend</td>
                     <td className='border border-slate-300 text-center'>
                     <Link to='/admin/price-list/weekend' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                         <i className="fas fa-pencil"></i>
                     </Link>
                     </td>
                 </tr>
                 <tr>
                     <td className='border border-slate-300 text-center'>3</td>
                     <td className='border border-slate-300 text-center'>Festival</td>
                     <td className='border border-slate-300 text-center'>
                     <Link to='/admin/price-list/festival' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                         <i className="fas fa-pencil"></i>
                     </Link>
                     </td>
                 </tr>
             </tbody>
         </table>
         </div>    
     

           </>
  )
}
