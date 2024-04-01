import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Select from 'react-select';
import IndianCategory from '../../../components/Admin/Package/IndianCategory';
import ForeignCategory from '../../../components/Admin/Package/ForeignCategory';
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from 'axios';
import swal from 'sweetalert';

export default function AddPackageCategory() {

  const params = useParams();
  const alert = useAlert();

  const [selected, setSelectedHotels] = useState(null);
  const [details, setDetails] = useState([]);
  const [cat_name, setCatName] = useState('');

  const GetDetails = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {

      const fhotel = result.data.data.map(item => ({ value: item._id, label: item.name }));

      setDetails(fhotel);
    })
  }

  useEffect(() => {
    GetDetails();
  }, []);



  const HandleSubmit = () => {

      if (localStorage.getItem('IndianValues') && localStorage.getItem('ForeignerValues')) {
        let indian = [];
        let foreigner = [];
        let hotels = [];

        const data1 = {
          indian:
          JSON.parse(localStorage.getItem('IndianValues')).map((item, index) => (
            indian.push({
              "room_price": parseInt([item.room_price]),
              "extra_ad_price": parseInt([item.extra_ad_price]),
              "extra_ch_price": parseInt([item.extra_ch_price]),
              "fes_room_price": parseInt([item.fes_room_price]),
              "fes_ad_price": parseInt([item.fes_ad_price]),
              "fes_ch_price": parseInt([item.fes_ch_price]),
              "safari_de_price": parseInt([item.safari_de_price]),
              "safari_we_price": parseInt([item.safari_we_price]),
              "safari_fes_price": parseInt([item.safari_fes_price])
            })
            ))
        }

        const data2 = {
          foreigner:
          JSON.parse(localStorage.getItem('ForeignerValues')).map((item, index) => (
            foreigner.push({
              "room_price": parseInt([item.room_price]),
              "extra_ad_price": parseInt([item.extra_ad_price]),
              "extra_ch_price": parseInt([item.extra_ch_price]),
              "fes_room_price": parseInt([item.fes_room_price]),
              "fes_ad_price": parseInt([item.fes_ad_price]),
              "fes_ch_price": parseInt([item.fes_ch_price]),
              "safari_de_price": parseInt([item.safari_de_price]),
              "safari_we_price": parseInt([item.safari_we_price]),
              "safari_fes_price": parseInt([item.safari_fes_price])
            })
            ))
        }

        selected.map(item => (
          hotels.push(item.value)
          ))

        const sendData = {
          "package_id": params.id,
          "status": 1,
          "category": cat_name,
          "hotels": hotels,
          "indian": indian,
          "foreigner": foreigner
        }


        axios.post(`${process.env.REACT_APP_BASE_URL}/package/package-categories`, sendData, {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + localStorage.getItem('tokenkey')
          },
        }).then(result => {
          if (result.data.success === true) {
            alert.success("Category has been created");
            localStorage.removeItem('IndianValues');
            localStorage.removeItem('ForeignerValues');
            setTimeout(() => {
              window.location.href = `/admin/package-categories/${params.id}`
            }, 1000);
          }else{
            console.log(result);
            if (!result.data.success) {
              if (result.data.error) {
                swal(result.data.error.message, "error");
              }else if (result.data.data.errors.category) {
                swal(result.data.data.errors.category[0], "error");
              }else{
                swal('Validation errors, please fill form carefully!', "error");
              }
            }else{

              swal(result.data.message, "error");
            }
          }
        })
      } else {
        alert.error("Category Name , Hotels and Category Options are required");
      }
  }



  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <Navbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
          <h1 className='text-2xl text-black font-bold mb-3'>Add Package Category</h1>
          <form>
            <div className='form-group'>
              <label className='block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300'>Category name</label>
              <input type='text' onChange={(e) => setCatName(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Category name' />
            </div>
            <div className='form-group'>
              <label className='block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300'>Select Hotels</label>
              <Select
                onChange={setSelectedHotels}
                options={details}
                isMulti
                className='setReactSelect'
                defaultValue={selected}
              />
            </div>
            <IndianCategory action={'add'} package_id={params.id} />
            <ForeignCategory action={'add'} package_id={params.id} />
            <hr />
            <button type="button" onClick={HandleSubmit} className='text-white bg-success hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
              Save Details
            </button>
          </form>
        </div>
      </div>
      <FooterAdmin />
    </div>
  )

}
