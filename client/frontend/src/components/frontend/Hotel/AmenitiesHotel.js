import React from 'react'

export default function AmenitiesHotel({ amenities, index }) {
    const detail = amenities.hotel_amenities;
    const HSURL = process.env.REACT_APP_HOTEL_SERVER_URL;



    return (
        <div key={index} className="Hotel-Amenities">
            <h2>Hotel Amenities</h2>
            <ul className="list-inline">

                {detail && detail?.map((item, lindex) => (
                    <li key={lindex} className='list-inline-item'>
                        <div className="amenities">
                            <img src={(`${HSURL}/${item.amenity.image}`)} alt={item.amenity.amenity} />
                            <span>{item.amenity.amenity}</span>
                        </div>
                    </li>
                ))}


            </ul>
        </div>
    )
}
