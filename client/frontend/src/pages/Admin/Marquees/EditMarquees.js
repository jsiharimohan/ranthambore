import { React, useState , useEffect  , useCallback} from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from '../../../components/Admin/Navbar/AdminNavbar';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';
import axios from 'axios';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

export default function EditMarquees() {

  const alert = useAlert();
  const params = useParams();
  const [content, setContent] = useState('');

  const GetDetails = useCallback( () =>  {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/marquees/${params.id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+localStorage.getItem('accessToken')
        },
      }).then(result => { 
        console.log('content',result.data.data.content);
            setContent(result.data.data.content);
      })
  },[params.id]);

  useEffect(() => {

      GetDetails();

  },[GetDetails]);


    const HandleSaveData = (e) => {
      e.preventDefault();

      const data = {
        content: content
      }

      axios.patch(`${process.env.REACT_APP_BASE_URL}/admin/marquees/${params.id}`, data , {
          headers: {
              'Authorization': `Bearer `+localStorage.getItem('accessToken')
          },
      }).then(res => {
          if(res.data.success === true) {
              alert.success("Data is updated successfully");
              setTimeout(() => {
                  window.location = '/admin/marquees';
              }, 1000);

          } else if(res.data.validation_errors) {
              
          }
      });
    }

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/> 
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
        <h1 className='text-2xl text-black font-bold mb-3'>Edit event date</h1>
        <form className='mt-4 shadow-md p-4 rounded bg-white'>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Start Date</label>
          <textarea id="message" rows="6" required="required" value={content} name="message" onChange={(e) => setContent(e.target.value)} className="p-2.5 w-full bg-white border border-gray-300 focus:border-gray-300 focus-within:border-gray-300 focus:ring-gray-300 text-gray-900 text-sm rounded-lg dark:focus:ring-gray-300 dark:focus:border-gray-300"></textarea> 
        </div>
        <div className='flex'>
          <button type="button"  onClick = {HandleSaveData}className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
          <Link to='/admin/marquees' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
        </div>
      </form>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}