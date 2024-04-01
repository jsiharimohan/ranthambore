import React, { useState, useEffect } from 'react'
import SafariZone from '../../components/frontend/Home/SafariZone'
import AboutSafari from '../../components/frontend/Safari/AboutSafari'
import BookingProcedure from '../../components/frontend/Safari/BookingProcedure'
import FormSafariBooking from '../../components/frontend/Safari/FormSafariBooking'
import InfoSafariBooking from '../../components/frontend/Safari/InfoSafariBooking'
import TransportMode from '../../components/frontend/Safari/TransportMode'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import swal from 'sweetalert'
import axios from 'axios';
import moment from 'moment';
import SafariTiming from '../../components/frontend/Home2/SafariTiming'
import Newzone from '../../components/frontend/Home2/Newzone'
import {Helmet} from "react-helmet";

export default function OnlineSafariBooking() {

    const [marquee,setMarquee] = useState('');

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/marquees`).then((res)=>{
            setMarquee((res.data.data[0].content == 'Marquee Content') ? '' : res.data.data[0].content);
        });
    },[])

    document.addEventListener("touchstart", function (ev) {
        let dt = ev.target.parentNode.parentNode.parentNode.getAttribute('data-date');
        if(dt != null){
            var telems  = document.querySelectorAll(".fc-daygrid-day-frame");
            [].forEach.call(telems, function(el) {
                el.classList.remove("fc-highlight");
            });
            let trow = document.querySelector("td[data-date='"+dt+"'] .fc-daygrid-day-frame");
            trow.classList.add('fc-highlight');
            handleDateSelect(dt);
        }
    }, false);

    const [booking_date, setBookingDate] = useState([]);
    const [date, setDate] = useState();
    const [setTiming] = useState();
    const [setVehicle] = useState();
    const [setZone] = useState();
    const [zones, setZones] = useState([]);
    const [timings, setTimings] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const handleDateSelect = (selectInfo) => {

        
    
        setZones([]);
        setTimings([]);
        setVehicles([]);

        const data = {
            "date": selectInfo
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/safari/checkAvilabilityByDate`, data).then(res => {
            if (res.status === 200) {
                setZones(res.data.zones);
                setTimings(res.data.timings);
                setVehicles(res.data.vehicles);
                setBookingDate(res.data.data);
                setDate(res.data.data[0].date);
                setTiming(res.data.data[0].timing);
                setVehicle(res.data.data[0].vehicle);
                setZone(res.data.data[0].zone);
            } else {
                setBookingDate([]);
                swal("Warning", res.data.error.message, "warning");
            }
        }).catch(error => {
            swal("Warning", error, "warning");
        })
    }


      const handleDateSelect1 = (selectInfo) => {

        setZones([]);
        setTimings([]);
        setVehicles([]);


      var elems  = document.querySelectorAll(".fc-daygrid-day-frame");
  
      [].forEach.call(elems, function(el) {
          el.classList.remove("fc-highlight")
  
      });
  
      let row = document.querySelector("td[data-date='"+selectInfo.startStr+"'] .fc-daygrid-day-frame");
      row.classList.add('fc-highlight');
  
      const data = {
        "date": selectInfo.startStr
      }
  
      axios.post(`${process.env.REACT_APP_BASE_URL}/safari/checkAvilabilityByDate`, data).then(res => {
            console.log("res", res);
          if (res.status === 200) {
              setZones(res.data.zones);
              setTimings(res.data.timings);
              setVehicles(res.data.vehicles);
              setBookingDate(res.data.data);
              setDate(res.data.data[0].date);
              setTiming(res.data.data[0].timing);
              setVehicle(res.data.data[0].vehicle);
              setZone(res.data.data[0].zone);
          } else {
              setBookingDate([]);
              swal("Warning", res.data.error.message, "warning");
          }
      }).catch(error => {
            swal("Warning", error, "warning");
      })
  }

    return (
        <>
        <Helmet>
            <title>Ranthambore Safari Booking</title>
            <meta name="description" content="Discover the wild side of Rajasthan with Ranthambore National Park Safari Safari Booking. Our online platform makes it easy to book your safari tour and embark on an exciting adventure through the park. Witness the majestic Royal Bengal Tigers and other exotic wildlife in their natural habitat. Choose from a variety of safari options and create unforgettable memories on your trip to Ranthambore. Start planning your adventure today!" />
        </Helmet>
        <section id='safaribanner'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-6 col-xs-12 padding-left-zero'>
                        <div className='safaribgmain'>
                            <img alt="Safari" class="img-responsive" src="../image/safari-banner.png" />
                        </div>
                    </div>
                    <div className='col-sm-6 col-xs-12 goWild'>
                        <h1>Ranthambore Safari Booking</h1>
                        <marquee style={{ color: 'red', fontSize: '2em' }}>{marquee}</marquee>
                        <FullCalendar
                            longPressDelay={0}
                            eventLongPressDelay={0}
                            selectLongPressDelay={0}
                            defaultView="dayGridMonth"
                            displayEventTime={true}
                            header={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                            }}
                            editable={true}
                            selectable={true}
                            selectAllow={function (select) {
                                return moment().diff(select.start, 'days') <= 0
                            }}
                            select={handleDateSelect1}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        />
                        <div className='onlineSafariB'>
                            <FormSafariBooking zones={zones} timings={timings} vehicles={vehicles} bookingDate={booking_date} date={date} />
                        </div>
                    </div>
                </div>

            </div>

            <InfoSafariBooking />
            <SafariTiming />
            <Newzone />
            <AboutSafari />
            <BookingProcedure />
            <TransportMode />
        </section>
        </>
        
    )
}
