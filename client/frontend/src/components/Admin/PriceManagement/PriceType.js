import React , { useState , useEffect } from 'react'
import DateRange from './DatePicker'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import * as moment from 'moment'
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router-dom';

export default function PriceType({ id , type , action }) {

  const [name , setName] = useState('');
  const [price , setPrice] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [personType , setPersonType] = useState();
  const [vehicleType , setVehicleType] = useState();
  const [selectType , setSelectType] = useState(type);
  const alert = useAlert();

  const navigate = useNavigate();


  function getDetails(type) {
    const typeData = type == 'chambal' ? 'chambal' : 'safari';

    axios.get(`${process.env.REACT_APP_BASE_URL}/${typeData}/prices/${id}?type=${type}`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+localStorage.getItem('accessToken')
          },
        }).then(result => { 
            setName(result.data.data.name);
            setPrice(result.data.data.price);
            setPersonType(result.data.data.person_type);
            setVehicleType(result.data.data.vehicle_type);
        })   
  }

  useEffect(() => {
    id  != 'add' && getDetails(type);
  },[]);

  const HandleUpdate = () => {
   
    const Safaridata  = {
        "name" : name,
        "price" : price,
        "type" : type,
        "person_type": personType,
        "vehicle_type": vehicleType
    }

    const chambalData = {
      "name" : name,
      "price" : price,
      "person_type": personType,
      "vehicle_type": vehicleType
    }

    const data = type == 'chambal' ? chambalData : Safaridata;

    const typeData = type == 'chambal' ? 'chambal' : 'safari';

    id == 'add'   ?

    axios.post(`${process.env.REACT_APP_BASE_URL}/${typeData}/prices`, data , {
        headers: {
          'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+localStorage.getItem('accessToken')
          },
        }).then(result => { 
             if(result.data.success === true) {
                 alert.success(result.data.message);
                 setTimeout(() => {
                        window.location.href = `/admin/price-list/${type}`
                 }, 1000);
             } else {
                alert.error("Api Error"); 
             }
        }) 
    : 
    axios.patch(`${process.env.REACT_APP_BASE_URL}/${typeData}/prices/${id}`, data , {
        headers: {
          'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+localStorage.getItem('accessToken')
          },
        }).then(result => { 
             if(result.data.success === true) {
                 alert.success(result.data.message);
                 setTimeout(() => {
                        window.location.href = `/admin/price-list/${type}`
                 }, 1000);
             } else {
                alert.error("Api Error"); 
             }
        }) 
    } 

    const HandleWeekendUpdate = () => {

        const data  = {
            "name" : name,
            "price" : price,
            "type" : type,
            "date_from": moment(startDate).format("YYYY-MM-DD"),
            "date_to" :  moment(endDate).format("YYYY-MM-DD"),
            "person_type": personType,
            "vehicle_type": vehicleType   
       }
    
        id == 'add'   ?
    
        axios.post(`${process.env.REACT_APP_BASE_URL}/safari/prices`, data , {
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
              },
            }).then(result => { 
                 if(result.data.success === true) {
                     alert.success(result.data.message);
                     setTimeout(() => {
                            window.location.href = `/admin/price-list/${type}`
                     }, 1000);
                 } else {
                    alert.error("Api Error"); 
                 }
            }) 
        : 
        axios.patch(`${process.env.REACT_APP_BASE_URL}/safari/prices/${id}`, data , {
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
              },
            }).then(result => { 
                 if(result.data.success === true) {
                     alert.success(result.data.message);
                     setTimeout(() => {
                            window.location.href = `/admin/price-list/${type}`
                     }, 1000);
                 } else {
                    alert.error("Api Error"); 
                 }
            }) 
        } 

  return (
    <>
    { 
      type == 'festival' ?
        <>
            <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Start Date</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} minDate={moment().toDate()}/>
            </div>
            <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Start Date</label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} minDate={moment().toDate()}/>
            </div>
            <div className="tab-content" id="tabs-tabContent">
                <div className="tab-pane fade show active" id="tabs-indian" role="tabpanel" aria-labelledby="tabs-indian-tab">
                    <div className="pricesColumns">
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-900 ">Name</label>
                        <input type="text" id="name" readOnly={(type === 'chambal') ? true : false }  value = {name} onChange = {(e) => setName(e.target.value)}  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-900 ">Price</label>
                        <input type="number" id="price" value = {price} onChange = {(e) => setPrice(e.target.value)}  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                    </div>
                    <div className="mb-6" style={{display: (type === 'chambal') ? 'none' : 'block' }}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Person Type</label>
                      <select id="personType" value ={personType} onChange = { (e) => setPersonType(e.target.value)} className="max193 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option>Please select</option>
                        <option value="Indian">Indian</option>
                        <option value="Foreigner">Foreigner</option>
                    </select>
                    </div>

                    <div className="mb-6" style={{display: (type === 'chambal') ? 'none' : 'block' }}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Vehicle Type</label>
                      <select id="vehicleType" value = {vehicleType} onChange = { (e) => setVehicleType(e.target.value)} className="max193 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option>Please select</option>
                        <option value="Gypsy">Gypsy</option>
                        <option value="Canter">Canter</option>
                    </select>
                    </div>

                        <div className='flex'>
                            <button ype="button" onClick = {HandleWeekendUpdate} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 ml-2 text-center">Submit</button>
                            <Link to='/admin/chambal-dates' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>

                    </div>
                </div>
              </div>  
        </>
        :
         <div className="tab-pane fade show active" id="tabs-indian" role="tabpanel" aria-labelledby="tabs-indian-tab">
            <div className="pricesColumns">

            <div className="mb-6 max193">
                <label className="block mb-2 text-sm font-bold text-gray-900 ">Name</label>
                <input type="text" id="name" readOnly={(type === 'chambal') ? true : false } value = {name} onChange = {(e) => setName(e.target.value)}  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
            </div>
 
            <div className="mb-6 max193">
                <label className="block mb-2 text-sm font-bold text-gray-900 ">Price</label>
                <input type="number" id="price" value = {price} onChange = {(e) => setPrice(e.target.value)}  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
            </div>

                  <div className="mb-6" style={{display: (type === 'chambal') ? 'none' : 'block' }}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Person Type</label>
                      <select id="personType" value ={personType} onChange = { (e) => setPersonType(e.target.value)} className="max193 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option>Please select</option>
                        <option value="Indian">Indian</option>
                        <option value="Foreigner">Foreigner</option>
                    </select>
                    </div>

                    <div className="mb-6" style={{display: (type === 'chambal') ? 'none' : 'block' }}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Vehicle Type</label>
                      <select id="vehicleType" value = {vehicleType} onChange = { (e) => setVehicleType(e.target.value)} className="max193 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option>Please select</option>
                        <option value="Gypsy">Gypsy</option>
                        <option value="Canter">Canter</option>
                    </select>
                    </div>

            <div className='flex'>
                <button ype="button" onClick = {HandleUpdate} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 ml-2 text-center">Submit</button>
                <Link onClick={() => navigate(-1)} className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
            </div>

            </div>
        </div>
    }     
    </>
  )
}
