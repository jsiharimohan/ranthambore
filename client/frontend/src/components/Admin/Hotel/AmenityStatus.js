import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';

export default function AmenityStatus({ hotelId, amenities }) {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [formatAmenities, setFormatAmenities] = useState([]);


  const getHotelAmenities = async (hotelId) => {

    try {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/${hotelId}/amenities`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + localStorage.getItem('accessToken')
        },
      });


      if (result.data.data.length) {

        const fa = result.data.data.map(item => ({ value: item.amenity._id, label: item.amenity.amenity }));

        setSelectedAmenities(fa);
      }


    } catch (err) {
      swal(err, "error");

    }

  }

  const getAllAmenities = async (amenities) => {

    const fa = await amenities.map((item) => {
      return ({ value: item._id, label: item.amenity });

    });

    setFormatAmenities(fa);
  }


  useEffect(() => {

    getAllAmenities(amenities);
    getHotelAmenities(hotelId);


  }, [hotelId, amenities]);

  const updateStatus = () => {
    const amenities = [];

    const data = {
      amenities:
        selectedAmenities.map(item => (
          item.value
        ))
    }


    axios.patch(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/${hotelId}/amenities`, data, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('user')
      },
    }).then(result => {

      if (result.data.success === true) {
        swal(result.data.message, "success");
        setTimeout(() => {
          window.location.href = `/admin/hotel-amenities/${hotelId}`
        }, 1000);
      } else {
        swal("Error in Api", "error");
      }
    })

  }




  return (
    <>
    <div className='AmenityStatus'>
      <div className='status'>AmenityStatus</div>
      <div className='flex'>
        <div>
          <Select
            value={selectedAmenities}
            onChange={setSelectedAmenities}
            options={formatAmenities}
            isMulti
            className='setReactSelect'
          />
        </div>
        <div><button type="button" onClick={updateStatus} className="text-white float-right bg-danger font-medium rounded px-5 py-2.5 text-center">Update</button></div>
      </div>
      </div>
    </>
  )
}