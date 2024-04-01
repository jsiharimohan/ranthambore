import React  , { useState , useEffect , useCallback } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import axios from 'axios';
import { useAlert } from "react-alert";
import * as moment from 'moment';
import ReactPaginate from "react-paginate";

export default function Customers() {

   const [details, setDetails] = useState([]); 
   const alert = useAlert();
   const [pageCount, setpageCount] = useState(0);
   const [page, setPage] = useState(1);
   const [result_customers, setCustomers] = useState([]); 

   function customers() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/customers/customers`, {
        headers: {
        'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+localStorage.getItem('accessToken')
        },
        }).then(result => { 
            setCustomers(result.data.data);  
        })  
    }

   const GetDetails = useCallback( () =>  {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/customers?page=`+page, {
            headers: {
            'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
            }).then(result => { 
                if(result.data.products.length > 0) {
                    setDetails(result.data.products);
                    setpageCount(Math.ceil(result.data.productsCount / result.data.resultPerPage));
                    setPage(result.data.page);
                } else {
                    setDetails([]);
                    setpageCount(0);
                    setPage(1);
                }
        })  
    },[page]);

    useEffect(() => {
        customers();
        GetDetails();
    },[GetDetails]);

    const fetchComments = async (currentPage) => {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/admin/customers?page=`+currentPage , {
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
        setDetails(commentsFormServer.products);
    };


    const HandleDelete = (id , type) => {
        var result = window.confirm("Want to delete?");
        if (result) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/customers/${type}/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
            }).then(result => {
                alert.success("Data is deleted");
                setTimeout(() => {
                window.location = '/admin/customers';
                }, 1000);
            })
        }
    }

    const [type , setType] = useState('');
    const [filterName , setFilterName] = useState('');
    const [filterEmail , setFilterEmail] = useState('');
    const [filterMobile , setFilterMobile] = useState('');

    const HandleFilter = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/customers?page=`+page+'&type='+type+'&filter_name='+filterName+'&filter_email='+filterEmail+'&filter_mobile='+filterMobile, {
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
          }).then(result => { 
                if(result.data.products.length > 0) {
                    setDetails(result.data.products);
                    setpageCount(Math.ceil(result.data.productsCount / result.data.resultPerPage));
                    setPage(result.data.page);
                } else {
                    setDetails([]);
                    setpageCount(0);
                    setPage(1);
                }
          })
    }

    const HandelReset = () => {
        setType('');setFilterName('');setFilterEmail('');setFilterMobile('');
        GetDetails();
    }

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
            <h1 className='text-2xl text-black font-bold mb-3'>Customers</h1>
            <form className="grid grid-cols-5 gap-4 mt-2 mb-2">
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Booking Type</label>
                    <select id="safariType" value = {type} onChange = {(e) => setType(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Please Select</option>
                        <option value="safari">Safari</option>
                        <option value="chambal">Chambal</option>
                        <option value="package">Package</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer Name</label>
                    <select id="safariType" value = {filterName} onChange = {(e) => setFilterName(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Please Select</option>
                        {
                            result_customers && result_customers.map((res,i) => (
                                <option value={res} key={i}>{res}</option>
                            ))
                        }
                    </select> </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer Email</label>
                    <input type="email"   value = {filterEmail} onChange = {(e) => setFilterEmail(e.target.value)} placeholder='Customer Email' id="customerEmail" className="block w-full text-gray-900 bg-white rounded border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mobile Number</label>
                    <input type="number"  value = {filterMobile}  onChange = {(e) => setFilterMobile(e.target.value)} placeholder='Mobile Number' id="customerMobile" className="block w-full text-gray-900 bg-white rounded border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='form-group'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label>
                    <button type='button' onClick = {HandleFilter} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <i className="fas fa-filter mr-2"></i> Filter
                    </button> 
                   
                    <button type='button' onClick = {HandelReset} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        <i className="fas fa-filter mr-2"></i> Reset
                    </button>
                </div>
            </form>
            <div className='table-responsive'>
            <table className='table bg-white border border-slate-300 mt-4'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Date Time</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Booking Type</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Name</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Email</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Mobile Number</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Address</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { details && details.map((item,index) => (
                        <tr key={index}>
                            <td className='border border-slate-300 text-center'>{moment(item.createdAt).format("DD/MM/YYYY")} , <span className='font-bold'>{moment(item.createdAt).format("hh:mm A")}</span></td>
                            <td className='border border-slate-300 text-center'>{item.type}</td>
                            <td className='border border-slate-300 text-center'>{item.name}</td>
                            <td className='border border-slate-300 text-center'>{item.email}</td>
                            <td className='border border-slate-300 text-center'>{item.mobile}</td>
                            <td className='border border-slate-300 text-center'>{item.address}</td>
                            <td className='border border-slate-300 text-center'>
                            <Link onClick = {() => HandleDelete(item._id, item.type)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                <i className="fas fa-trash"></i>
                            </Link>
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
