import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import PackageAssets from '../../../components/Admin/Package/PackageAssets';
import ReactPaginate from "react-paginate";
import axios from "axios";
import swal from 'sweetalert';

export default function PackageFeatures() {

  const [features, setFeatures] = useState('');
  const [pageCount, setpageCount] = useState(0);
  const [loading, setLoading] = useState(false);



  const getFeatures = async () => {

    try {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/features/`);

      setFeatures(result.data.data);
      //setLoading(false);

    } catch (err) {
      swal(err, "error");


    }
  };


  useEffect(() => {
    getFeatures();

  }, []);




  const deleteFeature = (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/package/features/${id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      swal("Feature is deleted");
      setTimeout(() => {
        window.location = '/admin/package-features';
      }, 1000);
    })
  }


  const handlePageClick = async (data) => {
    setLoading(true);

    try {

      let currentPage = data.selected + 1;
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/features/?page=${currentPage}`);
      setFeatures(result.data.data);

      setpageCount(Math.ceil(result.data.total / result.data.perPage));
      // setPage(result.data.page);
      setLoading(false);

    } catch (err) {

      setLoading(false);

    }
  };

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <AdminNavbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 hotel">
          <div className="grid grid-cols-2 gap-4">
            <div className='mt-4'>
              <h1 className='text-2xl text-black font-bold mb-3'>Features</h1>
            </div>
            <div className='mt-4'>
              <Link to='/admin/add-package-assets' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add</Link>
            </div>
          </div>
          <PackageAssets data={features} handleDelete={deleteFeature} type='feature' />
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
