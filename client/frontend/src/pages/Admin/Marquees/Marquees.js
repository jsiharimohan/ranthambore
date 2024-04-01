import { React, useState , useEffect  , useCallback } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useAlert } from "react-alert";
import * as moment from 'moment';


export default function Marquees() {

    const alert = useAlert();
    const [details, setDetails] = useState([]);

    const GetDetails = useCallback( () =>  {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/marquees`, {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+localStorage.getItem('accessToken')
          },
        }).then(result => { 
            setDetails(result.data.data);
        })
    },[]);
    
    useEffect(() => {
    
        GetDetails();

    },[]);

    const HandleDelete = (id) => {

        var result = window.confirm("Want to delete?");
        if (result) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/marquees/${id}`, {
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer `+localStorage.getItem('accessToken')
                },
              }).then(result => {
                  alert.success("Data is deleted");
                  setTimeout(() => {
                    window.location = '/admin/marquees';
                   }, 1000);
              }) 
        }
    }

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle Chambal-Dates">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h1 className='text-2xl text-black font-bold mb-3'>Marquees</h1>                    
                </div>
            </div>
            <div className='table-responsive'>
            <table className='table bg-white border border-slate-300 mt-4'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Marquee Content</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Created Date</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>
                { details && details.map((item,index) => (
                    <tr key={index}>
                        <td className='border border-slate-300 text-center'>{item.content}</td>
                        <td className='border border-slate-300 text-center'>{moment(item.createdAt).format("YYYY-MM-DD")}</td>
                        <td className='border border-slate-300 text-center'>
                        <Link to={`/admin/edit-marquee/${item._id}`} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                             <i className="fas fa-pencil"></i>
                         </Link>
                         
                        </td>
                    </tr>
                     )) }
                </tbody>
            </table>
            </div>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}


