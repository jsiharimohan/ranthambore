import React from 'react'
import { Link } from 'react-router-dom';

export default function PackageAssets({ data, handleDelete, type, editType = '' }) {


    return (
        <div className='table-responsive'>
        <table className='table bg-white border border-slate-300 mt-4'>
            <thead>
                <tr>
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                    <th className='border border-slate-300 text-left bg-hotel-maroon text-white'>Name</th>
                    {/* <th className='border border-slate-300 text-left bg-hotel-maroon text-white'>Availability</th> */}
                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr key="01" style={{ display: 'none' }}>
                    <td className='border border-slate-300 text-center'>1</td>
                    <td className='border border-slate-300 text-left'>Loading..</td>
                </tr>
                {data && data.map((item, index) => (
                    <tr key={item._id}>
                        <td className='border border-slate-300 text-center'>{index + 1}</td>
                        <td className='border border-slate-300 text-left'>{item[type]}</td>
                        {/* <td className='border border-slate-300 text-left'>
                            <label htmlFor="default-toggle-1" className="inline-flex relative items-center w-full cursor-pointer">
                                <input type="checkbox" value="" id="default-toggle-1" className="sr-only peer" />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Available</span>
                            </label>
                        </td> */}
                        <td className='border border-slate-300 text-left'>
                            <Link to={`/admin/edit-package-${editType}${type}/${item._id}`} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <i className="fas fa-pencil"></i>
                            </Link>
                            <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => handleDelete(item._id)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>))}
            </tbody>
        </table >
        </div>
    )
}
