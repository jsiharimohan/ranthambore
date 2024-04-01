import React from 'react'

export default function Timing() {
  return (
    <section id='jungle-safari'>
        <div className="container sectionFrame">
        <h3 className='text-2xl'>Jungle Safari Timing</h3>
        <div className="row">
            <div className="col-sm-6 col-xs-12">
            <div className="timetable">
                <div className="row margin0">
                <div className="col-sm-5 col-xs-6 padding-right-zero">
                    <div className="tableMonths">
                    <span className="headtop">Months</span>
                    <ul className="list-unstyled">
                        <li className="tbg">From 1st Oct to 31st Oct:</li>
                        <li>From 1st Nov to 31st Jan:</li>
                        <li className="tbg">From 1st Feb to 31st Mar:</li>
                        <li>From 1st April to 15th May:</li>
                        <li>From 16th May to 30th June:</li>
                        <li className="tbg" style={{borderBottom: "none"}}>From 16th May to 30th June:</li>
                    </ul>
                    </div>
                </div>
                <div className="col-sm-7 col-xs-6 padding-left-zero padding-right-zero">
                    <div className="tableTiming">
                    <span className="headtop">Safari Timings:</span>
                    <ul className="list-inline">
                        <li className="tbg">
                        <span>06:30 am - 10:00 am &amp; 02:30 pm - 06:00 pm</span>
                        </li>
                        <li>
                        <span>07:00 am - 10:30 am &amp; 02:00 pm - 05:30 pm</span>
                        </li>
                        <li className="tbg">
                        <span>06:30 am - 10:00 am &amp; 02:30 pm - 06:00 pm</span>
                        </li>
                        <li>
                        <span>06:00 am - 09:30 am &amp; 03:00 pm - 06:30 pm</span>
                        </li>
                        <li>
                        <span>06:00 am - 09:30 am &amp; 03:30 pm - 07:00 pm</span>
                        </li>
                        <li className="tbg" style={{borderBottom: "none"}}>
                        <span>06:00 am - 09:30 am &amp; 03:30 pm - 07:00 pm</span>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="col-sm-6 col-xs-12">
            <div className="safariimg">
                <img className="img-responsive" src="../image/safari-timetable.png" alt='Safari Timings' />
            </div>
            </div>
        </div>
        </div>
    </section>
  )
}
