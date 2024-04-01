import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import PackageExclusions from '../../../components/Admin/Package/PackageExclusions';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import ReactPaginate from "react-paginate";



export default function PackageToExclusions() {
    const [exclusions, setExclusions] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [mPackageExclusions, setMPackageExclusions] = useState([]);


    const params = useParams();
    const package_id = params.id;



    useEffect(() => {

        // Get assigned exclusion for a package
        const getMPackageExclusions = async () => {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/${package_id}/exclusions`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            });


            if (result.data.data.exclusions.length) {
                setMPackageExclusions(result.data.data.exclusions);

            }
        }
        let limit = 100;

        const getAllExclusions = async () => {

            setLoading(true);

            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/exclusions/?page=1&size=${limit}`);

                setExclusions(result.data.data);
                setpageCount(Math.ceil(result.data.total / result.data.perPage));
                //setPage(result.data.page);
                setLoading(false);

            } catch (err) {

                setLoading(false);
            }

        };

        getMPackageExclusions();
        getAllExclusions();

    }, []);


    const handlePageClick = async (data) => {
        setLoading(true);

        try {

            let currentPage = data.selected + 1;
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/exclusions/?page=${currentPage}`);
            setExclusions(result.data.data);

            setpageCount(Math.ceil(result.data.total / result.data.perPage));
            //setPage(result.data.page);
            setLoading(false);

        } catch (err) {

            setLoading(false);

        }
    };

    const handleDelete = (exclusion_id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/package/exclusions/${exclusion_id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            alert.success("Amenity is deleted");
            setTimeout(() => {
                window.location = '/admin/exclusions';
            }, 1000);
        })
    }


    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
                    <div className="grid grid-cols-2 gap-4">
                        <div className='mt-4'>
                            <h1 className='text-2xl text-black font-bold mb-3'> Package Exclusion </h1>
                        </div>
                        <div className='mt-4'>
                            <Link to='/admin/add-package-exclusion' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add Exclusion</Link>
                        </div>
                    </div>
                    {package_id && <PackageExclusions packageId={package_id} exclusions={exclusions} />}
                    <div className='table-responsive'>
                    <table className='table bg-white border border-slate-300 mt-4'>
                        <thead>
                            <tr>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Exclusion</th>
                                {/* <th className='border border-slate-300 text-left bg-hotel-maroon text-white'>Availability</th> */}
                                {!package_id && (<th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>)}
                            </tr>
                        </thead>
                        <tbody>

                            {mPackageExclusions?.map((item, index) => (
                                <tr key={index}>
                                    <td className='border border-slate-300 text-center'>{index + 1}</td>
                                    <td className='border border-slate-300 text-center'>{item.exclusion}</td>

                                    {/* <td className='border border-slate-300 text-center'>
                                        <label htmlFor={`default-toggle-${item.exclusion._id}`} className="inline-flex relative w-full cursor-pointer">
                                            <input type="checkbox" defaultChecked={item.exclusion.status} value={item.exclusion.status} id={`default-toggle-${item.exclusion._id}`} className="sr-only peer" />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Available</span>
                                        </label>
                                    </td> */}

                                </tr>

                            ))}



                            {loading &&
                                <tr>
                                    <td className='border border-slate-300 text-center' col-span="5">loading..</td>
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
