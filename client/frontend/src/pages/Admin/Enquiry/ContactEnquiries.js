import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import Navbar from '../../../components/Admin/Navbar/AdminNavbar'
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin'
import EnquiryList from '../../../components/Admin/Enquiry/EnquiryList';
import ReactPaginate from "react-paginate";
import axios from 'axios';
import moment from 'moment'
import DatePicker from "react-datepicker";
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import swal from 'sweetalert';




export default function ContactEnquiries() {

    const [enquiries, setEnquiries] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [phone, setPhone] = useState('');
    const [customer, setCustomer] = useState('');
    const [email, setEmail] = useState('');
    const [createdDate, setCreatedDate] = useState('');

    const [page, setPage] = useState(1);
    let limit = 10;



    function getEnquiries() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/contactus/enquiries?page=` + page, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {

            if (result.data.data.length > 0) {
                setEnquiries(result.data.data);
                setpageCount(Math.ceil(result.data.total / result.data.perPage));
                setPage(result.data.page);
            }
        })
    }

    useEffect(() => {
        getEnquiries();
    }, [limit]);



    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
    };



    const getFilterData = (e) => {

        e.preventDefault();
        let created_date = '';


        if (createdDate && createdDate !== 'null') {
            created_date = moment(createdDate).format('YYYY-MM-DD')


        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/contactus/enquiries?page=${page}&filter_name=${customer}&filter_phone=${phone}&filter_email=${email}&filter_created_at=${created_date}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setEnquiries(result.data.data);
            setpageCount(Math.ceil(result.data.total / result.data.perPage));
            setPage(result.data.page);
        })

    }

    const handleDelete = (id) => {
        console.log("id", id);
        axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/contactus/enquiries/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            swal("Data is deleted");
            setTimeout(() => {
                window.location = '/admin/contact-enquiries';
            }, 1000);
        })
    }

    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 bigTable hotel">
                    <div className='mt-4'>
                        <h1 className='text-2xl text-black font-bold mb-3'>Contact Enquiries</h1>
                    </div>

                    <form className="grid grid-cols-5 gap-4 mt-2 mb-2" onSubmit={getFilterData}>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer Name</label>
                            <input type="text" id="name" onChange={(e) => setCustomer(e.target.value)} placeholder="Customer Name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                            <input type="number" id="phNumber" onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                            <input type="text" id="Email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Added Date</label>
                            <DatePicker placeholderText={'Please select a date'} selected={createdDate} dateFormat="yyyy-MM-dd" onChange={date => setCreatedDate(date)} />
                        </div>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label>
                            <button type='submit' className="min-150 text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <i className="fas fa-filter mr-2"></i> Filter
                            </button>
                        </div>
                    </form>

                    <div className='table-responsive'>
                    <table className='table bg-white border border-slate-300 mt-4'>
                        <thead>
                            <tr>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Name</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Phone</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Email</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Message</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Created at</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {enquiries && enquiries?.map((item, index) => (
                                <tr key={index}>
                                    <td className='border border-slate-300 text-center'>{index + 1}</td>
                                    <td className='border border-slate-300 text-center'>{item.name}</td>
                                    <td className='border border-slate-300 text-center'>{item.phone}</td>
                                    <td className='border border-slate-300 text-center'>{item.email}</td>
                                    <td className='border border-slate-300 text-center'>{item.message}</td>
                                    <td className='border border-slate-300 text-center'>{moment(item.createdAt).format('YYYY-MM-DD')}</td>
                                    <td className='border border-slate-300 text-center'>
                                        <button onClick={(e) => handleDelete(item._id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                            <i className='fas fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>

                            ))}
                            {(!enquiries || enquiries.length === 0) &&
                                <tr>
                                    <td className='border border-slate-300 text-center' colSpan="7">No data Found</td>


                                </tr>

                            }
                        </tbody>
                    </table>
                    </div>
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}