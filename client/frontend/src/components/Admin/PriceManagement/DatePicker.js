import { React, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRange() {
const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  return (
    <>
    <div className='flex mb-4'>
        <div><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
        <div className='ml-2'><DatePicker selected={EndDate} onChange={(date) => setEndDate(date)} /></div>
    </div>
    </>
  )
}
