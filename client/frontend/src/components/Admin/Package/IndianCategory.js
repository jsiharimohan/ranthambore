import React, { useState, useEffect } from 'react'
import CategoryInputs from './CategoryInputs';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function IndianCategory({ action, package_id }) {

  const params = useParams();

  const [indian, setIndian] = useState([{
      key: Date.now(),
      room_price: "",
      extra_ad_price: "",
      extra_ch_price: "",
      fes_room_price: "",
      fes_ad_price: "",
      fes_ch_price: "",
      safari_de_price: "",
      safari_we_price: "",
      safari_fes_price: "",
  }]);

  let onChange = (i, e) => {
    let newusers = [...indian];
    newusers[i]['room_price']       = e.room_price       || 0;
    newusers[i]['extra_ad_price']   = e.extra_ad_price   || 0;
    newusers[i]['extra_ch_price']   = e.extra_ch_price   || 0;
    newusers[i]['fes_room_price']   = e.fes_room_price   || 0;
    newusers[i]['fes_ad_price']     = e.fes_ad_price     || 0;
    newusers[i]['fes_ch_price']     = e.fes_ch_price     || 0;
    newusers[i]['safari_de_price']  = e.safari_de_price  || 0;
    newusers[i]['safari_we_price']  = e.safari_we_price  || 0;
    newusers[i]['safari_fes_price'] = e.safari_fes_price || 0;
    setIndian(newusers);
    localStorage.setItem('IndianValues', JSON.stringify(indian));
  }

  let addFormFields = () => {
    setIndian([...indian, {

      key: Date.now(),
      price: "",
      extra_adult_price: "",
      extra_child_price: "",
      extra_bed_price: "",
      festival_price: "",
      festival_kid: "",
      safari_price: "",
    
    }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...indian];
    newFormValues.splice(i, 1);
    setIndian(newFormValues)
    localStorage.setItem('IndianValues', JSON.stringify(newFormValues));
  }

  function GetEditDetails() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/package/package-categories/${params.id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      setIndian(result.data.data.indianOptions);
      localStorage.setItem('IndianValues', JSON.stringify(result.data.data.indianOptions));
    })
  }

  useEffect(() => {
    action == 'edit' &&
      GetEditDetails();
  }, []);

  return (
    <div className='indianForm'>
      <h5 className='mt-8 text-black'>Category Options (For Indians)</h5> &nbsp;
      {/*<button type="button" onClick={() => addFormFields()} className='text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center mb-4'>Add Slot</button>*/}
      <div className='table-responsive'>
      <table className='table bg-white border border-slate-300 mt-2 indianCategory'>
        <thead>
          <tr>
            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Room price</th>
            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Extra bed AD</th>
            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Extra bed CH</th>
            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>F. R Price</th>
            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>F. A Price</th>
            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>F. C Price</th>
            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>S De Price</th>
            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>S We Price</th>
            <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>S Fe Price</th>
          </tr>
        </thead>
        <tbody>
          {indian && indian.map((user, index) => (
            <tr key={index}>
              <CategoryInputs
                key={index}
                value={user}
                type={'indian'}
                onChange={e => onChange(index, e)}
              />
             {/* <td className='border border-slate-300 text-center'>
                <button type="button" onClick={() => removeFormFields(index)} disabled={indian.length <= 1} className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
                  Remove
                </button>
          </td>*/}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
