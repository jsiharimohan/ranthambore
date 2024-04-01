import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import PackageListing from '../../../components/Admin/Package/PackageListing';
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import axios from 'axios';

export default function Packages() {

  const [packages, setPackages] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [availability, setAvailability] = useState('');
  const [remountComponent, setRemountComponent] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const [page, setPage] = useState(1);
  let limit = 15;

  useEffect(() => {

    const getPackages = async () => {

      try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages?page=${page}&size=${limit}`, {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + localStorage.getItem('accessToken')
          },
        });

        setPackages(result.data.data);
        setpageCount(result.data.totalPages);
        setPage(result.data.currentPage);
      } catch (err) {
      }

    }
    getPackages();
  }, [])


  const paginationData = async (currentPage) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/package/packages?page=${currentPage}&size=${limit}&filter_name=${name}&filter_rating=${rating}&filter_availability=${availability}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accesstoken')
      },
    }
    );
    return res.data;
  };


  const HandleFilter = async () => {
    try {

      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages?page=1&size=${limit}&filter_name=${name}&filter_rating=${rating}&filter_availability=${availability}`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + localStorage.getItem('accessToken')
        },
      });

      setPackages(result.data.data);
      setpageCount(result.data.totalPages);
      setPage(result.data.currentPage);
      setRemountComponent(Math.random());

    } catch (err) {
      swal(err, "error");

    }
  }


  const HandleReset = async() => {
     try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages?page=1&size=${limit}`, {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + localStorage.getItem('accessToken')
          },
        });

        setPackages(result.data.data);
        setpageCount(result.data.totalPages);
        setPage(result.data.currentPage);
        setRemountComponent(Math.random());

      } catch (err) {

      }
  }

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await paginationData(currentPage);
    setPackages(commentsFormServer.data);
  };

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/package/packages/${id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      swal("Data is deleted", "success");
      setTimeout(() => {
        window.location = '/admin/packages';
      }, 1000);
    })
  }

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <AdminNavbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 hotel pack">
          <div className="grid grid-cols-2 gap-4">
            <div className='mt-4'>
              <h1 className='text-2xl text-black font-bold mb-3'>Packages</h1>
            </div>
            <div className='mt-4'>
              <Link to='/admin/add-package' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add Package</Link>
            </div>
          </div>

          <form className="grid grid-cols-5 gap-4 mt-2 mb-2">
            <div className='form-group'>
              <label className="block mb-2 text-sm font-medium text-gray-900">Package Name</label>
              <input type="text" placeholder='Package Name' onChange={(e) => setName(e.target.value)} id="hotelName" className="block w-full text-gray-900 bg-white rounded border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className='form-group'>
              <label className="block mb-2 text-sm font-medium text-gray-900">Package Rating</label>
              <select id="hotelRating" onChange={(e) => setRating(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Please Select</option>
                <option value="3">3 star</option>
                <option value="4">4 star</option>
                <option value="5">5 star</option>
              </select>
            </div>
            <div className='form-group'>
              <label className="block mb-2 text-sm font-medium text-gray-900">Availability</label>
              <select id="hotelAvail" onChange={(e) => setAvailability(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Please Select</option>
                <option value="1">Available</option>
                <option value="0">Not available</option>
              </select>
            </div>
            <div className='form-group margin'>
              {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label> */}
              <button type='button' onClick={HandleFilter} className="min-150 text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <i className="fas fa-filter mr-2"></i> Filter
              </button>
            </div>
            <div className='form-group margin'>
              {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">&nbsp;</label> */}
              <button type='button' onClick={HandleReset} className="min-150 text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <i className="fas fa-filter mr-2"></i> Reset
              </button>
            </div>
          </form>


        <div key={remountComponent}>
          <PackageListing packages={packages} />
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
      </div>
      <FooterAdmin />
    </div>
  )
}
