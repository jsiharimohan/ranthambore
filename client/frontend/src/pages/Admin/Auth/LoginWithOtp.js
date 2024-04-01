import React, { useContext, useState } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


export default function LoginWithOtp() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate()


  const handleClick = async(e) => {
    e.preventDefault();
    if (otp && otp != '') {
      try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/auth/verify-and-login`, {mobile:mobile, otp: otp});

        if (res.status !== 200) {

          if (res.data?.error?.message) {
            swal(res.data.error.message, "error");

          } else if (res?.data?.message) {
            swal(res.data.message, "error");

          }

        }else{


          localStorage.setItem('accessToken', res.data.accessToken);

          if (res.data.user) {
            localStorage.setItem('user', JSON.stringify(res.data.user));


          }

          swal('You are loggedin successfully!', "success");

          setTimeout(function() {
            window.location.reload();
          }, 1000);

        }



      } catch (err) {
        swal('somthing went wrong!', "error");
        console.log(err);
      }
    }else{
      try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/auth/login-by-otp`, {mobile:mobile});

        console.log('err res', res)

        if (res.status !== 200) {

          if (res.data?.error?.message) {
            swal(res.data.error.message, "error");

          } else if (res?.data?.message) {
            swal(res.data.message, "error");

          }

        }else{

          swal('Otp sended successfully!', "success");
          setShow(true);
        }



      } catch (err) {
        swal('somthing went wrong!', "error");
        console.log(err);
      }
    }

  };



  return (

    <div
      className='bg-center bg-no-repeat bg-cover h-screen commonClass'
      style={{ backgroundImage: "url('../image/admin/tiger-banner.jpg')" }}>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-4">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Jim Corbett"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Ranthambore National Park Admin
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleClick}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="mobile-address" className="sr-only">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="number"
                  autoComplete="mobile"
                  value={mobile} 
                  onChange={(e) => setMobile(e.target.value)} 
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Mobile Number"
                />
              </div>
              {show &&
              <div>
                <label htmlFor="otp" className="sr-only">
                  Otp
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="number"
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)}
                  autoComplete="otp"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="OTP"
                />
              </div>
            }
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}