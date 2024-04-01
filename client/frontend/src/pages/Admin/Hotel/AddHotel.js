import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import swal from 'sweetalert';
import axios from 'axios';


export default function AddHotel() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilesObj, setSelectedFilesObj] = useState([]);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        if (e.target.files) {
            setSelectedFilesObj(e.target.files);
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };

    const renderPhotos = (source) => {
        return source.map((photo) => {
            return <img src={photo} alt="" key={photo} />;
        });
    };

    const HandleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const HandlepackageImage = (e) => {
        setPackageImage(e.target.files[0]);
    }

    const [image, setImage] = useState('');
    const [package_image, setPackageImage] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [homepage,setHomepage] = useState(''); 
    const [meta_title, setMetaTitle] = useState('');
    const [meta_description, setMetaDescription] = useState('');

    const HandleSaveData = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        for (const key of Object.keys(selectedFilesObj)) {
            formData.append('images[' + key + ']', selectedFilesObj[key])
        }
        formData.append("package_image", package_image);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("rating", rating);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("homepage", homepage);
        formData.append("meta_title", meta_title);
        formData.append("meta_description", meta_description);

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/hotel/hotels`, formData);

            console.log('res',res);

            if (res.data.success === true) {
                swal("Hotel is added successfully", "success");
                navigate('/admin/hotels');


            } else {
                swal("Something went wrong", "error");

            }

        } catch (err) {
            if (!err.response.data.success) {
                if (err.response.data.error) {
                    swal(err.response.data.error.message, "error");
                }else if (err.response.data.data.errors && err.response.data.data.errors.name) {
                    swal(err.response.data.data.errors.name[0], "error");
                }else if (err.response.data.data.errors && err.response.data.data.errors.price) {
                    swal(err.response.data.data.errors.price[0], "error");
                }else if (err.response.data.data.errors && err.response.data.data.errors.rating) {
                    swal(err.response.data.data.errors.rating[0], "error");
                }else{
                    swal('Validation errors, please fill form carefully!', "error");
                }
            }else{

            swal(err.response.data.data.message, "error");
        }
    }
    }


    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 formstyle">
                    <div className='mt-4'>
                        <h1 className='text-2xl text-black font-bold mb-3'>Add Hotel</h1>
                    </div>
                    <form>
                        <div className='grid grid-cols-3 gap-4 mt-2'>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Hotel name</label>
                                <input type="text" id="hotelName" onChange={(e) => setName(e.target.value)} placeholder='Hotel name' className=" border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Price</label>
                                <input type="text" id="hotelPrice" onChange={(e) => setPrice(e.target.value)} placeholder='₹' className=" border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Rating</label>
                                <select id="hotelRating" onChange={(e) => setRating(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" >Please Select</option>
                                    <option value="3">3 Star</option>
                                    <option value="4">4 Star</option>
                                    <option value="5">5 Star</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Location</label>
                                <input type="text" id="location" onChange={(e) => setCity(e.target.value)} placeholder='Location' className=" border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">State</label>
                                <select id="hotelState" onChange={(e) => setState(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option disabled>Please Select State</option>
                                    <option value="Andaman &amp; Nicobar Islands">Andaman &amp; Nicobar Islands</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Chattisgarh">Chattisgarh</option>
                                    <option value="Dadra &amp; Nagar Haveli">Dadra &amp; Nagar Haveli</option>
                                    <option value="Daman &amp; Diu">Daman &amp; Diu</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jammu &amp; Kashmir">Jammu &amp; Kashmir</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Poducherry">Poducherry</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Availability</label>
                                <select id="hotelAvail" onChange={(e) => setStatus(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" >Please Select</option>
                                    <option value="1">Available</option>
                                    <option value="0">Not available</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Homepage</label>
                                <select id="homepage" name="homepage" onChange={(e) => setHomepage(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" >Please Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                        <div className='mb-3 mt-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">Address</label>
                            <textarea id="address" rows="3" onChange={(e) => setAddress(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address"></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">About Hotel</label>
                            <textarea id="aboutHotel" rows="3" onChange={(e) => setDescription(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="About Hotel"></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">Meta title</label>
                            <input type="text" id="hotelMeta" onChange={(e) => setMetaTitle(e.target.value)} placeholder='Meta Title' className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">Meta description</label>
                            <textarea id="hotelMetaDescription" onChange={(e) => setMetaDescription(e.target.value)} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Meta description"></textarea>
                        </div>
                        {/* <div className='mb-3'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Safari distance</label>
                    <textarea id="safariDistance" rows="2" onChange = {(e) => setName(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Safari distance"></textarea>
                    </div> 
                */}
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 " htmlFor="file_input">Upload Thumbnail</label>
                            <input onChange={HandleImage} className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 " htmlFor="file_input">Upload Cover Image</label>
                            <input onChange={HandlepackageImage} className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                        </div>
                        <div className='mb-3 multiImages'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 " htmlFor="file_input">Upload Hotel Images</label>
                            <input type="file" id="file" multiple onChange={handleImageChange} />
                            <div className="label-holder">
                                <label htmlFor="file" className="label">
                                    <i className="material-icons">Upload Hotel Images</i>
                                </label>
                            </div>
                            <div className="result">{renderPhotos(selectedFiles)}</div>
                        </div>
                        <div className='flex'>
                            <button type="button" onClick={HandleSaveData} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                            <Link to='/admin/hotels' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
