import React from 'react'
import Destination from '../../../components/frontend/Package/Destination'
import PackageBanner from '../../../components/frontend/Package/PackageBanner'
import PackageContent from '../../../components/frontend/Package/PackageContent'
import PackageList from '../../../components/frontend/Package/PackageList'
import TouristAttraction from '../../../components/frontend/Package/TouristAttraction'
import {Helmet} from "react-helmet";

export default function FrontendPackages() {
  return (
    <>
    <Helmet>
        <title>Ranthambore Tour Package</title>
        <meta name="description" content=" Welcome to the  website for Ranthambore Package Booking. We offer a wide range of customizable tour packages to explore the wild side of Rajasthan. Our packages include safari tours, accommodation, transportation, and other activities to make the most of your trip. Whether you're a wildlife enthusiast or a nature lover, our packages cater to all interests and budgets. Book now and create unforgettable memories on your ultimate wildlife adventure in Ranthambore." />
    </Helmet>
    <div className='package-listing-page'>
      <PackageBanner/>
      <PackageContent/>
      <div className='packages-list'>
        <div className='container sectionFrame'>
          <div className='row'>
            <div className='col-sm-9 width70'>
              <PackageList/>
            </div>
            <div className='col-sm-3 width30'>
              <Destination/>
              <br/>
              <TouristAttraction/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
