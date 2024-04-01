import React , { useState , useEffect } from 'react' 
import { Link } from 'react-router-dom' 
import { useAlert } from "react-alert"
import axios from 'axios'
import swal from 'sweetalert'
import { useParams } from "react-router-dom";
import moment from 'moment';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function ChambalBooking() {

    const params = useParams();
    const alert = useAlert();

    const [startDate, setStartDate] = useState();
    const [Indian , setIndian] = useState(0);
    const [Foreigner , setForeigner] = useState(0);
    const [PayAmount , setPayAmount] = useState(0);
    const [Gst , setGst] = useState(0);
    const [Persons , setPersons] = useState(0);
    const [Price , setPrice] = useState(0);
    const [agree, setAgree] = useState(false);

    const checkboxHandler = () => {
        setAgree(!agree);
    }


    const handlePayNow = (e) => {

        const data = {
            name: name,
            mobile: phone,
            email:  email,
            address: address,
            state: state,
            date: moment(startDate).format("YYYY-MM-DD"),
            zone: params.id,
            amount: PayAmount,
            vehicle: 'boat',
            time: time,
            id_proof_no: proof,
            transaction_id: '',
            no_of_persons_indian: Indian,
            no_of_persons_foreigner: Foreigner,
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/admin/customers/chambal`, data).then(result => {
            if (result.status === 200) {

                console.log('data saved');

            }
        });
    }


    const handleChangeMobile = (e) => {

        setPhone(e.target.value);

        const data = {
            "name": name,
            "mobile": e.target.value
        }

        if (e.target.value.length >= 10) {

            axios.post(`${process.env.REACT_APP_BASE_URL}/admin/enquiries/save-enquery`, data).then(res => {
                if (res.status === 200) {
                } else {
                }
            }).catch(error => {
                swal("Warning", error, "warning");
            })
        }
    }

    const IndianPersonHandle = (e) => {

        setIndian(e.target.value);

        const data = {
            "indians": e.target.value,
            "foreigners": Foreigner,
            "id": params.id
        }
        
        axios.post(`${process.env.REACT_APP_BASE_URL}/chambal/getBookingPrice`, data, {
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
              },
            }).then(result => { 
                setPayAmount(result.data.data.total);
                setGst(result.data.data.gst);
                setPersons(result.data.data.persons);
                setPrice(result.data.data.price);
            }) 
    }

    const ForeignPersonHandle = (e) => {

        setForeigner(e.target.value);

        const data = {
            "indians": Indian,
            "foreigners": e.target.value,
            "id": params.id
        }
        
        axios.post(`${process.env.REACT_APP_BASE_URL}/chambal/getBookingPrice`, data, {
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
              },
            }).then(result => { 
                setPayAmount(result.data.data.total);
                setGst(result.data.data.gst);
                setPersons(result.data.data.persons);
                setPrice(result.data.data.price);
            }) 
    }

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [phone , setPhone] = useState('');
    const [proof , setProof] = useState('');
    const [time , setTime] = useState();
    const [state , setSelState] = useState('');
    const [address , setAddress] = useState('');

    const HandlePayment = () => {

        if((email === '' && state === '' && address === '') || PayAmount === 0 || startDate === undefined) {
            alert.error("Please do not leave any fields blank.");
            return true;
        } else {
                var amount = PayAmount + PayAmount*0.03;
            const options = {


                // key: credentials.razorpay_key,
                key: razorpaykey,
                // amount: PayAmount+('00').toString(),
                amount: Math.round(amount*100),
                currency: "INR",
                name: "Ranthambore Jungle Safari",
                description: "Ranthambore Jungle Safari Pay for Booking",
                image: "/static/media/Logo.463247709567bbe71e26.png",
              
                handler: async function (response) {

                    const data = {
                        name: name,
                        mobile: phone,
                        email:  email,
                        address: address,
                        state: state,
                        date: moment(startDate).format("YYYY-MM-DD"),
                        zone: params.id,
                        amount: PayAmount,
                        vehicle: 'boat',
                        time: time,
                        id_proof_no: proof,
                        transaction_id: response.razorpay_payment_id,
                        no_of_persons_indian: Indian,
                        no_of_persons_foreigner: Foreigner,
                    }
                    
                    //successPay
                    axios.post(`${process.env.REACT_APP_BASE_URL}/admin/customers/chambal`, data).then(result => {
                            if(result.status === 200 ) {
                                alert.success("Booked");

                                const paymentData = {
                                    "customer_id": result.data.data._id,
                                    "transaction_id": response.razorpay_payment_id,
                                    "amount": PayAmount,
                                    "booking_type": 'chambal'
                                }

                                axios.post(`${process.env.REACT_APP_BASE_URL}/admin/payment/chambal/${result.data.data.chambal_booking}`, paymentData , {
                                        headers: {
                                        'Accept': 'application/json, text/plain, */*',
                                        'Content-Type': 'application/json'
                                   },
                                }).then((response)=>{
                                    axios.post(`${process.env.REACT_APP_BASE_URL}/payment`, paymentData , {
                                        headers: {
                                            'Accept': 'application/json, text/plain, */*',
                                            'Content-Type': 'application/json'
                                       },
                                    }).then((response)=>{});
                                });
                                window.location.href = '/thankyou';
                            }
                    })
                    
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: phone,
                },
                notes: {
                    address: "Gir national park",
                },
                theme: {
                    color: "#61dafb",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
    }

    const loadScript=(src) =>{
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

    const [ disableDates , setDisableDates ] = useState([]);

    var dates = [];

    useEffect(() => {

        getSettings();

        const res = loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        

        if (!res) {
            alert.error("Razorpay SDK failed to load. Are you online?");
            return;
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/chambal/getDisableDates` , {
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+localStorage.getItem('accessToken')
              },
            }).then(result => { 
                           
                dates = result.data.data.map(itm => (
                     itm.date
                ))

                setDisableDates(dates);
        }); 
    },[]);

    const [ razorpaykey , setRazorpaykey ] = useState('');

    function getSettings() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/settings/razorpay`).then(res => {
            setRazorpaykey(res.data.data.value.razorpay_key);
        })  
    }

    const HandleDisableDate = (date) => {
        setStartDate(date);
    }

  return (
    <div className='container sectionFrame'>
        <div className='chambaBooking'>
            <h1>Chambal safari booking details</h1>
            <form>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label>Name</label>
                            <input type='text' className='form-control' onChange = {(e) => setName(e.target.value)} placeholder='Name' />
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label>Mobile number</label>
                            <input type='tel' className='form-control' onChange={handleChangeMobile}  placeholder='Mobile number' />
                        </div>
                    </div>

                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label>Email ID</label>
                            <input type='email' className='form-control' onChange = {(e) => setEmail(e.target.value)}  placeholder='Email' />
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label>Id Proof No.(Adhar/pan/DL):</label>
                            <input type='text' className='form-control'  onChange = {(e) => setProof(e.target.value)} placeholder='Id Proof No.' />
                        </div>
                    </div>

                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label>No. of Persons Indian:</label>
                            <select className="form-control" onChange = { IndianPersonHandle } >
                                <option value="">Please Select</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                <option value="32">32</option>
                                <option value="33">33</option>
                                <option value="34">34</option>
                                <option value="35">35</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                                <option value="46">46</option>
                                <option value="47">47</option>
                                <option value="48">48</option>
                                <option value="49">49</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label>No. of Persons Foreigner:</label>
                            <select className="form-control" onChange = { ForeignPersonHandle }>
                                <option value="">Please Select</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                <option value="32">32</option>
                                <option value="33">33</option>
                                <option value="34">34</option>
                                <option value="35">35</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                                <option value="46">46</option>
                                <option value="47">47</option>
                                <option value="48">48</option>
                                <option value="49">49</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label>Select Safari Date:</label>
                            <DatePicker selected={startDate} onChange={(date) => HandleDisableDate(date)} 
                                minDate={new Date()}
                                filterDate={(d) => !disableDates.includes(moment(d).format('YYYY-MM-DD')) }
                            />
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label>Select Safari Time:</label>
                            <select className="form-control" formcontrolname="safari_time"  onChange = {(e) => setTime(e.target.value)} id="safari_time" placeholder="Safari Time">
                                <option value="">Please select </option>
                                <option value="8:00 am to 9:00 am">8:00 am to 9:00 am</option>
                                <option value="9:00 am to 10:00 am">9:00 am to 10:00 am</option>
                                <option value="10:00 am to 11:00 am">10:00 am to 11:00 am</option>
                                <option value="11:00 am to 12:00 pm">11:00 am to 12:00 pm</option>
                                <option value="12:00 pm to 01:00 pm">12:00 pm to 01:00 pm</option>
                                <option value="01:00 pm to 02:00 pm">01:00 pm to 02:00 pm</option>
                                <option value="02:00 pm to 03:00 pm">02:00 pm to 03:00 pm</option>
                                <option value="03:00 pm to 04:00 pm">03:00 pm to 04:00 pm</option>
                                <option value="04:00 pm to 05:00 pm">04:00 pm to 05:00 pm</option>
                                <option value="05:00 pm to 06:00 pm">05:00 pm to 06:00 pm</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label>State:</label>
                            <select className="form-control" id="state"  onChange = {(e) => setSelState(e.target.value)}  required="">
                                <option disabled="" selected="" value="">Please Select State</option>
                                <option value="Andaman &amp; Nicobar Islands">Andaman &amp; Nicobar Islands</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Chattisgarh">Chattisgarh</option>
                                <option value="Dadra &amp; Nagar Haveli">Dadra &amp; Nagar Haveli</option>
                                <option value="Daman &amp; Diu">Daman &amp; Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jammu &amp; Kashmir">Jammu &amp; Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Poducherry">Poducherry</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label>Full Address:</label>
                            <input type='text' className='form-control'  onChange = {(e) => setAddress(e.target.value)}  placeholder='Full address' />
                        </div>
                    </div>

                    <div className='col-sm-6'>
                        <label>Note:</label>
                        <ul className='list-unstyled'>
                            <li># Visitors have to report 30 min before at Palighat chambal</li>
                            <li># Safari amount is non refundable</li>
                            <li># Online booking is compulsory for Chambal safari</li>
                            <li># Below 5 Year Child is complimentary (After 5 Year charges will be applicable)</li>
                            <li># Safari will be conducted by motor boat</li>
                        </ul>
                    </div>
                    <div className='col-sm-6'>
                        <label style={{fontSize: "18px", marginBottom: "2px"}}>{Persons} persons:</label>
                        <p>{Price} INR</p>
                        <div>&nbsp;</div>
                        <label style={{fontSize: "18px", marginBottom: "2px"}}>GST:</label>
                        <p>{Gst} INR</p>
                    </div>
                </div>
                <div className="formsection" style={{marginTop: "20px"}}>

                    <div className="text-center paynow">
                    <div className='tremsbooking'>
                        <input type="checkbox" id="agree" onChange={checkboxHandler} />
                        <label htmlFor="agree">I read all <b> <a href="/terms-and-conditions" > terms and condition </a></b> mentioned  and agree to it.</label>
                    </div>
                        {!agree && <p style={{ color: 'red', marginBottom:'5px' }}> Please select terms and conditions first! </p> }
                    <ul className='inline-flex'>
                        <li className="list-inline-item paybtn">
                            Payable Amount : <input id="booking_amount" type="hidden" value={PayAmount} />
                            <span id="amount">{PayAmount}</span>
                        </li>
                        <li className="list-inline-item"> 

                            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong" disabled={!agree} onClick={handlePayNow} title="Please agree terms and conditions" type="button">Pay Now</button>
                        </li>
                        <li className="list-inline-item">
                            <Link className="btn btn-default" to="/online-Chambal-moter-boat-safari-booking">Go Back</Link>
                        </li>
                    </ul>

                     <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-bold text-black" id="exampleModalLongTitle">Booking Details</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                         <div className="modal-body">
                            <div className='table-responsive'>
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                    <th className='text-black italic'>Date of Visit</th>
                                    <td colSpan={3} className='text-black italic'>{moment(startDate).format("YYYY-MM-DD")}</td>
                                    </tr>
                                    <tr>
                                    <th className='text-black italic'>Location:</th>
                                    <td className='text-black italic'>Chambal Booking</td>
                                    <th className='text-black italic'>Timings:</th>
                                    <td className='text-black italic'>{time}</td>
                                    </tr>
                                    <tr>
                                    <th className='text-black italic'>No of Passenger:</th>
                                    <td className='text-black italic'>{ parseInt(Indian) + parseInt(Foreigner)}</td>
                                    <th className='text-black italic'>Id Proof Number:</th>
                                    <td className='text-black italic'>{proof}</td>
                                    </tr>
                                    <tr>
                                    <th className='text-black italic'>Total Amount:</th>
                                    <td colSpan={3} className='text-black italic'> {PayAmount} INR</td>
                                    </tr>
                                    <tr>
                                    <th colSpan={4} className='text-black italic'>Important Notes</th>
                                    </tr>
                                    <tr>
                                    <td colSpan={4}>
                                        <p className='text-black italic mb-3'>Do not refresh your browser or click the back button during the payment process.</p>
                                        <p className='text-black italic mb-3'>Click on Make Payment button if you are agree to the term & condition.</p>
                                        <p className='text-black italic mb-3'>Once you click on button, you will be redirected to payment page.</p>
                                        <p className='text-black italic mb-3'>Please choose your payment mode (Netbanking, Credit Cards, Debit Cards etc.) and proceed for payment.</p>
                                        <p className='text-black italic mb-3'>Once you successfully complete the transaction your Transaction ID is generated which you can use for further query if any related to transaction.</p>
                                        <p className='text-black italic mb-3'>Once you click the payment button, you are agreed to mentioned terms and conditions to make payment with <div className='font-bold'>DTNT</div></p>
                                        <p className='text-black italic mb-3'>Call the driver one day before Safari for confirming the reporting point. Contact details of the driver is mentioned at your booking voucher.</p>
                                        <p className='text-black italic mb-3'>Slight changes in visit time may be done by authority due to Weather/Seasonal changes.</p>
                                    </td>

                                    </tr>
                                </tbody>
                                </table>
                            </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 sm:text-base font-medium rounded text-sm py-2 px-3 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" data-dismiss="modal">Cancel</button>
                        <button type="button" onClick = {HandlePayment} className="primary-btn bg-lemon py-2 text-center px-3 shadow-lg rounded sm:text-base font-semibold text-kenpozome hover:text-kenpozome">Make Payment</button>
                    </div>
                    </div>
                    </div>
                </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
