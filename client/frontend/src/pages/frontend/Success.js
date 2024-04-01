import React from 'react'
import { Link } from 'react-router-dom'

export default function Success() {

  localStorage.removeItem('NewUsers');
  localStorage.removeItem('selPhone');
  localStorage.removeItem('selName');
  localStorage.removeItem('selZone');
  localStorage.removeItem('selVehicle');

  return (
    <div className="container" style={{minHeight: "600px"}}>
        <div className="thankyoupage">
            <h1>Thank you for submit current booking request, our representative will contact you shortly.</h1>
            <h3>For any query please contact + 91 7838 4986 45</h3>
            <div>&nbsp;</div>
            <div className="text-center">
            <Link className="btn btn-primary" to="/">
                <span className="fa fa-home"></span> Back to Home </Link>
            </div>
        </div>
    </div>
  )
}
