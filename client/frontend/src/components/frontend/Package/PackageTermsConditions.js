import React from 'react'

export default function PackageTermsConditions({ packages }) {
  return (
    <div className="termsinfo" id="terms-conditions">
      <div className="container sectionFrame">
        <div className="row">
          <div className="col-sm-12 col-xs-12">
            <h6>Terms &amp; conditions</h6>
            <div className="itinerary-info">
              <ul className="list-unstyled">
                {packages?.terms?.map((list, lindex) => (

                  <li key={`term${lindex}`}>
                    <span><i className='fa fa-check'></i> {list.term}</span>
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
