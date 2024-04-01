import React from 'react'
import MainBanner from '../../components/frontend/Banner/MainBanner'
import Attraction from '../../components/frontend/Home/Attraction'
import Blogs from '../../components/frontend/Home/Blogs'
import Dates from '../../components/frontend/Home/Dates'
import HomeTabs from '../../components/frontend/Home/HomeTabs'
import Info from '../../components/frontend/Home/Info'
import SafariZone from '../../components/frontend/Home/SafariZone'
import Timing from '../../components/frontend/Home/Timing'
import {Helmet} from "react-helmet";

export default function Home() {
  <Helmet>
  <title>Ranthambore National Park Online Booking Website</title>
  <meta name="description" content="Book your safari tour at Ranthambore National Park through our user-friendly website. Witness the awe-inspiring Royal Bengal Tigers and explore the natural beauty of Rajasthan. Choose from a range of safari options, including open gypsies, canter safaris, and private tours, to make the most of your wildlife adventure. Plan your trip now and get ready for an unforgettable experience in the wild." />
</Helmet>
  return (
    <>
    <MainBanner/>
    <Dates/>
    <Timing/>
    <SafariZone/>
    <Info/>
    <Attraction/>
    <HomeTabs/>
    <Blogs/>
    </>
  )
}
