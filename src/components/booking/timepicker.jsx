"use client";
import React, { useState, useEffect } from "react";

const TimeSlotSelector = () => {
  const [timeSlots, setTimeSlots] = useState([]);

  const generateTimeSlots = (start, end) => {
    const startTime = new Date(`01/01/2000 ${start}`);
    const endTime = new Date(`01/01/2000 ${end}`);
    const slots = [];

    let currentTime = new Date(startTime);
    while (currentTime < endTime) {
      slots.push(
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return slots;
  };

  // Generate time slots when component mounts
  useEffect(() => {
    const start = "09:00";
    const end = "17:00";
    const generatedSlots = generateTimeSlots(start, end);
    setTimeSlots(generatedSlots);
  }, []);

  const handleTimeSlotChange = (e) => {
    console.log("Selected time slot:", e.target.value);
    // Do something with the selected time slot value
  };

  return (
    <ul class="grid w-full grid-cols-3 gap-6">
        {timeSlots.map((slot, index) => (
          <li key={index}>
            <input
              type="radio"
              id={`slot-${index}`}
              value={slot}
              onChange={handleTimeSlotChange}
              name="timeSlot"
              className="hidden peer"
            />
            <label
              htmlFor={`slot-${index}`}
              className=" w-full py-2 block border text-center border-[#383838] rounded-md cursor-pointer peer-checked:hover:bg-transparent  peer-checked:border-primary peer-checked:text-primary hover:bg-[#404040] "
            >
              <span className="text-sm font-medium ">{slot}</span>
            </label>
          </li>
        ))}
    
  </ul>
  );
};

export default TimeSlotSelector;
