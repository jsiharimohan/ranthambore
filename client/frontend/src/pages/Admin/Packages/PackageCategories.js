import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from 'axios';
import ReactPaginate from "react-paginate";


export default function PackageCategories() {

    const params = useParams();
    const alert = useAlert();

    const [categories, setCategories] = useState([]);
    const [packages, setPackageName] = useState();
    const [pageCount, setpageCount] = useState(0);
    const [page, setPage] = useState(1);

    function GetDetails() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/${params.id}/categories`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setCategories(result.data.data);
            setpageCount(Math.ceil(result.data.total / result.data.perPage));
            setPage(result.data.page);
        })


        axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/${params.id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setPackageName(result.data.data.name);
        })

    }

    useEffect(() => {
        localStorage.removeItem('IndianValues');
        localStorage.removeItem('ForeignerValues');
        GetDetails();
    }, [])

    const HandleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/package/package-categories/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('tokenkey')
            },
        }).then(result => {
            alert.success("Deleted");
            setTimeout(() => {
                window.location.href = `/admin/package-categories/${params.id}`;
            }, 1000);
        })
    }


    const paginationData = async (currentPage) => {
        const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/package/packages/${params.id}/categories?page=${currentPage}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }
        );
        const data = await res.json();

        return data
    };

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        const result = await paginationData(currentPage);
        setCategories(result.data);
    };




    return (

        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 Package-Categories
">
                    <div className="grid grid-cols-2 gap-4">
                        <div className='mt-4'>
                            <h1 className='text-2xl text-black font-bold mb-3'>Package Categories</h1>
                        </div>
                        <div className='mt-4'>
                            <Link to={`/admin/add-package-category/${params.id}`} type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add</Link>
                        </div>
                    </div>
                    <h3 className='text-lg bg-danger text-white p-2 mt-2'>{packages}</h3>
                    <div className='table-responsive'>
                    <table className='table bg-white border border-slate-300 mt-4'>
                        <thead>
                            <tr>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Category</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Availability</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories && categories.map((item, index) => (
                                <tr key={index}>
                                    <td className='border border-slate-300 text-center'>{index + 1}</td>
                                    <td className='border border-slate-300 text-center'>{item.category}</td>
                                    <td className='border border-slate-300 text-center'>{item.status == 1 ? 'Available' : 'NA'}</td>
                                    <td className='border border-slate-300 text-center'>
                                        <Link to={`/admin/edit-package-category/${item._id}`} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                            <i className="fas fa-pencil"></i>
                                        </Link>
                                        <Link onClick={() => HandleDelete(item._id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
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
            <FooterAdmin />
        </div>
    )
}
