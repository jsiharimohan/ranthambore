
import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from '../../../context/admin/AuthContext';
import { loginOut } from "../../../pages/Admin/Auth/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import Logo from './Logo.png';

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");

  const [showHotels, setShowHotels] = useState('');

  const [showPackages, setShowPackages] = useState('');

  const [showEnquiries, setShowEnquiries] = useState('');

  const [showBookings, setShowBookings] = useState('');

  const [showPrices, setShowPrices] = useState('');

  const [showDates, setShowDates] = useState('');

  const [showSettings, setShowSettings] = useState('');

  useEffect(() => {
    if ((window.location.href.indexOf("hotels") > -1) || (window.location.href.indexOf("amenities") > -1) || (window.location.href.indexOf("room-facilities") > -1)) {
      setShowHotels('show');
    }

    if ((window.location.href.indexOf("customers") > -1) || (window.location.href.indexOf("safari-booking") > -1) || (window.location.href.indexOf("package-booking") > -1) || (window.location.href.indexOf("chambal-booking") > -1)) {
      setShowBookings('show');
    }

    if ((window.location.href.indexOf("change-password") > -1) || (window.location.href.indexOf("contact-details") > -1) || (window.location.href.indexOf("my-account") > -1) || (window.location.href.indexOf("razorpay-settings") > -1)) {
      setShowSettings('show');
    }

    if (window.location.href.indexOf("/package") > -1) {
      setShowPackages('show');
    }

    if (window.location.href.indexOf("enquiries") > -1) {
      setShowEnquiries('show');
    }

    if ((window.location.href.indexOf("prices") > -1) || (window.location.href.indexOf("edit-price") > -1) || (window.location.href.indexOf("price-list") > -1) || (window.location.href.indexOf("add-price") > -1)) {
      setShowPrices('show');
    }

    if ((window.location.href.indexOf("dates") > -1) || (window.location.href.indexOf("edit-ranthamboreDates") > -1 )) {
      setShowDates('show');
    }

    if (window.location.href.indexOf("package-booking") > -1) {
      setShowPackages('');
    }

    if (window.location.href.indexOf("zone-categories") > -1) {
      setShowDates('show');
    }

  },[]);

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
      <nav className="bg-safari-brown md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 sideNav">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-white md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-white"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="no-underline md:block text-left text-white md:pb-2 mr-0 inline-block whitespace-nowrap text-lg uppercase font-medium p-2 pb-0 px-0"
            to="/admin/dashboard"
          >
            <img alt='Logo' src={Logo} />
          </Link>
          {/* Collapse */}
          <div
            className={
              "resNavbar md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="mt-2 md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-10/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-medium p-0"
                    to="/admin/dashboard"
                  >
                    <img alt='Logo' src={Logo} />
                  </Link>
                </div>
                <div className="w-2/12 flex justify-end">
                  <button
                    type="button"
                    className="colllapbtn cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link to="/admin/dashboard" className="text-white text-md py-3 font-medium block">
                  <i className="fas fa-tv mr-2 text-md opacity-75"></i>{" "}
                  Dashboard
                </Link>
              </li>
              <li className="items-center">
                <div className="accordion" id="accordionMenu">
                  <div className="accordion-item">
                    <Link type="button" className="bg-safari-brown block cursor-pointer transition focus:outline-none text-white items-left py-3 w-full" data-toggle="collapse" data-target="#collapse-safari" aria-expanded="true" aria-controls="collapse-safari">
                      <i className="fas fa-th-large mr-2 text-md opacity-75"></i>{" "}
                      Manage Safari Dates
                      <i className="fas fa-angle-down mt-1 float-right text-md opacity-75"></i>
                    </Link>
                    <div id="collapse-safari" className={`bg-hotel-maroon collapse${showDates}`} data-parent="#accordionMenu">
                      <div className="accordion-body">
                        <ul className="list-none">
                          <li className="items-center">
                            <Link to="/admin/ranthambore-dates" className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block">
                              <i className="fas fa-dot-circle mr-2"></i> Ranthambore Dates </Link>
                          </li>
                          <li className="items-center">
                            <Link to="/admin/zone-categories" className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block">
                              <i className="fas fa-dot-circle mr-2"></i> Zone Categories </Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/chambal-dates' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i>Chambal Blocked Dates </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="items-center">
                <div className="accordion" id="accordionMenu">
                  <div className="accordion-item">
                    <Link className="bg-safari-brown block cursor-pointer transition focus:outline-none text-white items-left py-3 w-full" type="button" data-toggle="collapse" data-target="#collapse-prices" aria-expanded="true" aria-controls="collapse-prices">
                      <i className="fas fa-suitcase mr-2 text-md opacity-75"></i>{" "}
                      Price Management
                      <i className="fas fa-angle-down mt-1 float-right text-md opacity-75"></i>
                    </Link>
                    <div id="collapse-prices" className={`bg-hotel-maroon collapse${showPrices}`} data-parent="#accordionMenu">
                      <div className="accordion-body">
                        <ul className="list-none">
                          <li className="items-center">
                            <Link to='/admin/safari-prices' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Safari Price</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/chambal-prices' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Chambal Price</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="items-center">
                <div className="accordion" id="accordionMenu">
                  <div className="accordion-item">
                    <Link className="block cursor-pointer transition focus:outline-none text-white items-left py-3 w-full dark:hover:text-white" type="button" data-toggle="collapse" data-target="#collapse-booking" aria-expanded="true" aria-controls="collapse-booking">
                      <i className="fas fa-suitcase mr-2 text-md opacity-75"></i>{" "}
                      Booking Management
                      <i className="fas fa-angle-down mt-1 float-right text-md opacity-75"></i>
                    </Link>
                    <div id="collapse-booking" className={`bg-hotel-maroon collapse${showBookings}`} data-parent="#accordionMenu">
                      <div className="accordion-body">
                        <ul className="list-none">
                          <li className="items-center">
                            <Link to='/admin/customers' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Customers</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/safari-booking' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Safari Booking</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/package-booking' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Package Booking</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/chambal-bookings' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Chambal Booking</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="items-center">
                <div className="accordion" id="accordionMenu">
                  <div className="accordion-item">
                    <Link className="block cursor-pointer transition focus:outline-none text-white items-left py-3 w-full dark:hover:text-white" type="button" data-toggle="collapse" data-target="#collapse-hotel" aria-expanded="true" aria-controls="collapse-hotel">
                      <i className="fas fa-hotel mr-2 text-md opacity-75"></i>{" "}
                      Hotel Management
                      <i className="fas fa-angle-down mt-1 float-right text-md opacity-75"></i>
                    </Link>
                    <div id="collapse-hotel" className={`bg-hotel-maroon collapse${showHotels}`} data-parent="#accordionMenu">
                      <div className="accordion-body">
                        <ul className="list-none">
                          <li className="items-center">
                            <Link to='/admin/hotels' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Hotels</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/amenities' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Amenities</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/room-facilities' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Room Facilities</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="items-center">
                <div className="accordion" id="accordionMenu">
                  <div className="accordion-item">
                    <Link className="block cursor-pointer transition focus:outline-none text-white items-left py-3 w-full dark:hover:text-white" type="button" data-toggle="collapse" data-target="#collapse-package" aria-expanded="false" aria-controls="collapse-package">
                      <i className="fas fa-chart-pie mr-2 text-md opacity-75"></i>{" "}
                      Package Management
                      <i className="fas fa-angle-down mt-1 float-right text-md opacity-75"></i>
                    </Link>
                    <div id="collapse-package" className={`bg-hotel-maroon collapse${showPackages}`} data-parent="#accordionMenu">
                      <div className="accordion-body">
                        <ul className="list-none">
                          <li className="items-center">
                            <Link to='/admin/packages' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Packages</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/package-features' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Features</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/package-inclusion' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Inclusion</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/package-exclusion' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Exclusion</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/package-terms' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Terms</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/package-payment-policy' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Payment Policy</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/package-cancellation-policy' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Cancellation Policy</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/block-dates' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Blocked Dates</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/festival-dates' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Festival Dates</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="items-center">
                <div className="accordion" id="accordionMenu">
                  <div className="accordion-item">
                    <Link className="block cursor-pointer transition focus:outline-none text-white items-left py-3 w-full dark:hover:text-white" type="button" data-toggle="collapse" data-target="#collapse-enquiry" aria-expanded="false" aria-controls="collapse-enquiry">
                      <i className="fas fa-phone-volume mr-2 text-md opacity-75"></i>{" "}
                      Enquiries
                      <i className="fas fa-angle-down mt-1 float-right text-md opacity-75"></i>
                    </Link>
                    <div id="collapse-enquiry" className={`bg-hotel-maroon collapse${showEnquiries}`} data-parent="#accordionMenu">
                      <div className="accordion-body">
                        <ul className="list-none">
                          <li className="items-center">
                            <Link to='/admin/general-enquiries' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Package Enquiries</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/hotel-enquiries' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Hotel Enquiries</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/current-booking-enquiries' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Curr Booking Enquiries</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/contact-enquiries' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Contact Enquiries</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="items-center">
                <div className="accordion" id="accordionMenu">
                  <div className="accordion-item">
                    <Link className="block cursor-pointer transition focus:outline-none text-white items-left py-3 w-full dark:hover:text-white" type="button" data-toggle="collapse" data-target="#collapse-settings" aria-expanded="false" aria-controls="collapse-settings">
                      <i className="fas fa-wrench mr-2 text-md opacity-75"></i>{" "}
                      Settings
                      <i className="fas fa-angle-down mt-1 float-right text-md opacity-75"></i>
                    </Link>
                    <div id="collapse-settings" className={`bg-hotel-maroon collapse${showSettings}`} data-parent="#accordionMenu">
                      <div className="accordion-body">
                        <ul className="list-none">
                          <li className="items-center">
                            <Link to='/admin/pages' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Pages</Link>
                          </li> 
                          <li className="items-center">
                            <Link to='/admin/razorpay-settings' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Razorpay</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/contact-details' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Contact details</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/my-account' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> My account</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/change-password' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Change password</Link>
                          </li>
                          <li className="items-center">
                            <Link to='/admin/marquees' className="text-white pt-3 pb-3 pl-2 pr-2 font-medium block"><i className="fas fa-dot-circle mr-2"></i> Marquees</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="items-center">
                <a href="#!" onClick={logout} className="text-white text-md py-3 block">
                  <i className="fas fa-user mr-2 text-md opacity-75"></i>{" "}
                  Logout
                </a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}
