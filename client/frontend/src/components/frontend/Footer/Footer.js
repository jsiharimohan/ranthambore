import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import axios from 'axios'
import swal from 'sweetalert'

export default function Footer() {

    const [phone, setPhone] = useState('');
    const [altPhone, setAltPhone] = useState('');
    const [altSecondPhone, setAltSecondPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const getContactInfo = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/settings/contact`).then(res => {

            if (res.status === 200) {
                setPhone(res.data.data.value.phone);
                setAltPhone(res.data.data.value.altphone);
                setAltSecondPhone(res.data.data.value.altphone2);
                setEmail(res.data.data.value.email);
                setAddress(res.data.data.value.address);
            } else {
                swal("Warning", res.data.error.message, "warning");
            }
        }).catch(error => {
            swal("Warning", error, "warning");
        })
    }

    useEffect(() => {
        getContactInfo();
    }, []);


    const location = useLocation();
    const isAdminurl = location.pathname.split("/")[1];

    if (isAdminurl === 'admin') {
        return null;
    }

    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-xs-12">
                        <div className="socialmedia">
                            <ul className="social-circle list-inline">
                                <li className='list-inline-item'>
                                    <a className="icoFacebook" href="#!" title="Facebook">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a className="icoYoutube" href="#!" title="Twitter">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a className="icoInstagram" href="#!" title="Email">
                                        <i className="fa fa-envelope"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <div className="footerinfo">
                            <div className="footerlogo">
                                <Link to="/">
                                    <img alt="Ranthambore Safari" className="img-responsive" src="../image/logo-white.png" />
                                </Link>
                            </div>
                            <ul className="list-inline">
                                <li className='list-inline-item' style={{ listStyle: "disc" }}>
                                    <Link to="/about-us">About Us</Link>|
                                </li>
                                <li className='list-inline-item' style={{ listStyle: "disc" }}>
                                    <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>|
                                </li>
                                <li className='list-inline-item' style={{ listStyle: "disc" }}>
                                    <Link to="/privacy-policy">Privacy Policy</Link>|
                                </li>
                                <li className='list-inline-item' style={{ listStyle: "disc" }}>
                                    <Link to="/cancellation-policy">Cancellation Policy</Link>|
                                </li>
                                <li className='list-inline-item' style={{ listStyle: "disc" }}>
                                    <a target="/blank" href="https://blog.ranthamboretigerreserve.in/">Blog</a>|
                                </li>
                                <li className='list-inline-item' style={{ listStyle: "disc" }}>
                                    <Link to="/contact-us">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-3 col-xs-12">
                        <div className="enquiry">
                            <div className="footeremail">
                                <div className="emailicon">
                                    <img alt="Email" src="../image/icons/mailicon.png" />
                                </div>
                                <a href={`mailto:${email}`}>{email}</a>
                            </div>
                            <div className="footercontact">
                                <div className="callicon">
                                    <img alt="Call" src="../image/icons/callicon.png" />
                                </div>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="tel:7838498645">{phone}</a>
                                    </li>
                                    <li>
                                        <a href="tel:7289842772">{altPhone}</a>
                                    </li>
                                    <li>
                                        <a href="tel:9718717119">{altSecondPhone}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
