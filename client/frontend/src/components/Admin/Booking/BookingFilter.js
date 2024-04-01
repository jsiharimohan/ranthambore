import { React, useState } from 'react';
import DatePicker from "react-datepicker";

export default function BookingFilter() {
    const [bookingDate, setbookingDate] = useState(new Date());
    const [createdDate, setcreatedDate] = useState(new Date());
  return (
    <form className="grid grid-cols-4 gap-4 mt-2 mb-2 controlDate">
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer Name</label>
            <select id="customers" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Please select</option>
                <option>John Doe</option>
                <option>Mark Spencer</option>
                <option>Kaira</option>
            </select>
        </div>
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Phone number</label>
            <input type="number" id="phNumber" placeholder="Phone Number" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Email</label>
            <input type="email" id="email" placeholder="Email" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Booking Date</label>
            <DatePicker selected={bookingDate} onChange={(date) => setbookingDate(date)} />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Payment Status</label>
            <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Please select</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
            </select>
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Created Date</label>
            <DatePicker selected={createdDate} onChange={(date) => setcreatedDate(date)} />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label>
            <button type='button' className="min-150 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <i className="fas fa-filter mr-2"></i> Filter
            </button>
        </div>
    </form>
  )
}
