import React from 'react'
import { Link } from 'react-router-dom'

export default function HolidayTour({ packages }) {
    const data = packages;
   /* packages && packages.map((itm, i) => {
        if (i <= 4 && itm.homepage == 1) {
            data.push(itm);
        }
    });*/

    return (
        <div className='container'>
            <div className='holidays'>
                {data && data.map((d, i) => {
                    if (i == 0) {
                        return <h3 className='common-title'>Book your Holiday Tour Packages</h3>
                    }
                })}

                <div className='row'>
                    {data && data.map((item, i) => {

                        return (<div className='col-sm-3'>
                            <div className='paBox'>
                                <Link to={`/package-details/${item.slug}`}>
                                    <img src={`${process.env.REACT_APP_PACKAGE_SERVER_URL}/` + item.image} className='img-fluid' alt='Holiday Package' />
                                    <h4>{item.name}</h4>
                                    <ul>
                                    {item.features && item.features.map((feature, i) => {
                                        return  <li>{feature.feature}</li>
                                    })}

                                    </ul>
                                    
                                    <h6>₹ {item.price}</h6>
                                    <div className='star-buttons'>
                                        <div className='star'>
                                            <label>{item.rating}.0 <img src='../image/icons/star2.png' className='img-fluid' alt='Rating' /></label>
                                        </div>
                                        <div className='bookButton'>
                                            <button className='btn btn-transparent'>Book Now</button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>)

                    })}
                </div>
            </div>
        </div>
    )
}
/*<p>
                                        {item.inclusions && item.inclusions.map((inc, i) => {

                                            return inc.inclusion + ' ,';
                                        })}
                                    </p>*/