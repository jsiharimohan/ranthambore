import React, { useEffect, useState } from 'react'
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function FinalPackageBooking() {
    const navigate = useNavigate();
    const [agree, setAgree] = useState(false);
    const [razorpaykey, setRazorpaykey] = useState('');

    let packageBookingInfo = localStorage.getItem("bookingData");
    const packageCustomerId = localStorage.getItem("package_customer_id");
    const bookingId = localStorage.getItem("package_booking_id");

    if (packageBookingInfo !== null && packageBookingInfo !== 'null') {
        packageBookingInfo = JSON.parse(packageBookingInfo);

    } else {
        window.location.href = "/ranthambore-packages";
    }

    const alert = useAlert();
    const gstPerc = 5;



    let amountText = parseInt(packageBookingInfo?.amount)
    let gstAmountText = amountText * (gstPerc / 100);
    let totalAmountText = amountText + gstAmountText;

    const checkboxHandler = () => {
        setAgree(!agree);
    }


    


    const HandleHalfPayment = () => {

        let amount = parseInt(packageBookingInfo?.amount) / 2;
        let gstAmount = (parseInt(packageBookingInfo?.amount) / 2) * (gstPerc / 100);
        let totalAmount = amount + gstAmount;


        if ((packageBookingInfo?.amount === '' || bookingId == '')) {
            alert.error("Data are missing please try again!");
            return true;
        } else {
            const options = {

                // key: credentials.razorpay_key,
                key: 'rzp_test_FvMwf7j3FOOnh8',
                // amount: PayAmount+('00').toString(),
                amount: Math.round(totalAmount * 100),
                currency: "INR",
                name: "Ranthambore",
                description: "Test Transaction",
                image: "/image/logo.png",

                handler: async function (response) {

                    const data = {
                        customer_id: packageCustomerId,
                        amount: totalAmount,
                        transaction_id: response.razorpay_payment_id,
                        booking_id: bookingId,
                    }

                    //successPay
                    axios.post(`${process.env.REACT_APP_BASE_URL}/admin/payment/package/${bookingId}`, data).then(result => {
                        localStorage.removeItem("bookingData");
                        localStorage.removeItem("package_booking_id");

                        alert.success("Successfully Booked!");
                        navigate('/thankyou');
                    }).catch(function (error) {
                        alert.error(error.response.data.error.message);
                    });

                },
                prefill: {
                    name: packageBookingInfo.name,
                    email: packageBookingInfo.email,
                    contact: packageBookingInfo.mobile,
                },
                notes: {
                    address: "Ranthambore",
                },
                theme: {
                    color: "#61dafb",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }

    }



    const HandlePayment = () => {

        if (!agree) {
            alert.error('Please accept terms and conditions first!');
        }else{

        let amount = parseInt(packageBookingInfo.amount)
        let gstAmount = amount * (gstPerc / 100);
        let totalAmount = amount + gstAmount;


        if ((packageBookingInfo.amount === '' || bookingId == '')) {
            alert.error("Data are missing please try again!");
            return true;
        } else {
            var amountN = totalAmount + totalAmount*0.03;
            const options = {

                // key: credentials.razorpay_key,
                key: razorpaykey,
                // amount: PayAmount+('00').toString(),
                amount: Math.round(amountN * 100),
                currency: "INR",
                name: "Ranthambore Jungle Safari",
                description: "Ranthambore Jungle Safari Pay for Booking",
                image: "/static/media/Logo.463247709567bbe71e26.png",

                handler: async function (response) {

                    const data = {
                        customer_id: packageCustomerId,
                        amount: packageBookingInfo.amount,
                        transaction_id: response.razorpay_payment_id,
                        booking_id: bookingId,
                    }

                    //successPay
                    axios.post(`${process.env.REACT_APP_BASE_URL}/admin/payment/package/${bookingId}`, data).then(result => {
                        localStorage.removeItem("bookingData");
                        localStorage.removeItem("package_booking_id");

                        alert.success("Successfully Booked!");
                        navigate('/thankyou');
                    }).catch(function (error) {
                        alert.error(error.response.data.error.message);
                    });

                },
                prefill: {
                    name: packageBookingInfo.name,
                    email: packageBookingInfo.email,
                    contact: packageBookingInfo.mobile,
                },
                notes: {
                    address: "Ranthambore",
                },
                theme: {
                    color: "#61dafb",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
    }
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    useEffect(() => {

        getSettings();

        const res = loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert.error("Razorpay SDK failed to load. Are you online?");
            return;
        }

    }, []);


    function getSettings() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/settings/razorpay`).then(res => {
            setRazorpaykey(res.data.data.value.razorpay_key);
        })
    }


    return (
        <div className="package-booking-details">
            <div className="packagebannersection" style={{ backgroundImage: "url(../image/hero-packages.jpeg)" }}>
                <div className="container sectionFrame">
                    <div className="banner-packageinfo">
                        <h1>Package Booking Online</h1>
                    </div>
                </div>
            </div>
            <div className="booking-detail-online">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="traveler-D">
                                <h2>Traveller Details</h2>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td><strong>Travel Date :</strong></td>
                                            <td><strong>{packageBookingInfo?.date}</strong>

                                                {/* <input type="date" className="input-travel-date travel-date form-control" name="travel_date" min="2022-10-12" />
                                                <div className="text-danger travel-date-error" style={{ display: "none" }}>Booking not Available.Please Select another Date.</div> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Name :</td>
                                            <td>{packageBookingInfo?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Mobile :</td>
                                            <td>{packageBookingInfo?.mobile}</td>
                                        </tr>
                                        <tr>
                                            <td>Email ID :</td>
                                            <td>{packageBookingInfo?.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Packages :</td>
                                            <td>{packageBookingInfo?.package_name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="package-D">
                                <h2>Package Details</h2>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Package :</td>
                                            <td className="text-right">{packageBookingInfo?.category_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Adults :</td>
                                            <td className="text-right">{packageBookingInfo?.no_of_adult} </td>
                                        </tr>
                                        <tr>
                                            <td>No of Rooms :</td>
                                            <td className="text-right">{packageBookingInfo?.no_of_rooms} Rooms </td>
                                        </tr>
                                        <tr>
                                            <td>Extra Bed :</td>
                                            <td className="text-right"> {localStorage.getItem('extraBed')} </td>
                                        </tr>
                                       
                                        <tr>
                                            <td>Kids :</td>
                                            <td className="text-right">{packageBookingInfo?.no_of_kids}</td>
                                        </tr>
                                        {/* <tr>
                                            <td>Total Child Cost :</td>
                                            <td className="text-right" id="total-kid-price">1800</td>
                                        </tr> */}
                                        <tr>
                                            <td>Price (RS) :</td>
                                            <td className="text-right" id="package-price">{packageBookingInfo?.amount}</td>
                                        </tr>
                                        <tr>
                                            <td>GST :</td>
                                            <td className="text-right">{gstAmountText}</td>
                                        </tr>
                                        <tr>
                                            <td className="payable text-left">Payable Amount:</td>
                                            <td className="payable text-right" id="total-payable-amount">{totalAmountText}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <div className="paynowoption">
                                <p className="text-center" id="show-message" style={{ display: "none", fontWeight: "bold" }}>Prices are high due to festival/Long weekend</p>
                                <ul className="list-inline usertype">
                                    {/*<li className='list-inline-item'>
                                        <div className="radio">
                                            <label>
                                                <input type="radio" value="6075" className="nationality-type" name="payment" data-payment="partially-paid" />
                                                <span onClick={HandleHalfPayment} className="forcustom half-payable-amount">Pay 50% ( INR <span>{totalAmountText / 2}</span>)</span>
                                            </label>
                                        </div>
                                    </li>*/}
                                    <li className='list-inline-item'>
                                        <div className="radio">
                                            <label>
                                                <input type="radio" value="12150" className="nationality-type" name="payment" checked data-payment="paid" />
                                                <span onClick={HandlePayment} className="forcustom total-payable-amount">Total Payable Amount (INR <span>{totalAmountText} </span>)</span>
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="findButton text-center">
                            <div className='tremsbooking'>
                    <input type="checkbox" id="agree" onChange={checkboxHandler} />
                    <label htmlFor="agree">I read all <b> <a href="/terms-and-conditions" > terms and condition </a></b> mentioned  and agree to it.</label>
                </div>
                                <button onClick={HandlePayment} className="btn btn-warning btn-lg" title="Please agree terms and conditions" id="razorpay">Pay Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
