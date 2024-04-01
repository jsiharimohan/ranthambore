import axios from 'axios';
import { React, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import moment from 'moment'

export default function CurrentEnquiryFilter(props) {
    const [bookingDate, setbookingDate] = useState('');

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [zone, setZone] = useState('');
    const [timing, setTiming] = useState('');
    const [customer, setCustomer] = useState('');
    const [customerData, setCustomerData] = useState([]);

    function getAllCustomer() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/bookings/current/customers`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            if (result.data.data.length > 0) {

                const data = result.data.data.map(
                    item => ({ label: item, value: item })
                );

                setCustomerData(data);

            }
        })
    }

    useEffect(() => {
        getAllCustomer();
    }, []);


    const resetFilter = (e) => {

        props.onReset();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let booking_date = '';
        let created_date = '';

        if (bookingDate && bookingDate !== 'null') {
            booking_date = moment(bookingDate).format('YYYY-MM-DD')
        }

        props.onSubmit({ phone, email, vehicle, timing, zone, customer, booking_date })
    }




    return (
    <form className="grid grid-cols-4 gap-4 mt-2 mb-2" onSubmit={handleSubmit}>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer Name</label>
            {customerData && <SelectPicker data={customerData} onChange={setCustomer} style={{ width: 224 }} />}
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
            <input type="number" id="phNumber" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input type="email" id="email" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className='controlEnquiryDate'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Safari Booking Date</label>
            <DatePicker placeholderText={'Please select a date'} selected={bookingDate} onChange={(date) => setbookingDate(date)} />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vehicle Type</label>
            <select id="vehicles" onChange={(e) => setVehicle(e.target.value)}  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=''>Please Select</option>
                <option value='Gypsy'>Gypsy</option>
                <option value='Canter'>Canter</option>
            </select>
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Safari Timing</label>
            <select id="timings" onChange={(e) => setTiming(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=''>Please Select</option>
                <option value='Morning'>Morning</option>
                <option value='Evening'>Evening</option>
            </select>
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Safari Zone</label>
            <select id="zones" onChange={(e) => setZone(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=''>Please Select</option>
                <option value="Zone 1/2/3/4/5">Zone 1/2/3/4/5</option>
                <option value="Zone 6/7/8/9/10">Zone 6/7/8/9/10</option>
            </select>
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label>
            <button type='submit' className="text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <i className="fas fa-filter mr-2"></i> Filter
            </button>
            <button type='button' onClick={(e) => resetFilter()} className="text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <i className="fas fa-filter mr-2"></i> Reset
            </button>
        </div>
    </form>
    )
}