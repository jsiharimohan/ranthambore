import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ReactPaginate from "react-paginate";
import axios from 'axios';

export default function PackageList() {

    const [packages, setPackages] = useState([]);


    const [pageCount, setpageCount] = useState(0);
    const [page, setPage] = useState(1);
    const PSURL = process.env.REACT_APP_PACKAGE_SERVER_URL;

    //let limit = 10;


    useEffect(() => {

        const getPackages = async () => {

            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/front?page=${page}`, {
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                    },
                });


                setPackages(result.data.data);
                setpageCount(Math.ceil(result.data.packages.total / result.data.packages.per_page));
                setPage(result.data.packages.current_page);


            } catch (err) {

            }

        }

        getPackages();
    }, [page]);




    const paginationData = async (currentPage) => {
        const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/package/packages/front?page=${currentPage}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('user')
            },
        }
        );
        const data = await res.json();

        return data
    };

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        const resutl = await paginationData(currentPage);
        setPackages(resutl.packages.data);
    };

    return (

        <>
            <>

                {packages?.map((item, index) => (


                    <div key={index} className="row package-margin">
                        <div className="col-sm-4 col-xs-12 p-0">
                            <div className="package-image">
                                <div className="image-gallery">
                                    <Link to={`/package-details/${item.slug}`}>
                                        <img className="img-responsive" src={(`${PSURL}/${item.image}`)} alt={item.name} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 col-xs-12">
                            <Link to={`/package-details/${item.slug}`}>
                                <div className="packages-listing">
                                    <h2>{item.name} </h2>
                                    <div className="rating">
                                        {[...Array(item.rating)].map((star, index) => {
                                            return (<span className="fa fa-star checked"></span>)

                                        })}
                                    </div>
                                    <p>{item.description.length > 120 ? item.description.substring(0, 120) + "..." : item.description}</p>
                                    <div className="package-detail">
                                        <ul className="list-inline">

                                            {item.features && item.features.slice(0, 3).map((list, lindex) => (

                                                <li className='list-inline-item' key={lindex}>
                                                    <span> {list.feature}</span>
                                                </li>

                                            ))}


                                        </ul>
                                    </div>
                                </div>
                            </Link>
                            <div className="price-from">
                                <h6>Price from</h6>
                                <div className="price">
                                    <i className="fa fa-inr"></i>
                                    <b>{item.price}</b>
                                    <span>Per night</span>
                                </div>
                                <div className="findButton">
                                    <Link to={`/package-details/${item.slug}`} className="btn btn-danger">View More</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}

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
