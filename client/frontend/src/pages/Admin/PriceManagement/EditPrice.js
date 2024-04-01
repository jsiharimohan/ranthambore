import React from "react";
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from '../../../components/Admin/Navbar/AdminNavbar';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import PriceType from "../../../components/Admin/PriceManagement/PriceType";
import { useParams } from "react-router-dom";

export default function EditPrice() {

  const params = useParams();

  const action = params.id == 'add' ? 'add' : 'edit';

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/> 
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
          <h1 className='text-2xl text-black font-bold mb-3'>{action} {params.type} Prices</h1>
            <PriceType id = {params.id} type = {params.type}  action = {action} />
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}
