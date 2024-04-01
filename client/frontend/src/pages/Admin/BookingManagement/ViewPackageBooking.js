import { React, useState , useEffect  , useCallback} from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import BookingDetails from '../../../components/Admin/Booking/PackageBookingDetails';
import CustomerDetails from '../../../components/Admin/Booking/CustomerDetails';
import PackagDetailsInfo from '../../../components/Admin/Booking/PackageDetailsInfo';
import axios from 'axios';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

export default function ViewPackageBooking() {

  const alert = useAlert();
  const params = useParams();

  const [customers, setCustomers] = useState();
  const [details, setDetails] = useState();

  const GetDetails = useCallback( () =>  {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/bookings/package/${params.id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+localStorage.getItem('accessToken')
        },
      }).then(result => {
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
            <PackagDetailsInfo details = {details} />
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}