import React,{ useState } from 'react'
import RoomType from './RoomType'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PackageRooms({ packages }) {

    const [data,setData] = useState();
    const navigate = useNavigate();

    const makePayment = () =>{
       
        axios.post(`${process.env.REACT_APP_BASE_URL}/admin/customers/package`, data).then((result) => {

            localStorage.setItem('package_customer_id', result.data.data._id);
            localStorage.setItem('package_booking_id', result.data.data.package_booking);
            localStorage.setItem('bookingData', JSON.stringify(data));
            window.location.href = ("/book-package");


        }).catch(
            function (error) {
                console.log('Show error notification!', error.response.data.error.message);
                swal(error.response.data.error.message);
            }
        )
        
    }
    
    return (
        <div className="packTab">
            <div className='container sectionFrame'>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#tab-indian" role="tab" aria-controls="tab-indian" aria-selected="true">Indian</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#tab-foreigner" role="tab" aria-controls="tab-foreigner" aria-selected="false">Foreigner</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">


                    <div className="tab-pane active" id='tab-indian'>
                        {packages && <RoomType packages={packages} setData={setData}type="indian" />}

                    </div>
                    <div className="tab-pane fade" id='tab-foreigner'>
                        {packages && <RoomType packages={packages} setData={setData} type="foreigner" />}
                    </div>
                </div>

                <div className="modal fade" id="exampleModalLong-DIS" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
                                    <td colSpan={3} className='text-black italic' id='mdate'></td>
                                    </tr>
                                    <tr>
                                    <th className='text-black italic'>Package Name:</th>
                                    <td className='text-black italic' id='pcat'></td>
                                    </tr>
                                    <tr>
                                    <th className='text-black italic'>No of Adults:</th>
                                    <td className='text-black italic' id='acount'> </td>
                                    <th className='text-black italic'>No of Children:</th>
                                    <td className='text-black italic' id='ccount'></td>
                                    </tr>
                                    <tr>
                                    <th className='text-black italic'>Total Amount:</th>
                                    <td colSpan={3} className='text-black italic' id='amount'></td>
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
                        
                        <button type="button" onClick={makePayment} className="primary-btn bg-lemon py-2 text-center px-3 shadow-lg rounded sm:text-base font-semibold text-kenpozome hover:text-kenpozome">Make Payment</button>
                    </div>
                    </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
