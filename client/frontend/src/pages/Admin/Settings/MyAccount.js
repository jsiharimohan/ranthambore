import React , { useState  , useEffect} from 'react';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import { useAlert } from "react-alert";
import axios from 'axios'

export default function MyAccount() {

    const alert = useAlert();
    const HandleImage = (e) => {
       setImage(e.target.files[0]);
    }

    const [image, setImage] = useState();
    const [name , setName] = useState();
    const [email , setEmail] = useState();
    const [details , setDetails] = useState([]);

    const HandleSubmit = () => {

        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("email", email);

        axios.patch(`${process.env.REACT_APP_BASE_URL}/admin/auth/profile`,  formData , {
                headers: {
                    'Authorization': `Bearer `+localStorage.getItem('accessToken')
                },
              }).then(res => {
                  if(res.status === 200) {
                      alert.success("Data is updated successfully");
                    //   setTimeout(() => {
                    //       window.location = '/admin/my-account';
                    //   }, 1000);
  
                  } else if(res.data.validation_errors) {
                      alert.error(res.message);
                  }
              });
  
      }
  
      function getDetails() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/auth/profile`, {
              headers: {
                  'Authorization': `Bearer `+localStorage.getItem('accessToken')
              },
            }).then(res => {
                console.log(res);
                  setName(res.data.data.name);
                  setEmail(res.data.data.email);
                  setDetails(res.data.data.avatar);
            });
      }
  
      useEffect(() => {
          getDetails();
      },[])

  return (
    <div className="relative md:ml-64 bg-default-skin">
     <Sidebar/>
     <Navbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
            <div className='mt-4'>
                <h1 className='text-2xl text-black font-bold mb-3'>My account</h1>
            </div>
            <form>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Full Name</label>
                    <input type="text" id="accountName" onChange = {(e) => setName(e.target.value)} value = {name} placeholder='Account name' className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Email</label>
                    <input type="text" id="accountEmail" onChange = {(e) => setEmail(e.target.value)} value = {email}  placeholder='Account email' className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className='form-group'>
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload Profile Image</label>
                    <input onChange = {HandleImage}  className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                    { details && <img src={details} width="200px" /> } </div> 
                <div className='form-group mt-2'>
                    <button type="button" onClick={HandleSubmit} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                </div>
            </form>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}