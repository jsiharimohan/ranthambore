import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';

export default function PackageExclusions({ packageId, exclusions }) {
  const [selectedExclusions, setSelectedExclusions] = useState([]);
  const [formatExclusions, setFormatExclusions] = useState([]);


  const getExclusionsForPackage = async (packageId) => {

    try {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/${packageId}/exclusions`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + localStorage.getItem('accessToken')
        },
      });


      if (result.data.data.exclusions.length) {

        const fa = result.data.data.exclusions.map(item => ({ value: item._id, label: item.exclusion }));

        setSelectedExclusions(fa);
      }


    } catch (err) {
      swal(err, "error");

    }

  }

  const getFormatExclusions = async (exclusions) => {

    const fa = await exclusions.map((item) => {
      return ({ value: item._id, label: item.exclusion });

    });

    setFormatExclusions(fa);
  }


  useEffect(() => {

    getExclusionsForPackage(packageId);
    getFormatExclusions(exclusions);


  }, [packageId, exclusions]);

  const updateStatus = () => {
    let featrs = [];

    selectedExclusions.forEach(item => {
      featrs.push({ exclusion: item.label });

    });

    const data = {
      exclusions: featrs,

    }


    axios.patch(`${process.env.REACT_APP_BASE_URL}/package/packages/${packageId}/exclusions`, data, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {

      if (result.data.success === true) {
        swal(result.data.message, "success");
        setTimeout(() => {
          window.location.href = `/admin/package-to-exclusions/${packageId}`
        }, 1000);
      } else {
        swal("Error in Api", "error");
      }
    })

  }




  return (
    <>
    <div className='AmenityStatus'>
      <div className='status'>Package exclusions</div>
      <div className='flex'>
        <div>
          <Select
            value={selectedExclusions}
            onChange={setSelectedExclusions}
            options={formatExclusions}
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