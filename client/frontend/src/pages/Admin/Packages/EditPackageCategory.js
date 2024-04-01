import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Select from 'react-select';
import IndianCategory from '../../../components/Admin/Package/IndianCategory';
import ForeignCategory from '../../../components/Admin/Package/ForeignCategory';
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from 'axios';


export default function EditPackageCategory() {

  const params = useParams();
  const alert = useAlert();

  const [selected, setSelectedHotels] = useState(null);
  const [details, setDetails] = useState([]);
  const [cat_name, setCatName] = useState('');
  const [packageId, setPackageId] = useState();
  const [tempSelected, setTempSelected] = useState([]);

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

    axios.get(`${process.env.REACT_APP_BASE_URL}/package/package-categories/${params.id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      const slHotel = result.data.data.hotels.map((item) => (item.hotel_id));

      setTempSelected(slHotel);

      setCatName(result.data.data.category);
      setPackageId(result.data.data.package_id);
    })

  }

  useEffect(() => {
    GetDetails();
  }, []);


  //Get selected Hotel form Id
  useEffect(() => {

    let tem_hotel = [];

    if (tempSelected.length > 0) {

      details?.map((item) => {
        if (tempSelected.includes(item.value) === true) {
          tem_hotel.push({ value: item.value, label: item.label });
        }
      });

      setSelectedHotels(tem_hotel);
    }


  }, [details, tempSelected]);



  const HandleSubmit = () => {

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
      "package_id": packageId,
      "category": cat_name,
      "hotels": hotels,
      "indian": indian,
      "foreigner": foreigner
    }
   // console.log(sendData);
    axios.patch(`${process.env.REACT_APP_BASE_URL}/package/package-categories/${params.id}`, sendData, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      if (result.data.success === true) {
        alert.success("Category has been updated");
        localStorage.removeItem('IndianValues');
        localStorage.removeItem('ForeignerValues');
        setTimeout(() => {
          window.location.href = `/admin/package-categories/${packageId}`
        }, 1000);
      }
    })

  }


  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <Navbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
          <h1 className='text-2xl text-black font-bold mb-3'>Edit Package Category</h1>
          <form>
            <div className='form-group'>
              <label className='block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300'>Category name</label>
              <input type='text' value={cat_name} onChange={(e) => setCatName(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Category name' />
            </div>
            <div className='form-group'>
              <label className='block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300'>Select Hotels</label>
              {selected &&
                <Select
                  onChange={setSelectedHotels}
                  options={details}
                  isMulti
                  className='setReactSelect'
                  defaultValue={selected}
                />
              }

            </div>
            <IndianCategory action={'edit'} package_id={packageId} />
            <ForeignCategory action={'edit'} package_id={packageId} />
            <hr />
            <button type="button" onClick={HandleSubmit} className='text-white bg-success hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
              Update Details
            </button>
          </form>
        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}
