import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import FilterEnquiry from '../../../components/Admin/Enquiry/FilterEnquiry';
import PagesList from '../../../components/Admin/Enquiry/PagesList';
import axios from 'axios';
import ReactPaginate from "react-paginate";


export default function Pages() {

  const [enquiries, setEnquiries] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [page, setPage] = useState(1);
  let limit = 10;


  function getEnquiries() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/pages?page=` + page, {
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



  const getFilterData = ({ phone, type, customer, booking_date, created_date }) => {

    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/pages}`, {
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



  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <Navbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 bigTable hotel">
          <div className='mt-4'>
            <h1 className='text-2xl text-black font-bold mb-3'>Pages</h1>
          </div>
          <PagesList enquiries={enquiries} />

          
        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}
