import { React, useState , useEffect  , useCallback} from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import BookingDetails from '../../../components/Admin/Booking/BookingDetails';
import CustomerDetails from '../../../components/Admin/Booking/CustomerDetails';
import axios from 'axios';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

export default function ViewSafariBooking() {

  const alert = useAlert();
  const params = useParams();

  const [travellers, setTravellers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [details, setDetails] = useState();

  const GetDetails = useCallback( () =>  {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/bookings/safari/${params.id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+localStorage.getItem('accessToken')
        },
      }).then(result => {
          setTravellers(result.data.data.booking_customers);
          setCustomers(result.data.data.customer);
          setDetails(result.data.data);
      })
  },[params.id]);

  useEffect(() => { 
      GetDetails();
  },[GetDetails]);

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
            <BookingDetails details = {details} />
            <CustomerDetails details = {customers} />
            <h3 className='text-2xl text-black font-bold mb-2 mt-12'>Traveller Details</h3>
            <div className='table-responsive'>
            <table className='table bg-white border border-slate-300'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Name</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Gender</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Nationality</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Id Proof Type</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Id Proof Number</th>
                    </tr>
                    
                </thead>
                <tbody>
                  { travellers && travellers.map((item,index) => (
                    <tr key={index}>
                      <td className='border border-slate-300 text-center'>{item.name}</td>
                      <td className='border border-slate-300 text-center'>{item.gender}</td>
                      <td className='border border-slate-300 text-center'>{item.nationality}</td>
                      <td className='border border-slate-300 text-center'>{item.id_proof}</td>
                      <td className='border border-slate-300 text-center'>{item.idnumber}</td>
                    </tr>
                  ))}
                   
                </tbody>
            </table>
            </div>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}