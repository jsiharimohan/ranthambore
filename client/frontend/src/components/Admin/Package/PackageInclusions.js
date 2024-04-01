import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';

export default function PackageInclusions({ packageId, inclusions }) {
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [formatInclusions, setFormatInclusions] = useState([]);


  const getInclusionsForPackage = async (packageId) => {

    try {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/${packageId}/inclusions`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + localStorage.getItem('accessToken')
        },
      });


      if (result.data.data.inclusions.length) {

        const fa = result.data.data.inclusions.map(item => ({ value: item._id, label: item.inclusion }));

        setSelectedInclusions(fa);
      }


    } catch (err) {
      swal(err, "error");

    }

  }

  const getFormatInclusions = async (inclusions) => {

    const fa = await inclusions.map((item) => {
      return ({ value: item._id, label: item.inclusion });

    });

    setFormatInclusions(fa);
  }


  useEffect(() => {

    getInclusionsForPackage(packageId);
    getFormatInclusions(inclusions);


  }, [packageId, inclusions]);

  const updateStatus = () => {
    let featrs = [];

    selectedInclusions.forEach(item => {
      featrs.push({ inclusion: item.label });

    });

    const data = {
      inclusions: featrs,

    }


    axios.patch(`${process.env.REACT_APP_BASE_URL}/package/packages/${packageId}/inclusions`, data, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {

      if (result.data.success === true) {
        swal(result.data.message, "success");
        setTimeout(() => {
          window.location.href = `/admin/package-to-inclusions/${packageId}`
        }, 1000);
      } else {
        swal("Error in Api", "error");
      }
    })

  }




  return (
    <>
    <div className='AmenityStatus'>
      <div className='status'>Package inclusions</div>
      <div className='flex'>
        <div>
          <Select
            value={selectedInclusions}
            onChange={setSelectedInclusions}
            options={formatInclusions}
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