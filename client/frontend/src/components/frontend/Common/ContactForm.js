import axios from 'axios';
import React, { useState } from 'react'
import swal from 'sweetalert';

export default function ContactForm() {
  const [error_list, setErrorList] = useState([]);


  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });


  const handleChange = (e) => {
    setEnquiry(enquiry => ({ ...enquiry, [e.target.name]: e.target.value }));

    if (e.target.name === 'phone') {      

      if (e.target.value.length >= 10) {
        const data = {
          "name": enquiry.name,
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

    if (enquiry.name === '' || enquiry.name === null) {
      setErrorList(errorlist => ({ ...errorlist, name: 'Please enter name!' }));
    }

    if (enquiry.phone === '') {
      setErrorList(errorlist => ({ ...errorlist, phone: 'Please enter phone!' }));
    }

    if (enquiry.email === '') {
      setErrorList(errorlist => ({ ...errorlist, email: 'Please enter email!' }));
    }

    if (enquiry.message === '') {
      setErrorList(errorlist => ({ ...errorlist, message: 'Please enter message!' }));
    }

    if (enquiry.name === '' || enquiry.phone === null || enquiry.message === null) {
      return false;
    }


    let data = { ...enquiry };





    axios.post(`${process.env.REACT_APP_BASE_URL}/admin/contactus/enquiries`, data).then(res => {
      if (res.data.success === true) {
        swal('Thank you for getting in touch. We will contact you shortly!', "success");

        setEnquiry(enquiry => ({
          ...enquiry,
          name: '',
          message: '',
          phone: '',
          email: '',

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
    <div className="container">
      <div className="lg:mt-10 lg:mb-10 contact">
        <h2 className="text-black text-4xl text-center font-bold lg:mt-5">Get In Touch With Us</h2>

        <form>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
            <div>
              <label htmlFor="email" className="block mb-2 text-base font-medium text-kenpozome">Name</label>
              <input
                type="text"
                id="name"
                required="required" value={enquiry.name} name="name" onChange={handleChange}
                className="inputstyle h-12 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-0 bo focus-within:outline-none block w-full p-2.5 dark:border-gray-300 dark:placeholder-gray-400"

              />
              <span className="text-danger left col-md-12">{error_list.name}</span>

            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-base font-medium text-kenpozome">Email</label>
              <input
                type="email"
                id="number"
                required="required" value={enquiry.email} name="email" onChange={handleChange}
                className="inputstyle h-12 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-0 bo focus-within:outline-none block w-full p-2.5 dark:border-gray-300 dark:placeholder-gray-400"

              />
              <span className="text-danger left col-md-12">{error_list.email}</span>

            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-base font-medium text-kenpozome">Mobile Number</label>
              <input
                type="number"
                id="phone"
                required="required" value={enquiry.phone} name="phone" onChange={handleChange}
                className="inputstyle h-10 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-0 bo focus-within:outline-none  block w-full p-2.5 dark:border-gray-300 dark:placeholder-gray-400"

              />
              <span className="text-danger left col-md-12">{error_list.phone}</span>



            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-base font-medium text-kenpozome">Your Enquiry</label>
              <textarea id="message" rows="6" required="required" value={enquiry.message} name="message" onChange={handleChange} className="p-2.5 w-full bg-white border border-gray-300 focus:border-gray-300 focus-within:border-gray-300 focus:ring-gray-300 text-gray-900 text-sm rounded-lg dark:focus:ring-gray-300 dark:focus:border-gray-300"></textarea>
              <div className="invalid-feedback">{error_list.message}</div>
            </div>
          </div>
          <div className="text-center lg:mt-4">
            <button type="button" onClick={HandleAddEnquiry} className="bg-kenpozome contact-btn py-2 text-center px-4 shadow-lg rounded sm:text-xl font-semibold mb-2 text-white focus-within:no-underline focus:no-underline active:no-underline hover:text-white">Submit</button>
          </div>
        </form>
      </div >
    </div >
  )
}
