import React  , { useState , useEffect , useCallback } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import axios from 'axios';
import { useAlert } from "react-alert";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";


export default function ChambalManagement() {

  const [details, setDetails] = useState([]); 
  const alert = useAlert();
  const [pageCount, setpageCount] = useState(0);
  const [page, setPage] = useState(1);

  const GetDetails = useCallback( () =>  {
       axios.get(`${process.env.REACT_APP_BASE_URL}/admin/bookings/chambal?page=`+page+'&type=chambal', {
           headers: {
           'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json',
               'Authorization': `Bearer `+localStorage.getItem('accessToken')
           },
           }).then(result => { 
               if(result.data.data.length > 0) {
                   setDetails(result.data.data);
                   setpageCount(Math.ceil(result.data.total / result.data.perPage));
                   setPage(result.data.page);
               } else {
                   setDetails([]);
                   setpageCount(0);
                   setPage(1);
               }
       })  
   },[page]);

   useEffect(() => {
       GetDetails();
   },[GetDetails]);

   const fetchComments = async (currentPage) => {
       const res = await fetch(
           `${process.env.REACT_APP_BASE_URL}/admin/bookings/chambal?page=`+currentPage+'&type=chambal' , {
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer `+localStorage.getItem('accessToken')
               },
           }
       );
       const data = await res.json();
 
       return data
   };

   const handlePageClick = async (data) => {
       let currentPage = data.selected + 1;
       const commentsFormServer = await fetchComments(currentPage);
       setDetails(commentsFormServer.data);
   };


   const HandleDelete = (id) => {
    var result = window.confirm("Want to delete?");
        if (result) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/bookings/chambal/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
            }).then(result => {
                alert.success("Data is deleted");
                setTimeout(() => {
                window.location = '/admin/chambal-bookings';
                }, 1000);
            })
        }
   }

   const [filterZone , setFilterZone] = useState('');
   const [filterTiming , setTiming] = useState('');
   const [filterStatus , setFilterStatus] = useState('');
   const [filterVehicle , setFilterVehicle] = useState('');
   const [filterDate , setFilterDate] = useState();
   const [filterName , setFilterName] = useState('');
   const [filterEmail , setFilterEmail] = useState('');
   const [filterPhone , setFilterPhone] = useState('');
   const [filterOrderDate , setFilterOrderDate] = useState();

   const HandleFilter = () => {

       const filterDateSelected = filterDate != undefined ? moment(filterDate).format("YYYY-MM-DD") : '';
       const filterOrderDateSelected = filterOrderDate != undefined ? moment(filterOrderDate).format("YYYY-MM-DD") : '';

       axios.get(`${process.env.REACT_APP_BASE_URL}/admin/bookings/chambal?page=`+page+'&filter_date='+filterDateSelected+'&filter_created_at='+filterOrderDateSelected+'&filter_name='+filterName+'&filter_email='+filterEmail+'&filter_mobile='+filterPhone+'&filter_timing='+filterTiming+'&filter_status='+filterStatus, {
           headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json',
             'Authorization': `Bearer `+localStorage.getItem('accessToken')
           },
         }).then(result => { 
           if(result.data.data.length > 0) {
               setDetails(result.data.data);
               setpageCount(Math.ceil(result.data.total / result.data.perPage));
               setPage(result.data.page);
           } else {
               setDetails([]);
               setpageCount(0);
               setPage(1);
           } 
         })
   }

   const HandelReset = () => {
       setTiming('');setFilterStatus('');setFilterDate();setFilterOrderDate();setFilterEmail('');setFilterPhone('');setFilterName('');
       GetDetails();
   }
   
  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 formstyle">
            <h1 className='text-2xl text-black font-bold mb-3'>Chambal booking</h1>
            <form className="grid grid-cols-4 gap-4 mt-2 mb-2">
                    <div className='controlEnquiryDate'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Booking Date</label>
                        <DatePicker placeholderText={'Please select a date'} selected={filterDate} onChange={(date) => setFilterDate(date)} />
                    </div>
                    <div className='controlEnquiryDate'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Order Date</label>
                        <DatePicker placeholderText={'Please select a date'}  selected={filterOrderDate} onChange={(date) => setFilterOrderDate(date)} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                        <input id="name" value = {filterName} onChange = {(e) => setFilterName(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Customer Name' />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                        <input id="email" value = {filterEmail} onChange = {(e) => setFilterEmail(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Customer Email' />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone</label>
                        <input id="phone" value = {filterPhone} onChange = {(e) => setFilterPhone(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Phone Number' />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Timing</label>
                        <select id="timings" value = {filterTiming} onChange = {(e) => setTiming(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Please Select</option>
                                <option value="8:00 am to 9:00 am">8:00 am to 9:00 am</option>
                                <option value="9:00 am to 10:00 am">9:00 am to 10:00 am</option>
                                <option value="10:00 am to 11:00 am">10:00 am to 11:00 am</option>
                                <option value="11:00 am to 12:00 pm">11:00 am to 12:00 pm</option>
                                <option value="12:00 pm to 01:00 pm">12:00 pm to 01:00 pm</option>
                                <option value="01:00 pm to 02:00 pm">01:00 pm to 02:00 pm</option>
                                <option value="02:00 pm to 03:00 pm">02:00 pm to 03:00 pm</option>
                                <option value="03:00 pm to 04:00 pm">03:00 pm to 04:00 pm</option>
                                <option value="04:00 pm to 05:00 pm">04:00 pm to 05:00 pm</option>
                                <option value="05:00 pm to 06:00 pm">05:00 pm to 06:00 pm</option>
                            </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label>
                        <button type='button' onClick = {HandleFilter} className="text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <i className="fas fa-filter mr-2"></i> Filter
                        </button>
                        <button type='button' onClick = {HandelReset} className="text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <i className="fas fa-filter mr-2"></i> Reset
                        </button>
                    </div>
                </form>
                <div className='table-responsive'>
            <table className='table bg-white border border-slate-300 mt-4'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Booking Date</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Name</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Email</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Phone</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Booking Name</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Amount</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Status</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Order Date</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white min150'>Action</th>
                    </tr>
                </thead>
                <tbody>
                  { details && details.map((item,index) => (
                        <tr style={{ backgroundColor: item.seen == 0 ? '#6083B0': ''}} key={index}>
                            <td className='border border-slate-300 text-center'>{index+1}</td>
                            <td className='border border-slate-300 text-center'>{item.date} </td>
                            <td className='border border-slate-300 text-center'>{item.customer_name}</td>
                            <td className='border border-slate-300 text-center'>{item.customer_email}</td>
                            <td className='border border-slate-300 text-center'>{item.customer_mobile}</td>
                            <td className='border border-slate-300 text-center'>{item.booking_name}</td>
                            <td className='border border-slate-300 text-center'>{item.amount}</td>
                            <td className='border border-slate-300 text-center'>{item.status}</td>
                            <td className='border border-slate-300 text-center'>{moment(item.createdAt).format("YYYY-MM-DD h:mm:ss a")} </td>
                            <td className='border border-slate-300 text-center min150'>
                                <Link class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to={`/admin/view-chambal-bookings/${item._id}`}><i className='fas fa-eye'></i></Link>
                                <button onClick = {() => HandleDelete(item._id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                    <i className='fas fa-trash'></i>
                                </button>
                            </td> 
                        </tr>
                    ))}
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
      <FooterAdmin/>
    </div>
  )
}
