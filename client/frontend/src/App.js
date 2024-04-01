import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import '../src/App.css';
import '../src/css/style.css';
import '../src/css/admin.css';

import NotFound from './pages/404';

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import TopHead from './components/frontend/header/TopHead';
import Header from './components/frontend/header/Header';
import Home from './pages/frontend/Home';
import OnlineSafariBooking from './pages/frontend/OnlineSafariBooking';
import Footer from './components/frontend/Footer/Footer';
import Chambal from './pages/frontend/Chambal';
import ChambalBooking from './pages/frontend/ChambalBooking';
import About from './pages/frontend/About';
import Contact from './pages/frontend/Contact';
import Terms from './pages/frontend/Terms';
import Privacy from './pages/frontend/Privacy';
import Cancellation from './pages/frontend/Cancellation';
import SafariTravellerBooking from './pages/frontend/SafariTravellerBooking';
import Thankyou from './pages/frontend/Thankyou';
import Success from './pages/frontend/Success';
import Hotel from './pages/frontend/Hotel/Hotel';
import FrontendPackages from './pages/frontend/Packages/FrontendPackages';
import HotelDetails from './pages/frontend/Hotel/HotelDetails';

// Admin import starts here
import Login from './pages/Admin/Auth/Login';
import LoginWithOtp from './pages/Admin/Auth/LoginWithOtp';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';


import RanthamboreDates from './pages/Admin/SafariDates/RanthamboreDates';
import CreateRanthamboreDates from './pages/Admin/SafariDates/CreateRanthamboreDates';
import EditRanthamboreDates from './pages/Admin/SafariDates/EditRanthamboreDates';

import ChambalDates from './pages/Admin/SafariDates/ChambalDates';
import CreateChambalDates from './pages/Admin/SafariDates/CreateChambalDates';
import EditChambalDates from './pages/Admin/SafariDates/EditChambalDates';

import Marquees from './pages/Admin/Marquees/Marquees';
import CreateMarquees from './pages/Admin/Marquees/CreateMarquees';
import EditMarquees from './pages/Admin/Marquees/EditMarquees';

import KankaiEvents from './pages/Admin/SafariDates/KankaiEvents';
import CreateKankaiEvent from './pages/Admin/SafariDates/CreateKankaiEvent';
import EditKankaiEvents from './pages/Admin/SafariDates/EditKankaiEvents';
import PriceList from './pages/Admin/PriceManagement/Price'
import SafariList from './pages/Admin/PriceManagement/SafariPrice'
import ChambalList from './pages/Admin/PriceManagement/ChambalPrice'

import EditPrice from './pages/Admin/PriceManagement/EditPrice';
import Listing from './pages/Admin/PriceManagement/PriceListing'
import Customers from './pages/Admin/Customers/Customers';
import SafariManagement from './pages/Admin/BookingManagement/SafariManagement';
import ViewSafariBooking from './pages/Admin/BookingManagement/ViewSafariBooking';
import PackageBooking from './pages/Admin/BookingManagement/PackageBooking';
import ViewPackageBooking from './pages/Admin/BookingManagement/ViewPackageBooking';
import Hotels from './pages/Admin/Hotel/Hotels';
import Amenities from './pages/Admin/Hotel/HotelAmenities';
import HotelAmenitiesUpdate from './pages/Admin/Hotel/HotelAmenities';
import AddAmenity from './pages/Admin/Hotel/AddAmenity';
import EditAmenity from './pages/Admin/Hotel/EditAmenity';
import AddHotel from './pages/Admin/Hotel/AddHotel';
import EditHotel from './pages/Admin/Hotel/EditHotel';
import RoomFacilities from './pages/Admin/Hotel/RoomFacilities';
import AddFacility from './pages/Admin/Hotel/AddFacility';
import EditFacility from './pages/Admin/Hotel/EditFacility';
import HotelRooms from './pages/Admin/Hotel/HotelRooms';
import AddRoom from './pages/Admin/Hotel/AddRoom';
import EditRoom from './pages/Admin/Hotel/EditRoom';
import Packages from './pages/Admin/Packages/Packages';
import PackageFeatures from './pages/Admin/Packages/PackageFeatures';
import PackageToFeatures from './pages/Admin/Packages/PackageToFeatures';
import PackageToExclusions from './pages/Admin/Packages/PackageToExclusions';
import PackageToInclusions from './pages/Admin/Packages/PackageToInclusions';

import CreatePackageAssets from './pages/Admin/Packages/CreatePackageAssets';
import EditPackageAssets from './pages/Admin/Packages/EditPackageAssets';

import CreatePackageInclusion from './pages/Admin/Packages/CreatePackageInclusion';
import EditPackageInclusion from './pages/Admin/Packages/EditPackageInclusion';
import CreatePackageExclusion from './pages/Admin/Packages/CreatePackageExclusion';
import EditPackageExclusion from './pages/Admin/Packages/EditPackageExclusion';
import CreatePackageTerm from './pages/Admin/Packages/CreatePackageTerm';
import EditPackageTerm from './pages/Admin/Packages/EditPackageTerm';

import CreatePackagePaymentPolicy from './pages/Admin/Packages/CreatePackagePaymentPolicy';
import EditPackagePaymentPolicy from './pages/Admin/Packages/EditPackagePaymentPolicy';

import CreatePackageCancellationPolicy from './pages/Admin/Packages/CreatePackageCancellationPolicy';
import EditPackageCancellationPolicy from './pages/Admin/Packages/EditPackageCancellationPolicy';

import CreatePackageItinerary from './pages/Admin/Packages/CreatePackageItinerary';
import EditPackageItinerary from './pages/Admin/Packages/EditPackageItinerary';
import PackageItineraries from './pages/Admin/Packages/PackageItineraries';
import PackageToItineraries from './pages/Admin/Packages/PackageToItineraries';

import PackageInclusion from './pages/Admin/Packages/PackageInclusion';
import PackageExclusion from './pages/Admin/Packages/PackageExclusion';
import PackageTerms from './pages/Admin/Packages/PackageTerms';
import PackageCanPolicy from './pages/Admin/Packages/PackageCanPolicy';
import PackagePaymentPolicy from './pages/Admin/Packages/PackagePaymentPolicy';
import AddPackage from './pages/Admin/Packages/AddPackage';
import EditPackage from './pages/Admin/Packages/EditPackage';
import GeneralEnquiries from './pages/Admin/Enquiry/GeneralEnquiries';
import Pages from './pages/Admin/Pages/Pages';
import EditPage from './pages/Admin/Pages/EditPage';
import HotelEnquiries from './pages/Admin/Enquiry/HotelEnquiries';
import CurrentBooking from './pages/Admin/Enquiry/CurrentBooking';
import Razorpay from './pages/Admin/Settings/Razorpay';
import ContactDetails from './pages/Admin/Settings/ContactDetails';
import MyAccount from './pages/Admin/Settings/MyAccount';
import FestivalDates from './pages/Admin/Settings/FestivalDates';
import AddFestivalDates from './pages/Admin/Settings/AddFestivalDates';
import EditFestivalDates from './pages/Admin/Settings/EditFestivalDate';
import ChangePassword from './pages/Admin/Settings/ChangePassword';
import PackageCategories from './pages/Admin/Packages/PackageCategories';
import AddPackageCategory from './pages/Admin/Packages/AddPackageCategory';
import EditPackageCategory from './pages/Admin/Packages/EditPackageCategory';
import { AuthContext } from './context/admin/AuthContext';
import PackageDetails from './pages/frontend/Packages/PackageDetails';
import FinalPackageBooking from './pages/frontend/Packages/FinalPackageBooking';
import PrivateAdminRoutes from './pages/Admin/Auth/PrivateAdminRoutes';
import { verifyToken } from "./pages/Admin/Auth/apiCalls";
import ChambalManagement from './pages/Admin/BookingManagement/ChambalManagement';
import ViewChambalBooking from './pages/Admin/BookingManagement/ViewChambalBooking';
import ContactEnquiries from './pages/Admin/Enquiry/ContactEnquiries';
import ZoneCategory from './pages/Admin/SafariDates/ZonesCategory';
import EditZone from './pages/Admin/SafariDates/EditZone';
import Home2 from './pages/frontend/Home2';
import BlockedDates from './pages/Admin/Packages/BlockedDates';
import AddBlockedDates from './pages/Admin/Packages/AddBlockedDates';
import EditBlockedDates from './pages/Admin/Packages/EditBlockedDates';

const options = {
  timeout: 2000,
  position: positions.TOP_LEFT
};

function App() {

  const { accessToken, dispatch } = useContext(AuthContext);

  useEffect(() => {

    localStorage.getItem("accessToken") && localStorage.getItem("accessToken") !== 'null' && localStorage.getItem("accessToken") !== '' && verifyToken(localStorage.getItem("accessToken"), dispatch);


  }, []);







  return (
    <Router>
      <TopHead />
      <Header />
      <Provider template={AlertTemplate} {...options}>
        <Routes>

          <Route exact path='/' element={<Home2 />} />
          <Route exact path='/online-ranthambore-safari-booking' element={<OnlineSafariBooking />} />
          <Route exact path='/safari-booking-details' element={<SafariTravellerBooking />} />
          <Route exact path='/online-chambal-moter-boat-safari-booking' element={<Chambal />} />
          <Route exact path='/chambal-safari-booking/:id' element={<ChambalBooking />} />
          <Route exact path='/about-us' element={<About />} />
          <Route exact path='/contact-us' element={<Contact />} />
          <Route exact path='/terms-and-conditions' element={<Terms />} />
          <Route exact path='/privacy-policy' element={<Privacy />} />
          <Route exact path='/cancellation-policy' element={<Cancellation />} />
          <Route exact path='/thankyou' element={<Thankyou />} />
          <Route exact path='/booking-success' element={<Success />} />
          <Route exact path='/hotels' element={<Hotel />} />
          <Route exact path='/hotel-details/:id' element={<HotelDetails />} />
          <Route exact path='/ranthambore-packages' element={<FrontendPackages />} />
          <Route exact path='/package-details/:id' element={<PackageDetails />} />
          <Route exact path='/book-package' element={<FinalPackageBooking />} />
          <Route exact path='/home2' element={<Home2 />} />


          {/* Admin routing starts here */}



          (<Route path='/admin-login' element={(accessToken && accessToken !== 'null') ? <Navigate to="/admin/dashboard" replace /> : <Login />} />)
          (<Route path='/admin/login' element={(accessToken && accessToken !== 'null') ? <Navigate to="/admin/dashboard" replace /> : <LoginWithOtp />} />)




          <Route element={<PrivateAdminRoutes />}>



            <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
            <Route exact path="/admin/zone-categories" element={<ZoneCategory />} />
            <Route exact path="/admin/edit-zone/:id" element={<EditZone />} />
            <Route exact path="/admin/ranthambore-dates" element={<RanthamboreDates />} />
            <Route exact path="/admin/add-ranthambore-dates" element={<CreateRanthamboreDates />} />
            <Route exact path="/admin/edit-ranthamboreDates/:id" element={<EditRanthamboreDates />} />
            <Route exact path="/admin/chambal-dates" element={<ChambalDates />} />
            <Route exact path="/admin/add-chambal-dates" element={<CreateChambalDates />} />
            <Route exact path="/admin/edit-chambal-dates/:id" element={<EditChambalDates />} />
            <Route exact path="/admin/kankai-events" element={<KankaiEvents />} />
            <Route exact path="/admin/add-kankai-event" element={<CreateKankaiEvent />} />
            <Route exact path="/admin/edit-kankai-events/" element={<EditKankaiEvents />} />
            <Route exact path="/admin/price-list/:type" element={<PriceList />} />
            <Route exact path="/admin/edit-price/:id/:type" element={<EditPrice />} />
            <Route exact path="/admin/add-price/:id/:type" element={<EditPrice />} />

            <Route exact path="/admin/safari-prices" element={<SafariList />} />
            <Route exact path="/admin/chambal-prices" element={<ChambalList />} />

            <Route exact path="/admin/listing" element={<Listing />} />
            <Route exact path="/admin/customers" element={<Customers />} />
            <Route exact path="/admin/safari-booking" element={<SafariManagement />} />
            <Route exact path="/admin/view-safari-booking/:id" element={<ViewSafariBooking />} />
            <Route exact path="/admin/package-booking" element={<PackageBooking />} />
            <Route exact path="/admin/view-package-booking/:id" element={<ViewPackageBooking />} />
            <Route exact path="/admin/chambal-bookings" element={<ChambalManagement />} />
            <Route exact path="/admin/view-chambal-bookings/:id" element={<ViewChambalBooking />} />
            <Route exact path="/admin/hotels" element={<Hotels />} />
            <Route exact path="/admin/add-hotel" element={<AddHotel />} />
            <Route exact path="/admin/edit-hotel/:id" element={<EditHotel />} />
            <Route exact path="/admin/amenities" element={<Amenities />} />
            <Route exact path="/admin/hotel-amenities/:id" element={<HotelAmenitiesUpdate />} />

            <Route exact path="/admin/add-hotel-amenity" element={<AddAmenity />} />
            <Route exact path="/admin/edit-hotel-amenity/:id" element={<EditAmenity />} />
            <Route exact path="/admin/room-facilities" element={<RoomFacilities />} />
            <Route exact path="/admin/add-room-facility" element={<AddFacility />} />
            <Route exact path="/admin/edit-room-facility/:id" element={<EditFacility />} />
            <Route exact path="/admin/hotel-rooms/:id" element={<HotelRooms />} />
            <Route exact path="/admin/add-room/:id" element={<AddRoom />} />
            <Route exact path="/admin/edit-room/:id" element={<EditRoom />} />
            <Route exact path="/admin/packages" element={<Packages />} />
            <Route exact path="/admin/add-package" element={<AddPackage />} />
            <Route exact path="/admin/edit-package/:id" element={<EditPackage />} />
            <Route exact path="/admin/package-features" element={<PackageFeatures />} />
            <Route exact path="/admin/package-to-features/:id" element={<PackageToFeatures />} />
            <Route exact path="/admin/package-to-exclusions/:id" element={<PackageToExclusions />} />
            <Route exact path="/admin/package-to-inclusions/:id" element={<PackageToInclusions />} />
            <Route exact path="/admin/add-package-inclusion" element={<CreatePackageInclusion />} />
            <Route exact path="/admin/add-package-assets" element={<CreatePackageAssets />} />
            <Route exact path="/admin/edit-package-feature/:id" element={<EditPackageAssets />} />
            <Route exact path="/admin/edit-package-inclusion/:id" element={<EditPackageInclusion />} />
            <Route exact path="/admin/package-inclusion" element={<PackageInclusion />} />
            <Route exact path="/admin/package-exclusion" element={<PackageExclusion />} />
            <Route exact path="/admin/add-package-exclusion" element={<CreatePackageExclusion />} />
            <Route exact path="/admin/edit-package-exclusion/:id" element={<EditPackageExclusion />} />


            <Route exact path="/admin/package-terms" element={<PackageTerms />} />
            <Route exact path="/admin/add-package-term" element={<CreatePackageTerm />} />
            <Route exact path="/admin/edit-package-term/:id" element={<EditPackageTerm />} />

            <Route exact path="/admin/package-to-itineraries/:id" element={<PackageToItineraries />} />
            <Route exact path="/admin/package-itineraries" element={<PackageItineraries />} />
            <Route exact path="/admin/add-package-itinerary" element={<CreatePackageItinerary />} />
            <Route exact path="/admin/edit-package-itinerary/:id" element={<EditPackageItinerary />} />


            <Route exact path="/admin/package-cancellation-policy" element={<PackageCanPolicy />} />
            <Route exact path="/admin/package-payment-policy" element={<PackagePaymentPolicy />} />
            <Route exact path="/admin/add-package-payment-policy" element={<CreatePackagePaymentPolicy />} />
            <Route exact path="/admin/edit-package-payment-policy/:id" element={<EditPackagePaymentPolicy />} />
            <Route exact path="/admin/add-package-cancellation-policy" element={<CreatePackageCancellationPolicy />} />
            <Route exact path="/admin/edit-package-cancellation-policy/:id" element={<EditPackageCancellationPolicy />} />
            
            <Route exact path="/admin/block-dates" element={<BlockedDates />} />
            <Route exact path="/admin/add-block-date" element={<AddBlockedDates />} />
            <Route exact path="/admin/edit-block-date/:id" element={<EditBlockedDates />} />
    
            <Route exact path="/admin/general-enquiries" element={<GeneralEnquiries />} />
            <Route exact path="/admin/pages" element={<Pages />} />
            <Route exact path="/admin/pages/edit/:id" element={<EditPage />} />
            <Route exact path="/admin/hotel-enquiries" element={<HotelEnquiries />} />
            <Route exact path="/admin/current-booking-enquiries" element={<CurrentBooking />} />
            <Route exact path="/admin/contact-enquiries" element={<ContactEnquiries />} />
            <Route exact path="/admin/razorpay-settings" element={<Razorpay />} />
            <Route exact path="/admin/contact-details" element={<ContactDetails />} />
            <Route exact path="/admin/my-account" element={<MyAccount />} />
            <Route exact path="/admin/festival-dates" element={<FestivalDates />} />
            <Route exact path="/admin/add-festival-dates" element={<AddFestivalDates />} />
            <Route exact path="/admin/edit-festival-date/:id" element={<EditFestivalDates />} />
            <Route exact path="/admin/change-password" element={<ChangePassword />} />
            <Route exact path="/admin/package-categories/:id" element={<PackageCategories />} />
            <Route exact path="/admin/add-package-category/:id" element={<AddPackageCategory />} />
            <Route exact path="/admin/edit-package-category/:id" element={<EditPackageCategory />} />

            <Route exact path="/admin/marquees" element={<Marquees />} />
            <Route exact path="/admin/add-marquee" element={<CreateMarquees />} />
            <Route exact path="/admin/edit-marquee/:id" element={<EditMarquees />} />

          </Route>

          <Route path="*" element={<NotFound />} />





        </Routes>
      </Provider>
      <Footer />
    </Router >
  );
}

export default App;
