import axios from 'axios';
import { React, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import moment from 'moment'


export default function FilterEnquiry(props) {
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('');
    const [customer, setCustomer] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [createdDate, setCreatedDate] = useState('');

    function getAllCustomer() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/enquiries/customer?type=${props.type}`, {
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


    const handleSubmit = (e) => {
        e.preventDefault();
        let booking_date = '';
        let created_date = '';

        if (bookingDate && bookingDate !== 'null') {
            booking_date = moment(bookingDate).format('YYYY-MM-DD')


        }

        if (createdDate && createdDate !== 'null') {
            created_date = moment(createdDate).format('YYYY-MM-DD')


        }

        props.onSubmit({ phone, type, customer, booking_date, created_date })
    }



    return (

        <form className="grid grid-cols-5 gap-4 mt-2 mb-2 {props.type === 'hotel' && grid-cols-6 forHoteldateFilter }" onSubmit={handleSubmit}>



            {props.type === 'hotel' && <div className='form-group'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enquiry Type</label>
                <select id="enquiryType" onChange={(e) => setType(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Please Select</option>
                    <option value="hotel">Hotel</option>
                    <option value="safari">Safari</option>
                </select>
            </div>}
            <div className='controlEnquiryDate'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Booking Date</label>
                <DatePicker placeholderText={'Please select a date'} selected={bookingDate} dateFormat="yyyy-MM-dd" onChange={date => setBookingDate(date)} />
            </div>
            <div className='form-group'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer Name</label>

                {customerData && <SelectPicker data={customerData} onChange={setCustomer} style={{ width: 224 }} />}
            </div>
            <div className='form-group'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                <input type="number" id="phNumber" onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className='form-group controlEnquiryDate'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Booking Created</label>
                <DatePicker placeholderText={'Please select a date'} selected={createdDate} dateFormat="yyyy-MM-dd" onChange={date => setCreatedDate(date)} />
            </div>
            <div className='form-group'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label>
                <button type='submit' className="min-150 text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <i className="fas fa-filter mr-2"></i> Filter
                </button>
            </div>
        </form>
    )
}