import React from 'react'

export default function FilterHotel() {
  return (
    <form className="grid grid-cols-5 gap-4 mt-2 mb-2">
        <div className='form-group'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hotel Name</label>
            <input type="text" placeholder='Hotel Name' id="hotelName" className="block w-full text-gray-900 bg-white rounded border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className='form-group'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hotel Rating</label>
            <select id="hotelRating" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Please Select</option>
                <option>3 star</option>
                <option>4 star</option>
                <option>5 star</option>
            </select>
        </div>
        <div className='form-group'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Location</label>
            <select id="hotelLocation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Please Select</option>
                <option>Sasan Gir</option>
                <option>Devalia Safari Park</option>
                <option>Kankai Temple</option>
            </select>
        </div>
        <div className='form-group'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Availability</label>
            <select id="hotelAvail" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Please Select</option>
                <option>Available</option>
                <option>Not available</option>
            </select>
        </div>
        <div className='form-group'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label>
            <button type='button' className="min-150 text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <i className="fas fa-filter mr-2"></i> Filter
            </button>
        </div>
    </form>
  )
}
