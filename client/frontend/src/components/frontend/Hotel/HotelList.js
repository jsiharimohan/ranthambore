import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import axios from 'axios';

export default function HotelList() {

    const [hotels, setHotels] = useState([]);


    const [pageCount, setpageCount] = useState(0);
    const [page, setPage] = useState(1);
    const HSURL = process.env.REACT_APP_HOTEL_SERVER_URL;

    //let limit = 10;


    useEffect(() => {

        const getHotels = async () => {

            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/front?page=${page}`, {
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                    },
                });


                setHotels(result.data.data);
                setpageCount(Math.ceil(result.data.hotels.total / result.data.hotels.per_page));
                setPage(result.data.hotels.current_page);


            } catch (err) {

            }

        }

        getHotels();
    }, [page]);





    const paginationData = async (currentPage) => {
        const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/hotel/hotels/front?page=${currentPage}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }
        );
        const data = await res.json();

        return data
    };

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        const result = await paginationData(currentPage);
        setHotels(result.hotels.data);
    };



    return (

        <>
            <>
                {hotels && hotels.map((item, index) => (
                    
                    <div key={index} className="row H-listrow">
                        <div className="col-sm-5 col-xs-12 padding-left">
                            <div className="image img-wrapper">
                                <Link to={`/hotel-details/${item.slug}`}>
                                    <img src={(`${HSURL}/${item.image}`)} className="img-responsive inner-img" alt='{item.name}' />
                                </Link>
                            </div>
                        </div>
                        <div className="col-sm-7 col-xs-12 padding-left">
                            <div className="corbett-hotels-list">
                                <div className="hotel-content">
                                    <Link to={`/hotel-details/${item.slug}`}>
                                        <h3>{item.name}</h3>
                                        <div className="rating">


                                            {[...Array(item.rating)].map((star, index) => {

                                                return (<span className="fa fa-star checked"></span>)

                                            })}
                                        </div>
                                        <p>{item.description.length > 120 ? item.description.substring(0, 120) + "..." : item.description}</p>
                                        <div className="Resort">
                                            <ul className="list-inline">

                                                {item.amenities && item.amenities.slice(0, 3).map((list, lindex) => (

                                                    <li key={lindex} className='list-inline-item'>
                                                        <span> {list.amenity.amenity}</span>
                                                    </li>

                                                ))}

                                            </ul>
                                        </div>
                                        <div className="Hotel-location">
                                            <span>
                                                <i className="fa fa-map-marker"></i> Hotel Location </span>
                                        </div>
                                        <div className="Resort-location">
                                            <ul className="list-unstyled">
                                                <li>
                                                    <span>
                                                        <i className="fa fa-compass"></i>{item.address} </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="Resort-price">
                                            <strong>Price:</strong>
                                            <b>INR {item.price}</b>
                                        </div>
                                    </Link>
                                    <div className="findButton">
                                        <Link to={`/hotel-details/${item.slug}`} className="btn btn-danger">View Hotel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                ))
                }

            </>

            <>

                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </>

        </>

    )
}
