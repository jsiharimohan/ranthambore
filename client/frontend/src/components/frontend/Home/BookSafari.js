import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

export default function BookSafari({ zones , timings , vehicles, bookingDate  , date }) {

    const [ name , setName ] =  useState('');
    const [ phone , setPhone ] =  useState('');
    const [ zone , setZone ] =  useState('');
    const [ vehicle , setVehicle ] =  useState('');
    const [ timing , setTiming ] =  useState('');


    const handleChange = (e) => {

        setPhone(e.target.value);

        const data = {
            "name": name,
            "mobile": e.target.value
        }

        if (e.target.value.length >= 10) {

            axios.post(`${process.env.REACT_APP_BASE_URL}/admin/enquiries/save-enquery`, data).then(res => {
                if (res.status === 200) {
                } else {
                }
            }).catch(error => {
                swal("Warning", error, "warning");
            })
        }
    }

    const HandleSubmit = () => {

        const data = {
            "date": date,
            "timing": timing,
            "vehicle": vehicle,
            "zone": zone
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/safari/checkAvilability`, data).then(res => {
          if (res.status === 200) {
                localStorage.setItem('selName', name);
                localStorage.setItem('selPhone', phone);
                localStorage.setItem('selDate', date);
                localStorage.setItem('selTiming', timing);
                localStorage.setItem('selVehicle', vehicle);
                localStorage.setItem('selZone', zone);
                localStorage.setItem('selAvailable', res.data.data.availability);
                window.location.href = '/safari-booking-details';
          } else {
              localStorage.removeItem('userData');
              swal("Warning", res.data.error.message, "warning");
          }
      }).catch(error => {
            swal("Warning", error, "warning");
      })
    }

    console.log("Details", zones);

  return (
    <>
        <h4>Please choose the date first then enter the details here</h4>
        <form className="form ng-untouched ng-pristine ng-valid" id="form_date" noValidate="">
            <div className="row">
            <div className="col-sm-12 col-xs-12">
                <div className="input-group inputdesign">
                <span className="input-group-btn">
                    <img alt="user" src="../image/icons/usericon.png" />
                </span>
                <input className="form-control" id="name1" onChange = {(e) => setName(e.target.value)} placeholder="Enter your name" type="name" />
                </div>
            </div>
            <div className="col-sm-12 col-xs-12">
                <div className="input-group inputdesign">
                <span className="input-group-btn">
                    <img alt="phone" src="../image/icons/phoneicon.png" />
                </span>
                <input className="form-control" id="mobile_number" onChange={handleChange}  placeholder="Enter your number" type="number" />
                </div>
            </div>
            <div className="col-sm-12 col-xs-12">
                <div className="input-group selectdesign">
                <span className="input-group-btn">
                    <img alt="zone" src="../image/icons/zone.png" />
                </span>
                <select className="form-control" id="zone" name="zone" onChange = {(e) => setZone(e.target.value)} required="">
                    <option>Select your Zone</option>
                    { zones && zones.map((item,index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
                </div>
            </div>
            <div className="col-sm-12 col-xs-12">
                <div className="input-group selectdesign">
                <span className="input-group-btn">
                    <img alt="zone" src="../image/icons/jeep.png" />
                </span>
                <select className="form-control" id="vehicle" name="vehicle" onChange = {(e) => setVehicle(e.target.value)} required="">
                    <option>Select your Vehicle</option>
                    { vehicles && vehicles.map((item,index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
                </div>
            </div>
            <div className="col-sm-12 col-xs-12">
                <div className="input-group selectdesign">
                <span className="input-group-btn">
                    <img alt="zone" src="../image/icons/zone2.png" />
                </span>
                <select className="form-control" id="timing" name="timing" onChange = {(e) => setTiming(e.target.value)} required="">
                    <option>Select Timing</option>
                    { timings && timings.map((item,index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
                </div>
            </div>
            { bookingDate && bookingDate.length > 0 &&
                <div className="col-sm-12 col-xs-12">
                    <div className="booknowbtn">
                        <Link onClick = {HandleSubmit} className="btn btn-primary btn-block" id="stepTwo">Book Now</Link>
                    </div>
                </div>
            }
            </div>
        </form>
    </>
  )
}
