import React from 'react'

export default function ContentImage({ hotels, counterkey }) {

    const HSURL = process.env.REACT_APP_HOTEL_SERVER_URL;

    return (
        <div id={`romType${counterkey}`} className="carousel slide" data-ride="carousel">
            <ul className="carousel-indicators">

                {hotels?.map((list, lindex) => (
                    <li key={lindex} data-target={`#romType${counterkey}`} data-slide-to={lindex} className={`${lindex === 0 ? 'active' : ''}`}></li>
                ))}
            </ul>
            <div className="carousel-inner">

                {hotels?.map((list, lindex) => (


                    <div key={lindex} className={`carousel-item ${lindex === 0 ? 'active' : ''}`} >
                        <h5>{list.name}</h5>
                        <img src={`${HSURL}/${list.package_image}`} alt="Los Angeles" className='img-fluid' />
                    </div>

                ))}
            </div>
            <a className="carousel-control-prev" href={`#romType${counterkey}`} data-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href={`#romType${counterkey}`} data-slide="next">
                <span className="carousel-control-next-icon"></span>
            </a>
        </div>
    )
}
