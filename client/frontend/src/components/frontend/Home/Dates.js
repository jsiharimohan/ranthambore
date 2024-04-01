import React, { useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import swal from 'sweetalert'
import axios from 'axios';
import moment from 'moment';

import BookSafari from './BookSafari'

export default function Dates() {

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

    const [booking_date , setBookingDate] = useState([]);

    const [details , setDetails] = useState([]);

    const [ date ,setDate ] = useState();
    const [ setTiming ] = useState();
    const [ setVehicle ] = useState();
    const [ setZone ] = useState();
    const [zones , setZones] = useState([]);
    const [timings , setTimings] = useState([]);
    const [vehicles , setVehicles] = useState([]);


    const handleDateSelect = (selectInfo) => {
  
      const data = {
        "date": selectInfo
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
            setDetails([]);
              setBookingDate([]);
              swal("Warning", res.data.error.message, "warning");
          }
      }).catch(error => {
            swal("Warning", error, "warning");
      })
  }

    const handleDateSelect1 = (selectInfo) => {
  
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
            setDetails([]);
              setBookingDate([]);
              swal("Warning", res.data.error.message, "warning");
          }
      }).catch(error => {
            swal("Warning", error, "warning");
      })
  }

  return (
    <section id='select-date'>
        <div className='container sectionFrame'>
            <h3 className='text-2xl'>Please select the dates</h3>
            <div className='row'>
                <div className='col-sm-6 col-xs-12'>
                <div className='n2rCalendar'>
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
                    selectAllow= { function(select) {
                        return moment().diff(select.start, 'days') <= 0
                     }}
                  
                    select={handleDateSelect1}
                    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                    />
                </div>
                </div>
                <div className='col-sm-6 col-xs-12'>
                    { details && <BookSafari zones = {zones} timings = {timings} vehicles = {vehicles} bookingDate  = {booking_date} date = {date} /> }
                </div>
            </div>
        </div>
    </section>
  )
}
