import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import axios from 'axios'
import swal from 'sweetalert'

export default function TopHead() {
    const [phone, setPhone] = useState('');
    const [altPhone, setAltPhone] = useState('');
    const [altSecondPhone, setAltSecondPhone] = useState('');
    const [email, setEmail] = useState('');

    const getContactInfo = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/settings/contact`).then(res => {

            if (res.status === 200) {
                setPhone(res.data.data.value.phone);
                setAltPhone(res.data.data.value.altphone);
                setAltSecondPhone(res.data.data.value.altphone2);
                setEmail(res.data.data.value.email);
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
        <div className="top-header">
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-xs-12">
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href={`tel:${phone}`}><img alt="Call" src="../image/icons/callicon.png" /> {phone}</a>|</li>
                            <li className="list-inline-item"><a href={`tel:${altPhone}`}>{altPhone}</a>|</li>
                            <li className="list-inline-item"><a href={`tel:${altSecondPhone}`}>{altSecondPhone}</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-4 col-xs-12">
                        <div className="email-sec"><a href={`mailto:${email}`}><img alt="Email" src="../image/icons/mailicon.png" /> {email}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
