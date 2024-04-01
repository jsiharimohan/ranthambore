import React from 'react'

export default function TourDetails({ packages }) {
    return (
        <div className='packages-view'>
            <div className='container sectionFrame'>
                <div className='packages-views'>
                    <h1>{packages?.package?.name}</h1>
                    <div class="rating">
                        {[...Array(packages?.package?.rating)].map((star, index) => {
                            return (<span key={index} className="fa fa-star checked"></span>)

                        })}


                    </div>
                    <div className="package-detail">
                        <ul className="list-unstyled">

                            {packages?.package?.features.map((list, lindex) => (

                                <li key={list._id}>
                                    <span><i className='fa fa-check'></i> {list.feature}</span>
                                </li>

                            ))}


                        </ul>
                    </div>
                    <div className='ndes'>
                        <p>{packages?.package?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
