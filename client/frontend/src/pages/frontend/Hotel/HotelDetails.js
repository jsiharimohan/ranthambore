import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EnquiryForm from '../../../components/frontend/Common/EnquiryForm'
import AmenitiesHotel from '../../../components/frontend/Hotel/AmenitiesHotel'
import HotelGallery from '../../../components/frontend/Hotel/HotelGallery'
import HotelName from '../../../components/frontend/Hotel/HotelName'
import HotelRooms from '../../../components/frontend/Hotel/HotelRooms'

export default function HotelDetails() {

    const [hotel, setHotel] = useState({});
    const [hotelId, setHotelId] = useState('');
    const [hotelName, setHotelName] = useState('');
    const params = useParams();



    useEffect(() => {
        const getHotel = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/hotels/by-slug/${params.id}`);

            setHotel(res.data.data);
            setHotelId(res.data.data.hotel._id);
            setHotelName(res.data.data.hotel.name);

        }

        getHotel();

    }, [params.id]);


    return (
        <div className='hotel-detail-page'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-8'>
                        <HotelGallery hotel={hotel} />
                        <HotelName hotel={hotel} />
                        <AmenitiesHotel amenities={hotel} />
                    </div>
                    <div className='col-sm-4'>
                        <EnquiryForm hotel_id={hotelId} type="hotel" hotel_name={hotelName} />
                    </div>
                </div>
                <div className='hotel-rooms'>
                    <h3>Hotel Rooms</h3>
                    <HotelRooms rooms={hotel} />
                </div>
            </div>
        </div>
    )
}
