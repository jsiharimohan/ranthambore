import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import CurrentEnquiryFilter from '../../../components/Admin/Enquiry/CurrentEnquiryFilter'

export default function CurrentEnquiryList() {

    const [enquiries, setEnquiries] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [page, setPage] = useState(1);
    let limit = 15;

    function getEnquiries() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/bookings/current?page=${page}&size=${limit}`, {
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
    }, [page]);

    const resetData = () => {
        getEnquiries();
    }


    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        setPage(currentPage);
    };

    const getFilterData = ({ phone, email, vehicle, timing, zone, customer, booking_date }) => {

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/bookings/current?page=1&size=${limit}&filter_name=${customer}&filter_email=${email}&filter_mobile=${phone}&filter_date=${booking_date}&filter_zone=${zone}&filter_vehicle=${vehicle}&filter_timing=${timing}`, {
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
        axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/bookings/current/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            swal("Data is deleted");
            setTimeout(() => {
                window.location = '/admin/current-booking-enquiries';
            }, 1000);
        })
    }

  return (
    <>
    <CurrentEnquiryFilter onSubmit={getFilterData} onReset={resetData}/>
    <div className='table-responsive'>
    <table className='table bg-white border border-slate-300 mt-4'>
        <thead>
            <tr>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Name</th>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Phone</th>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Email</th>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Booking Date</th>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Vehicle Type</th>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Safari Timing</th>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Safari Zone</th>
                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
            </tr>
        </thead>
        <tbody>
            {enquiries && enquiries?.map((item, index) => (
                        <tr key={index}>
                
                <td className='border border-slate-300 text-center'>1</td>
                <td className='border border-slate-300 text-center'>{item.name}</td>
                <td className='border border-slate-300 text-center'>{item.mobile}</td>
                <td className='border border-slate-300 text-center'>{item.email}</td>
                <td className='border border-slate-300 text-center'>{item.date}</td>
                <td className='border border-slate-300 text-center'>{item.vehicle}</td>
                <td className='border border-slate-300 text-center'>{item.time}</td>
                <td className='border border-slate-300 text-center'>{item.zone}</td>
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
    </>
  )
}
