import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import HeaderStats from "../../../components/Admin/Cards/HeaderStats";
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import GeneralEnquiry from "../../../components/Admin/Cards/GeneralEnquiry";
import HotelEnquiry from "../../../components/Admin/Cards/HotelEnquiry";
import FooterAdmin from "../../../components/Admin/Footer/FooterAdmin";


export default function AdminDashboard() {

  const [gEnquiries, setGEnquiries] = useState([]);
  const [hEnquiries, setHEnquiries] = useState([]);
  const [totalEnquiries, setTotalEnquiries] = useState(0);


  function getEnquiries() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/enquiries/dashboard`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      setGEnquiries(result.data.general_enquiries);
      setHEnquiries(result.data.hotel_enquiries);
      setTotalEnquiries(result.data.total_enquiries);

    })
  }

  useEffect(() => {
    getEnquiries();
  }, []);


  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <AdminNavbar />
      <HeaderStats total_enquiries={totalEnquiries} />
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <GeneralEnquiry enquiries={gEnquiries} />
          <HotelEnquiry enquiries={hEnquiries} />
        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}
