import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';



export default function EditHotel() {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilesObj, setSelectedFilesObj] = useState([]);
    const [homepage,sethomepage] = useState();
    const navigate = useNavigate();
    const params = useParams();
    const HSURL = process.env.REACT_APP_HOTEL_SERVER_URL;



    const [hotels, setHotels] = useState({
        name: '',
        price: '',
        rating: '',
        city: '',
        state: '',
        homepage: '',
        address: '',
        safari_distance: '',
        description: '',
        meta_title: '',
        meta_description: '',
        status: '',
        package_image: '',
        image: '',
        images: [],

    });

    useEffect(() => {

        const getHotels = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/${params.id}`);
            const result = res.data.data;

            console.log("infdo ", result);
            setHotels(result);
        }

        getHotels();

    }, []);


    const handleImageChange = (e) => {
        if (e.target.files) {
            setSelectedFilesObj(e.target.files);
            // setHotels(currentHotel => ({ ...currentHotel, images: hotels.images.concat(e.target.files) }))


            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            // setHotels(currentHotel => ({ ...currentHotel, images: images.concat(filesArray) }))

            setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };

    const handleImageDelete = async (id) => {



        try {

            const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/image/${id}`, {
                headers: {
                    'Authorization': `Bearer ` + localStorage.getItem('user')
                },
            });

            if (res.data.success === true) {

                setHotels(current => ({
                    ...current,
                    images: current.images.filter(gimage => {
                        return gimage._id !== id;
                    })

                })
                );

                swal("Image has been successfully deleted", "success");
            }

        } catch (err) {

            swal(err.response.data.message, "error");

        }
    }


    const renderPhotos = (source) => {
        return source.map((photo) => {
            return <img src={photo} alt="" key={photo} />;
        });
    };

    const handleChange = (e) => {
        setHotels(hotels => ({ ...hotels, [e.target.name]: e.target.value }));
    }

    const handleImage = (e) => {
        setHotels(hotels => ({ ...hotels, image: e.target.files[0] }));

    }

    const handlePackageImage = (e) => {
        setHotels(hotels => ({ ...hotels, package_image: e.target.files[0] }));

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", hotels.image);
        for (const key of Object.keys(selectedFilesObj)) {
            formData.append('images[' + key + ']', selectedFilesObj[key])
        }
        formData.append("package_image", hotels.package_image);
        formData.append("name", hotels.name);
        formData.append("price", hotels.price);
        formData.append("rating", hotels.rating);
        formData.append("city", hotels.city);
        formData.append("state", hotels.state);
        formData.append("address", hotels.address);
        formData.append("description", hotels.description);
        formData.append("status", hotels.status);
        formData.append("meta_title", hotels.meta_title);
        formData.append("homepage", hotels.homepage);
        formData.append("meta_description", hotels.meta_description);
        console.log("formdata", formData);


        try {

            const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/${params.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ` + localStorage.getItem('user')
                },
            });

            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                navigate('/admin/hotels');


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
                        <h1 className='text-2xl text-black font-bold mb-3'>Edit Hotel</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-3 gap-4 mt-2'>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Hotel name</label>
                                <input type="text" id="hotelName" name="name" onChange={handleChange} placeholder='Hotel name' defaultValue={hotels.name} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Price</label>
                                <input type="text" id="hotelPrice" onChange={handleChange} name="price" placeholder='₹' defaultValue={hotels.price} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Rating</label>
                                <select id="hotelRating" name="rating" onChange={handleChange} value={hotels.rating} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Please Select</option>
                                    <option value="3">3 star</option>
                                    <option value="4">4 star</option>
                                    <option value="5">5 star</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">Location</label>
                                <input type="text" id="location" name="city" onChange={handleChange} defaultValue={hotels.city} placeholder='Location' className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">State</label>
                                <select id="hotelState" name="state" onChange={handleChange} value={hotels.state} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                                <select id="hotelAvail" name="status" onChange={handleChange} value={hotels.status} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Please Select</option>
                                    <option value="1">Available</option>
                                    <option value="0">Not available</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 ">homepage</label>
                                <select id="homepage" name="homepage" onChange={handleChange} value={hotels.homepage} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Please Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                        <div className='mb-3 mt-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">Address</label>
                            <textarea id="address" name="address" rows="3" onChange={handleChange} defaultValue={hotels.address} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address"></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">About Hotel</label>
                            <textarea id="aboutHotel" name="description" rows="3" onChange={handleChange} defaultValue={hotels.description} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="About Hotel"></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">Meta title</label>
                            <input type="text" id="hotelMeta" name="meta_title" onChange={handleChange} placeholder='Meta Title' defaultValue={hotels.meta_title} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">Meta description</label>
                            <textarea id="hotelMetaDescription" onChange={handleChange} name="meta_description" rows="2" defaultValue={hotels.meta_description} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Meta description"></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 ">Safari distance</label>
                            <textarea id="safariDistance" name="safari_distance" defaultValue={hotels.safari_distance && hotels.safari_distance} onChange={handleChange} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Safari distance"></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 " htmlFor="file_input">Upload Thumbnail</label>
                            <input onChange={handleImage} className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

                            {(typeof hotels.image === 'string') && hotels.image && <img src={(`${HSURL}/${hotels.image}`)} alt="" width="300px" />}


                        </div>

                        <div className='mb-3'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 " htmlFor="file_input">Upload Cover Image</label>
                            <input onChange={handlePackageImage} className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                            {(typeof hotels.package_image === 'string') && hotels.package_image && <img src={(`${HSURL}/${hotels.package_image}`)} alt="" width="300px" />}

                        </div>
                        <div className='mb-3 multiImages'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 " htmlFor="file_input">Upload Hotel Images</label>
                            <div className="result">
                                {hotels.images &&
                                    hotels.images?.map((im, i) => (
                                        <div key={i}>
                                            <img src={(`${HSURL}/${im.image}`)} alt={i} width="300px" />
                                            <span><button onClick={(e) => handleImageDelete(im._id)} type="button" className="text-white bg-hotel-maroon rounded  sm:w-auto px-1.5 py-0.5 text-center">x</button>
                                            </span>
                                        </div>
                                    ))
                                }
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


                        </div>
                        <div className='flex'>
                            <button type="submit" className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                            <Link to='/admin/hotels' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>
                    </form>
                </div >
            </div >
            <FooterAdmin />
        </div >
    )
}
