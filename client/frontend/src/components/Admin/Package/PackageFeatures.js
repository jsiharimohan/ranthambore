import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';

export default function PackageFeatures({ packageId, features }) {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [formatFeatures, setFormatFeatures] = useState([]);


  const getFeaturesForPackage = async (packageId) => {

    try {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/${packageId}/features`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + localStorage.getItem('accessToken')
        },
      });


      if (result.data.data.features.length) {

        const fa = result.data.data.features.map(item => ({ value: item._id, label: item.feature }));

        setSelectedFeatures(fa);
      }


    } catch (err) {
      swal(err, "error");

    }

  }

  const getFormatFeatures = async (features) => {

    const fa = await features.map((item) => {
      return ({ value: item._id, label: item.feature });

    });

    setFormatFeatures(fa);
  }


  useEffect(() => {

    getFeaturesForPackage(packageId);


    getFormatFeatures(features);


  }, [packageId, features]);

  const updateStatus = () => {
    let featrs = [];

    selectedFeatures.forEach(item => {
      featrs.push({ feature: item.label });

    });

    const data = {
      features: featrs,

    }


    axios.patch(`${process.env.REACT_APP_BASE_URL}/package/packages/${packageId}/features`, data, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('user')
      },
    }).then(result => {

      if (result.data.success === true) {
        swal(result.data.message, "success");
        setTimeout(() => {
          window.location.href = `/admin/package-to-features/${packageId}`
        }, 1000);
      } else {
        swal("Error in Api", "error");
      }
    })

  }




  return (
    <>
    <div className='AmenityStatus'>
      <div className='status'>Package features</div>
      <div className='flex'>
        <div>
          <Select
            value={selectedFeatures}
            onChange={setSelectedFeatures}
            options={formatFeatures}
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