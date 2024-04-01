import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import PackageInclusions from '../../../components/Admin/Package/PackageInclusions';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import ReactPaginate from "react-paginate";



export default function PackageToInclusions() {
    const [inclusions, setInclusions] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [mPackageInclusions, setMPackageInclusions] = useState([]);


    const params = useParams();
    const package_id = params.id;



    useEffect(() => {

        // Get assigned inclusion for a package
        const getMPackageInclusions = async () => {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/${package_id}/inclusions`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            });


            if (result.data.data.inclusions.length) {
                setMPackageInclusions(result.data.data.inclusions);

            }
        }
        let limit = 100;

        const getAllInclusions = async () => {

            setLoading(true);

            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/inclusions/?page=1&size=${limit}`);

                setInclusions(result.data.data);
                setpageCount(Math.ceil(result.data.total / result.data.perPage));
                //setPage(result.data.page);
                setLoading(false);

            } catch (err) {

                setLoading(false);
            }

        };

        getMPackageInclusions();
        getAllInclusions();

    }, []);


    const handlePageClick = async (data) => {
        setLoading(true);

        try {

            let currentPage = data.selected + 1;
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/inclusions/?page=${currentPage}`);
            setInclusions(result.data.data);

            setpageCount(Math.ceil(result.data.total / result.data.perPage));
            //setPage(result.data.page);
            setLoading(false);

        } catch (err) {

            setLoading(false);

        }
    };

    const handleDelete = (inclusion_id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/package/inclusions/${inclusion_id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            alert.success("Amenity is deleted");
            setTimeout(() => {
                window.location = '/admin/inclusions';
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
                            <h1 className='text-2xl text-black font-bold mb-3'> Package Inclusion </h1>
                        </div>
                        <div className='mt-4'>
                            <Link to='/admin/add-package-inclusion' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add Inclusion</Link>
                        </div>
                    </div>
                    {package_id && <PackageInclusions packageId={package_id} inclusions={inclusions} />}
                    <div className='table-responsive'>
                    <table className='table bg-white border border-slate-300 mt-4'>
                        <thead>
                            <tr>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>ID</th>
                                <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Inclusion</th>
                                {/* <th className='border border-slate-300 text-left bg-hotel-maroon text-white'>Availability</th> */}
                                {!package_id && (<th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>)}
                            </tr>
                        </thead>
                        <tbody>

                            {mPackageInclusions?.map((item, index) => (
                                <tr key={index}>
                                    <td className='border border-slate-300 text-center'>{index + 1}</td>
                                    <td className='border border-slate-300 text-center'>{item.inclusion}</td>

                                    {/* <td className='border border-slate-300 text-center'>
                                        <label htmlFor={`default-toggle-${item.inclusion._id}`} className="inline-flex relative w-full cursor-pointer">
                                            <input type="checkbox" defaultChecked={item.inclusion.status} value={item.inclusion.status} id={`default-toggle-${item.inclusion._id}`} className="sr-only peer" />
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
