import React, { useContext } from 'react';
import abhishek from './abhishek.jpg' 
import { AuthContext } from '../../../context/admin/AuthContext';
import { loginOut } from "../../../pages/Admin/Auth/apiCalls";
import { useNavigate } from 'react-router-dom';


export default function AdminNavbar() {
  const { user, accessToken, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();


  const logout = async (e) => {

    e.preventDefault();


    if (!localStorage.getItem("accessToken") || localStorage.getItem("accessToken") === 'null' || localStorage.getItem("accessToken") === '') {
      dispatch({ type: "LOGIN_OUT" });

      return false;

    }

    const res = await loginOut(accessToken, dispatch);

    if (res === true) {
      navigate("/admin/login");
    }


  }
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-0 hidden-xs">
        <div className="w-full first-letter:md:px-10 px-4">
          <div className="dropdown float-right">
            <button className="font-bold text-lg px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {user?.name}
              <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full" style={{marginLeft: "10px", position: "relative", top: "15px"}}>
                <img
                  alt="..."
                  className="w-full rounded-full align-middle border-none shadow-lg"
                  src={abhishek}
                />
              </span>
            </button>
            <div className="dropdown-menu">
              <li className="text-sm py-2 px-4 font-normal whitespace-no-wrap bg-transparent text-black block" onClick={logout}>Logout</li>
            </div>
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
