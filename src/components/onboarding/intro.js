'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOnboard } from '@/context/onboarding-context';


function Intro() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const {formData, dispatch } = useOnboard()

    const createQueryString = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )

      const handleUsernameChange = (e) => {
        dispatch({ type: 'SET_USERNAME', payload: e.target.value });
    };


    const [timezones, setTimezones] = useState([]);
    
    const date = new Date();

    
    useEffect(() => {
        // Fetch list of timezones
        const fetchTimezones = () => {
            const allTimezones = Intl.supportedValuesOf('timeZone')
            setTimezones(allTimezones);
        };
        fetchTimezones();
    }, []);

    useEffect(() => {

        if (!formData?.timezone) {
        // Get the current timezone of the user
        const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        
        
        // Set the default value of the timezone input to the current timezone
        dispatch({ type: 'SET_TIMEZONE', payload: currentTimezone });
    }
    }, [dispatch, formData]);

    const handleTimezoneChange = (e) => {
        dispatch({ type: 'SET_TIMEZONE', payload: e.target.value });
    };
    


    console.log({timezones})
  return (
    <div className='mx-4 flex flex-col  space-y-10  sm:mx-auto'>
              <h3 className='text-xl font-medium mb-3'>Welcome to Project X</h3>
      <p className='text-sm mb-3 leading-none'>We take the work out of connecting with others so you can accomplish more</p>
      <h5 className='text-xl font-medium mb-3'>Create your Project X URL</h5>
      <p className='text-sm leading-none'>Choose a url that desribes you or your business in a concise way. Make it short and easy to remember.</p>

      <label>projectx.com/</label>
      <input type='text' className='h-9 rounded-md bg-transparent' value={formData.username} onChange={handleUsernameChange}/>


      <label>Timezone</label>
      <select className='block w-full p-2 mb-6  bg-transparent border border-gray-300 rounded-lg ' value={formData.timezone} onChange={handleTimezoneChange}>
                {timezones?.map((timezone, index) => (
                    <option key={index} value={timezone}>{timezone}</option>
                ))}
            </select>
            {formData.timezone && (
            <span className='flex text-sm gap-2 items-center'>
            <p>Date and time:</p>
            <p>{date.toLocaleString('en-US', { timeZone: formData.timezone })}</p>

            </span>)}
          
      <button 
                  onClick={() =>
                    router.push(
                      pathname + '?' + createQueryString('type', 'availability')
                    )
                  }>Continue</button>
    </div>
  )
}

export default Intro