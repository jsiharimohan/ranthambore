import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import PackageFeatures from '../../../components/Admin/Package/PackageFeatures';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import ReactPaginate from "react-paginate";



export default function PackageToFeatures() {
    const [features, setFeatures] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [mPackageFeatures, setMPackageFeatures] = useState([]);


    const params = useParams();
    let package_id = '';

    if (params.id) {
        package_id = params.id;
    }


    useEffect(() => {

        // Get assigned feature for a package
        const getMPackageFeatures = async () => {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/${package_id}/features`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            });


            if (result.data.data.features.length) {
                setMPackageFeatures(result.data.data.features);
            }
        }
        let limit = 10;

        const getAllFeatures = async () => {

            setLoading(true);

            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/features/?page=1&size=${limit}`);

                setFeatures(result.data.data);
                setpageCount(Math.ceil(result.data.total / result.data.perPage));
                //setPage(result.data.page);
                setLoading(false);

            } catch (err) {

                setLoading(false);
            }

        };

        if (package_id) {
            getMPackageFeatures();

        }

        getAllFeatures();

    }, []);


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

    const handleDelete = (feature_id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/package/features/${feature_id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            alert.success("Amenity is deleted");
            setTimeout(() => {
                window.location = '/admin/features';
            }, 1000);
        })
    }

    console.log("packagefeaturs", mPackageFeatures)


    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 PackageStyle">
                    <div className="grid grid-cols-2 gap-4">
                        <div className='mt-4'>
                            <h1 className='text-2xl text-black font-bold mb-3'> Package Feature </h1>
                        </div>
                        
                    </div>
                    {package_id && <PackageFeatures packageId={package_id} features={features} />}
                    <div className='table-responsive'>
                    <table className='table bg-white border border-slate-300 mt-4'>
                        <thead>
                            <tr>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Feature</th>
                                {/* <th className='border border-slate-300 text-left bg-hotel-maroon text-white'>Availability</th> */}
                                {!package_id && (<th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>)}
                            </tr>
                        </thead>
                        <tbody>

                            {mPackageFeatures?.map((item, index) => (
                                <tr key={index}>
                                    <td className='border border-slate-300 text-center'>{index + 1}</td>
                                    <td className='border border-slate-300 text-center'>{item.feature}</td>

                                    {/* <td className='border border-slate-300 text-center'>
                                        <label htmlFor={`default-toggle-${item.feature._id}`} className="inline-flex relative w-full cursor-pointer">
                                            <input type="checkbox" defaultChecked={item.feature.status} value={item.feature.status} id={`default-toggle-${item.feature._id}`} className="sr-only peer" />
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
