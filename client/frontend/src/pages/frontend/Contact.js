import React, { useEffect, useState } from 'react'
import InnerBanner from '../../components/frontend/Banner/InnerBanner'
import ContactForm from '../../components/frontend/Common/ContactForm'
import axios from 'axios'
import {Helmet} from "react-helmet";
import swal from 'sweetalert'

export default function Contact() {
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [altSecondPhone, setAltSecondPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const getContactInfo = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/settings/contact`).then(res => {

      if (res.status === 200) {
        setPhone(res.data.data.value.phone);
        setAltPhone(res.data.data.value.altphone);
        setAltSecondPhone(res.data.data.value.altphone2);
        setEmail(res.data.data.value.email);
        setAddress(res.data.data.value.address);
      } else {
        swal("Warning", res.data.error.message, "warning");
      }
    }).catch(error => {
      swal("Warning", error, "warning");
    })
  }

  useEffect(() => {
    getContactInfo();
  }, [])

  

  return (
    <>
     <Helmet>
      <title>Ranthambore National Park Contact Details</title>
      <meta name="description" content="Contact us through our website to get all the information you need about Ranthambore National Park. Our customer support team is available to answer your queries regarding safari tours, accommodation, packages, and more. We are committed to providing excellent service and ensuring a hassle-free experience for our customers. Get in touch with us today and start planning your unforgettable trip to Ranthambore." />
    </Helmet>
      <InnerBanner />
      <div className="container lg:pt-10 lg:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-white shadow-md rounded text-center p-4 border-kenpozome border-2 grid-box">
            <img src="image/icons/mail.png" className="m-auto" />
            <h3 className="text-2xl text-black mb-3 mt-3">Support</h3>
            <a href={`mailto:${email}`} className="sm:text-xl text-black hover:text-black focus-within:text-black focus:text-black active:no-underline focus-within:no-underline">{email}</a><br />

          </div>
          <div className="bg-white shadow-md rounded text-center p-4 border-kenpozome border-2 grid-box">
            <img src="image/icons/c-phone.png" className="m-auto" />
            <h3 className="text-2xl text-black mb-3 mt-3">Enquiry</h3>
            <a href={`tel:${phone}`} className="sm:text-xl text-black hover:text-black focus-within:text-black focus:text-black active:no-underline focus-within:no-underline">{phone} </a><br />
            <a href={`tel:${altPhone}`} className="sm:text-xl text-black hover:text-black focus-within:text-black focus:text-black active:no-underline focus-within:no-underline"> {altPhone} </a><br />
            <a href={`tel:${altSecondPhone}`} className="sm:text-xl text-black hover:text-black focus-within:text-black focus:text-black active:no-underline focus-within:no-underline"> {altSecondPhone}</a>
          </div>
          <div className="bg-white shadow-md rounded text-center p-4 border-kenpozome border-2 grid-box">
            <img src="image/icons/address.png" className="m-auto" />
            <h3 className="text-2xl text-black mb-3 mt-3">Address</h3>
            <span className="sm:text-xl text-black">{address}</span>
          </div>
        </div>
      </div>

      <ContactForm />
    </>
  )
}
