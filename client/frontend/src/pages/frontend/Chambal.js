import React from 'react'
import ChambalActivities from '../../components/frontend/Chambal/ChambalActivities';
import ChambalBanner from '../../components/frontend/Chambal/ChambalBanner'
import ChambalOptions from '../../components/frontend/Chambal/ChambalOptions'
import '../../css/chambal.css';
import {Helmet} from "react-helmet";

export default function Chambal() {
  return (
    <>
    <Helmet>
        <title>Online Chambal Safari Booking</title>
        <meta name="description" content="Welcome to the website for Chambal Boat Safari Booking. Embark on a tranquil journey through the scenic Chambal River and witness the diverse flora and fauna of the region. Our online platform offers hassle-free booking for boat safari tours, where you can spot the critically endangered Gharial crocodile, Gangetic dolphins, and various species of birds. Choose from a range of boat options and create unforgettable memories on your trip to Chambal. Book now and experience the peace and serenity of the river." />
    </Helmet>
    <ChambalBanner/>
    <ChambalOptions/>
    <ChambalActivities/>
    </>
  )
}
