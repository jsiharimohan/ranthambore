import React from 'react'

export default function PackagePaymentPolicy({ packages }) {
  return (
    <div className="termsinfo" id="paymentPolicy">
      <div className="container sectionFrame">
        <div className="row">
          <div className="col-sm-12 col-xs-12">
            <h6>Payment Policy</h6>
            <div className="itinerary-info">
              <ul className="list-unstyled">

                {packages?.payment_policies?.map((list, lindex) => (

                  <li key={`pp${lindex}`}>
                    <span><i className='fa fa-check'></i> {list.policy}</span>
                  </li>

                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
