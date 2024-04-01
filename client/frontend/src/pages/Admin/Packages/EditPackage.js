import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';


export default function EditPackage() {
    const navigate = useNavigate();
    const params = useParams();
    const PSURL = process.env.REACT_APP_PACKAGE_SERVER_URL;



    const [packages, setPackages] = useState({
        name: '',
        price: '',
        rating: '',
        description: '',
        meta_title: '',
        meta_description: '',
        availability: '',
        homepage:'',
        image: '',

    });

    const handleChange = (e) => {
        setPackages(packages => ({ ...packages, [e.target.name]: e.target.value }));
    }

    const handleImage = (e) => {
        setPackages(packages => ({ ...packages, image: e.target.files[0] }));

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", packages.image);

        formData.append("name", packages.name);
        formData.append("price", packages.price ?? 0);
        formData.append("rating", packages.rating);
        formData.append("description", packages.description);
        formData.append("availability", packages.availability);
        formData.append("homepage", packages.homepage);
        formData.append("meta_title", packages.meta_title);
        formData.append("meta_description", packages.meta_description);
        console.log("formdata", formData);


        try {

            const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/package/packages/${params.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            });

            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                navigate('/admin/packages');


            }


        } catch (err) {
            if (!err.response.data.success) {
                if (err.response.data.error) {
                    swal(err.response.data.error.message, "error");
                }else if (err.response.data.data.errors.name) {
                    swal(err.response.data.data.errors.name[0], "error");
                }else if (err.response.data.data.errors.price) {
                    swal(err.response.data.data.errors.price[0], "error");
                }else if (err.response.data.data.errors.rating) {
                    swal(err.response.data.data.errors.rating[0], "error");
                }else{
                    swal('Validation errors, please fill form carefully!', "error");
                }
            }else{

                swal(err.response.data.message, "error");
            }
        }
    }

    useEffect(() => {

        const getPackage = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/${params.id}`);
            const result = res.data.data;

            console.log("infdo ", result);
            setPackages(result);
        }

        getPackage();

    }, []);
    
    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 formstyle">
                    <div className='mt-4'>
                        <h1 className='text-2xl text-black font-bold mb-3'>Edit Package</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-4 gap-4 mt-2'>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Package name</label>
                                <input type="text" value={packages.name} name="name" onChange={handleChange} id="packageName" placeholder='Package name' className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Price</label>
                                <input type="text" value={packages.price} name="price" onChange={handleChange} id="packagePrice" placeholder='₹' className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Rating</label>
                                <select value={packages.rating} name="rating" onChange={handleChange} id="packageRating" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Please Select</option>
                                    <option value="3">3 star</option>
                                    <option value="4">4 star</option>
                                    <option value="5">5 star</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Availability</label>
                                <select value={packages.availability} name="availability" onChange={handleChange} id="packageAvail" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Please Select</option>
                                    <option value="1">Available</option>
                                    <option value="0">Not available</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Homepage</label>
                                <select value={packages.homepage} name="homepage" onChange={handleChange} id="homepage" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Please Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                        <div className='mb-3 mt-2'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">About Package</label>
                            <textarea defaultValue={packages.description} name="description" onChange={handleChange} id="aboutPackage" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="About Hotel"></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">Meta title</label>
                            <input value={packages.meta_title} name="meta_title" onChange={handleChange} type="text" id="PackageMeta" placeholder='Meta Title' className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">Meta description</label>
                            <textarea defaultValue={packages.meta_description} name="meta_description" onChange={handleChange} id="PackageMetaDescription" rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Meta description"></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 " htmlFor="file_input">Upload Image</label>
                            <input name="image" onChange={handleImage} className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                            {(typeof packages.image === 'string') && packages.image && <img src={(`${PSURL}/${packages.image}`)} alt="" width="300px" />}

                        </div>
                        <div className='flex'>
                            <button type="submit" className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                            <Link to='/admin/packages' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}