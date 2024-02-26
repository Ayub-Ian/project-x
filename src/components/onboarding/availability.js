import { useOnboard } from "@/context/onboarding-context";
import React from "react";

const SelectDays = ({ formData, day, handleDayToggle }) => {
  return (
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r last:border-r-0 last:border-b-0 dark:border-gray-600">
      <div className="flex items-center flex-row md:flex-col p-1 pl-3 md:pr-3 md:pt-3">
        <input
          id={`checkbox-${day}`}
          type="checkbox"
          checked={formData.availability[day]}
          onChange={() => handleDayToggle(day)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          for={`checkbox-${day}`}
          className="w-full py-3 md:py-1.5 ms-2 md:text-center text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {day}
        </label>
      </div>
    </li>
  );
};

export default function Availability() {
  const { formData, dispatch } = useOnboard();

  const handleDayToggle = (day) => {
    dispatch({ type: "TOGGLE_DAY", payload: day });
  };

  const handleStartTimeChange = (e) => {
    dispatch({ type: "SET_START_TIME", payload: e.target.value });
  };

  const handleEndTimeChange = (e) => {
    dispatch({ type: "SET_END_TIME", payload: e.target.value });
  };

  const updateProfile = () => {
    console.log({formData})
  }
  return (
    <div className="mx-4 flex flex-col  space-y-10  sm:mx-auto">
      <h1 className="text-xl font-medium mb-3">When do you work?</h1>
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
        Available hours
      </h3>
      <div className="grid gap-2 mb-6 grid-cols-3 items-center">
        <div>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Start time"
            value={formData.start_time}
            onChange={handleStartTimeChange}
            required
          />
        </div>
        <span className="text-center">to</span>
        <div className="text-sm">
          <input
            type="text"
            id="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="End time"
            value={formData.end_time}
            onChange={handleEndTimeChange}
            required
          />
        </div>
      </div>

      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
        Available days
      </h3>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {Object.keys(formData.availability).map((day) => (
          <SelectDays key={day} formData={formData} handleDayToggle={handleDayToggle} day={day} />
        ))}
      </ul>

      <button onClick={updateProfile}>Finish</button>
    </div>
  );
}
