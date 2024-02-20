'use client'
import React, { useState} from 'react';
import DatePicker from "react-datepicker";




export default function DatePick(props) {
    const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='min-w-full'>
    
      <DatePicker
      className='datepicker'
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      inline
    />
    </div>
  );
}