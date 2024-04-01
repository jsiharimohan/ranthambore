import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CardStats from "./CardStats";

export default function HeaderStats({ total_enquiries }) {

  const [hotelCount, setHotelCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [packageCount, setPackageCount] = useState(0);


  const getHotelCount = async () => {
    try {

      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/dashboard/`);

      setHotelCount(result.data.hotel_count);

    } catch (err) {
      console.log('err', err)

    }

    try {

      const resultCustomer = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/customers/dashboard/`);

      setCustomerCount(resultCustomer.data.data);

    } catch (err) {
      console.log('err', err)

    }


    try {

      const resultPackage = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/dashboard/`);

      setPackageCount(resultPackage.data.package_count);

    } catch (err) {
      console.log('err', err)

    }
  }

  useEffect(() => {
    getHotelCount();
  }, []);


  return (
    <>
      {/* Header */}
      <div className="relative bg-default-skin md:pt-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statBgColor="bg-hotel-maroon"
                  statSubtitle="Hotels"
                  statTitle={hotelCount}
                  statDescripiron="Total hotels available"
                  statIconName="fas fa-hotel"
                  statIconColor="text-white"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statBgColor="bg-package-maroon"
                  statSubtitle="Packages"
                  statTitle={packageCount}
                  statDescripiron="Added for Gir"
                  statIconName="fas fa-chart-pie"
                  statIconColor="text-white"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statBgColor="bg-customer-brown"
                  statSubtitle="Enquiries"
                  statTitle={total_enquiries}
                  statDescripiron="Since 2022"
                  statIconName="fas fa-users"
                  statIconColor="text-white"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statBgColor="bg-enquiry-brown"
                  statSubtitle="Customers"
                  statTitle={customerCount}
                  statDescripiron="Registered up to now"
                  statIconName="fas fa-percent"
                  statIconColor="text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
