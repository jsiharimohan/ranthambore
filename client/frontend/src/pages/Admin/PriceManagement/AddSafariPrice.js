import React  , { useState } from "react";
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from '../../../components/Admin/Navbar/AdminNavbar';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddSafariPrice() {

  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/> 
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
          <h1 className='text-2xl text-black font-bold mb-3'>Add Safari Prices</h1>
          <form className='mt-4 shadow-md p-4 rounded bg-white'>
            <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <a href="#tabs-indian" className="nav-link block active" id="tabs-indian-tab" data-bs-toggle="pill" data-bs-target="#tabs-indian" role="tab" aria-controls="tabs-indian" aria-selected="true">Indian</a>
              </li>
              <li className="nav-item ml-2" role="presentation">
                <a href="#tabs-foreigner" className="
                  nav-link block" id="tabs-foreigner-tab" data-bs-toggle="pill" data-bs-target="#tabs-foreigner" role="tab" aria-controls="tabs-foreigner" aria-selected="false">Foreigner</a>
              </li>      
            </ul>
            <div className="tab-content" id="tabs-tabContent">
              <div className="tab-pane fade show active" id="tabs-indian" role="tabpanel" aria-labelledby="tabs-indian-tab">
                <div className='setPrices'>
                  <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Start Date</label>
                      <DatePicker 
                      selected = {startDate} 
                      value = {startDate} 
                      onChange={(date) => setStartDate(date)}/>
                  </div>
                  <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">End Date</label>
                      <DatePicker 
                      selected = {EndDate} 
                      value = {EndDate} 
                      minDate={moment().toDate()}
                      />
                  </div>
                </div>
                {/* Adult Price */}
                <div className="grid grid-cols-6 gap-4">
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 1</label>
                    <input type="number" id="adult1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 2</label>
                    <input type="number" id="adult2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 3</label>
                    <input type="number" id="adult3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 4</label>
                    <input type="number" id="adult4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 5</label>
                    <input type="number" id="adult5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 6</label>
                    <input type="number" id="adult6" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                </div>
                {/* Child Price */}
                <div className="grid grid-cols-6 gap-4 mt-2">
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 1</label>
                    <input type="number" id="child1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 2</label>
                    <input type="number" id="child2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 3</label>
                    <input type="number" id="child3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 4</label>
                    <input type="number" id="child4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 5</label>
                    <input type="number" id="child5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 6</label>
                    <input type="number" id="child6" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                </div>
                <div className='mt-2'>
                  <button type="button" onClick = {HandleAddSafari}
                  className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                </div>     
              </div>

              <div className="tab-pane fade" id="tabs-foreigner" role="tabpanel" aria-labelledby="tabs-foreigner-tab">
                <div className="grid grid-cols-6 gap-4">
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 1</label>
                    <input type="number" id="adult1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 2</label>
                    <input type="number" id="adult2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 3</label>
                    <input type="number" id="adult3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 4</label>
                    <input type="number" id="adult4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 5</label>
                    <input type="number" id="adult5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Adult 6</label>
                    <input type="number" id="adult6" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                </div>

                {/* Child Price */}
                <div className="grid grid-cols-6 gap-4 mt-2">
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 1</label>
                    <input type="number"  id="child1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 2</label>
                    <input type="number" id="child2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 3</label>
                    <input type="number" id="child3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 4</label>
                    <input type="number" id="child4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 5</label>
                    <input type="number" id="child5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Child 6</label>
                    <input type="number" id="child6" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                </div>
                <div className='mt-2'>
                  <button type="button" onClick = {HandleAddSafari}
                  className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}
