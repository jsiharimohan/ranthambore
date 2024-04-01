import axios from 'axios';
import React, { useState } from 'react'
import swal from 'sweetalert';
import * as moment from 'moment';

export default function EnquiryForm({ hotel_id, type, hotel_name }) {

  const toDayDate = moment(new Date()).format("YYYY-MM-DD");

  const [error_list, setErrorList] = useState([]);
  const [success_msg] = useState("");
  console.log("htel info", hotel_id);


  const [enquiry, setEnquiry] = useState({
    traveller_name: '',
    message: '',
    phone: '',
    booking_date: '',
    type: type,
    hotel_id: '',
    hotel: '',
  });


  const handleChange = (e) => {
    setEnquiry(enquiry => ({ ...enquiry, [e.target.name]: e.target.value }));

    if (e.target.name === 'phone') {
      

      if (e.target.value.length >= 10) {
        const data = {
          "name": enquiry.traveller_name,
          "mobile": e.target.value
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/admin/enquiries/save-enquery`, data).then(res => {
          if (res.status === 200) {
          } else {
          }
        }).catch(error => {
          swal("Warning", error, "warning");
        })
      }
    }
  }

  const HandleAddEnquiry = (e) => {
    e.preventDefault();

    if (enquiry.traveller_name === '' || enquiry.traveller_name === null) {
      setErrorList(errorlist => ({ ...errorlist, traveller_name: 'Please enter name!' }));
    }

    if (enquiry.phone === '') {
      setErrorList(errorlist => ({ ...errorlist, phone: 'Please enter phone!' }));
    }

    if (enquiry.booking_date === '') {
      setErrorList(errorlist => ({ ...errorlist, booking_date: 'Please choose a booking date!' }));
    }

    if (enquiry.traveller_name === '' || enquiry.phone === null || enquiry.booking_date === null) {
      return false;
    }


    let data = { ...enquiry };

    data.hotel_id = hotel_id;
    data.hotel = hotel_name;



    axios.post(`${process.env.REACT_APP_BASE_URL}/admin/enquiries`, data).then(res => {
      if (res.data.success === true) {
        swal('Thank you for getting in touch. We will contact you shortly!', "success");

        setEnquiry(enquiry => ({
          ...enquiry,
          traveller_name: '',
          message: '',
          phone: '',
          booking_date: '',

        }));


        setErrorList([]);
      } else if (res.data.validation_errors) {
        setErrorList(res.data.validation_errors);
      } else if (res.data.status === 401) {
        //  setDuplicateDate(true);
      }
    });
  }




  return (
    <div className="hotel-book-form slotform">
      <h5>Enquiry Form</h5>
      <div className="text-success text-center">{success_msg}</div>
      <form id="EnquiryForm" >
        <div className="form-group">
          <label className="control-label">Booking Date</label>
          <div className="input-group">
            <span className="input-group-addon">
              <img src="../image/icons/calendar.png" alt='Calendar' />
            </span>
            <input type="date" name="booking_date" value={enquiry.booking_date} onChange={handleChange} className="form-control" id="booking_date" min={toDayDate} />
            <span className="text-danger left col-md-12">{error_list.booking_date}</span>


          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Traveller Name</label>
          <div className="input-group">
            <span className="input-group-addon">
              <img src="../image/icons/user.png" alt='User' />
            </span>
            <input type="name" required="required" value={enquiry.traveller_name} name="traveller_name" onChange={handleChange} className="form-control" placeholder="Enter your full name.." id="traveller_name" />
            <span className="text-danger left col-md-12">{error_list.traveller_name}</span>

          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Mobile Number</label>
          <div className="input-group">
            <span className="input-group-addon">
              <img src="../image/icons/phone.png" alt='Phone' />
            </span>
            <input type="tel" required="required" value={enquiry.phone} name="phone" onChange={handleChange} className="form-control" placeholder="Eg. 123 000 000" id="enquiry-phone" />
            <span className="text-danger left col-md-12">{error_list.phone}</span>

          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Message</label>
          <textarea className="form-control" required="required" rows="3" onChange={handleChange} placeholder="Message" name="message" value={enquiry.message}></textarea>
          <div className="invalid-feedback">{error_list.message}</div>
        </div>
        <div className="form-group text-center">
          <button className="btn btn-warning btn-lg" onClick={HandleAddEnquiry} type="submit">Book Now</button>
        </div>
      </form>
    </div>
  )
}
