import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ContentImage({ hotels, counterkey }) {

    const HSURL = process.env.REACT_APP_HOTEL_SERVER_URL;

    return (

         <Carousel autoPlay={true} showThumbs={false} infiniteLoop>

         {hotels?.map((list, lindex) => (

                <div key={lindex}>
                    <h5>{list.name}</h5>
                    <img src={`${HSURL}/${list.package_image}`} />
                </div>

                ))}
            </Carousel>

 
    )
}
