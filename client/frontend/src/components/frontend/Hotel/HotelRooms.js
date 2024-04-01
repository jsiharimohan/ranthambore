import React from 'react'

export default function HotelRooms({ rooms }) {
  const details = rooms.hotel_rooms;
  const HSURL = process.env.REACT_APP_HOTEL_SERVER_URL;

  const scrollToTop = () => {
    window.scrollTo({
      top: 150,
      behavior: "smooth",
    });
  };


  return (
    <>
      {details && details?.map((item, index) => (

        <div key={index} className="row row-bottom">
          <div className="col-sm-5 col-xs-12 padding-left">
            <div className="room-image img-wrapper">
              <img src={(`${HSURL}/${item.image}`)} alt='Hotel Room' className="img-responsive inner-img" />
            </div>
          </div>
          <div className="col-sm-7 col-xs-12">

            <div className="room-detail">
              <h4>{item.room}</h4>
              <ul className="list-unstyled">

                {item && item.facilities?.map((list, lindex) => (

                  <li key={lindex}>
                    <span className="icon"><i className='fa fa-check'></i></span><span className="text">{list.facility}</span>
                  </li>
                ))}

              </ul>
              <div className="findButton">
                <button onClick={scrollToTop} className="btn btn-danger btn-lg">Book Now</button>
              </div>
            </div>
          </div>

        </div>
      ))}
    </>

  )
}
