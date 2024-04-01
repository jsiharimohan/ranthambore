import React from 'react'

export default function PackagePolicy({ packages }) {
    return (
        <div className="termsinfo" id="cancellation">
            <div className="container sectionFrame">
                <div className="row">
                    <div className="col-sm-12 col-xs-12">
                        <h6>Policy Regarding Cancellation/ No Show / Early Departure</h6>
                        <p>In case if you are postponing or cancelling your tour/travel due to any unavoidable reasons, you must intimate us in writing. Please make it sure that cancellation charges would be effective from the date we receive your mail in writing. Following cancellation policy would be applicable:</p>
                        <div className="itinerary-info">
                            <ul className="list-unstyled">
                                {packages?.cancellation_policies?.map((list, lindex) => (

                                    <li key={`cp${lindex}`}>
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
