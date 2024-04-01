import React from 'react'
import PackageRooms from './PackageRooms'

export default function PackageItems({ packages }) {
    return (
        <>
            {/* Targeted headings */}
            <div className="cont-detail">
                <div className="container sectionFrame">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <div className="tabs-nav2">
                                <ul className="list-inline">
                                    <li className='list-inline-item'>
                                        <a href="#Overview" className="">Tour Itinerary</a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a href="#terms-conditions" className="">Terms &amp; conditions</a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a href="#cancellation" className="">Cancellation Policy</a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a href="#paymentPolicy" className="">Payment Policy </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inclusion / Exclusion */}
            <div className="inclusions-Exc">
                <div className="container sectionFrame">
                    <div className="row">
                        <div className="col-sm-6 col-xs-12">
                            <div className="inclus">
                                <h5>Inclusions </h5>
                                <ul className="list-unstyled">

                                    {packages?.package?.inclusions.map((list, lindex) => (

                                        <li key={lindex}>
                                            <span><i className='fa fa-check'></i> {list.inclusion}</span>
                                        </li>

                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="inclus">
                                <h5>Exclusions</h5>
                                <ul className="list-unstyled">

                                    {packages?.package?.exclusions.map((list, lindex) => (

                                        <li key={lindex}>
                                            <span><i className='fa fa-check'></i> {list.exclusion}</span>
                                        </li>

                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Package Rooms */}
            <PackageRooms packages={packages} />
        </>

    )
}
