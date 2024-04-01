import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import CurrentBooking from '../Home/CurrentBooking'
import Logo from './Logo.svg'

export default function Header() {

    const location = useLocation();
    const isAdminurl = location.pathname.split("/")[1];

    if(isAdminurl === 'admin') {
        return null;
    }
    



  return (
    <>
    <header className="d-none d-sm-block">
        <div className="container">
            <div className="row">
            <div className="col-sm-5">
                <div className="menuleft">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="active" to="/online-ranthambore-safari-booking">Online Safari booking</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/online-Chambal-moter-boat-safari-booking">Chambal Safari booking
                         <span><img alt="gif" src="../image/icons/new-blinking.gif" /></span>
                        </Link>
                    </li>
                </ul>
                </div>
            </div>
            <div className="col-sm-2 logo-padding">
                <div className="logo">
                    <Link to="/">
                        <svg width="195" height="62" xmlns="http://www.w3.org/2000/svg">      
                            <image href={Logo} width="195" height="62"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className="col-sm-5">
                <div className="menuright">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link to="/hotels">Ranthambore Hotels</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/ranthambore-packages">Ranthambore Packages</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/contact-us">Contact Us</Link>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
    </header>

    {/* Mobile Header */}

    <div className="mobileheader d-sm-none d-md-none d-lg-none d-xl-none">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                <img alt="Ranthambore Safari" className="img-responsive" src="../image/Logo.svg" />
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="nav navbar-nav">
                    <li className='nav-item nav-link'>
                        <a className="active" href="/online-ranthambore-safari-booking">Online Safari booking</a>
                    </li>
                    <li className='nav-item nav-link'>
                        <a href="/online-Chambal-moter-boat-safari-booking">Chambal Safari booking</a>
                    </li>
                    <li className='nav-item nav-link'>
                        <a data-target="#myModal" data-toggle="modal" href="#">Current Booking</a>
                    </li>
                    <li className='nav-item nav-link'>
                        <a href="/about-us">About Ranthambore</a>
                    </li>
                    <li className='nav-item nav-link'>
                        <a href="/hotels">Ranthambore Hotels</a>
                    </li>
                    <li className='nav-item nav-link'>
                        <a href="/ranthambore-packages">Ranthambore Packages</a>
                    </li>
                    <li className='nav-item nav-link'>
                        <a href="https://blog.ranthamboretigerreserve.in/" target="_blank">Blog</a>
                    </li>
                    <li className='nav-item nav-link'>
                        <a href="/contact-us">Contact Us</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <CurrentBooking/>
    </>
  )
}
