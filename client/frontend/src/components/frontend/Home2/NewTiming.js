import React from 'react'

export default function NewTiming() {
  return (
    <div className='container'>
        <div className='new-timing'>
            <h3 className='common-title'>Safari Zone & Timings</h3>
            <div className='row'>
                <div className='col-sm-6'>
                    <div className='leafBg'>
                        <h5>Safari Zones</h5>
                        <ul className="list-group">
                            <li>
                            <img src='../image/icons/approved.png' className='img-fluid' alt='Check' />  Zone will be allowed as per availability
                            </li>
                            <li>
                                <img src='../image/icons/approved.png' className='img-fluid' alt='Check' /> Visitor can select either Zone 1 to 7 or 8 to 10
                            </li>
                            <li>
                                <img src='../image/icons/approved.png' className='img-fluid' alt='Check' /> There are 10 Safari Zone in Ranthambore National park
                            </li>
                            <li>
                                <img src='../image/icons/approved.png' className='img-fluid' alt='Check' /> If you select Safari for 1 to 7 Zone that means your safari will be conducted in any one Zone, same as for Zone 8 to 10
                            </li>
                            <li>
                                <img src='../image/icons/approved.png' className='img-fluid' alt='Check' /> In Case of current booking any of the zone between 1 and 10 can be alloted
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-sm-6'>
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
            </div>
            <p className='note-timing'><strong>Note:</strong> In case your safari is not booked due to reasons like technial error or non-availability of seat, we will refund the whole amount in your given bank account. The same would be communicated accordingly. </p>
        </div>
    </div>
  )
}
