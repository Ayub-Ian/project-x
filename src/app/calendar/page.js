import { EventCalendar } from "@/components/calendar";
// import supabase from "@/utils/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });


  let { data: services, error } = await supabase
  .from('services')
  .select('*')
          
//   console.log('bookings',{bookings});
  console.log(services.length)

  return (
    <div className="px-5 lg:flex w-full justify-center ">
      <div className="bg-white rounded-lg p-4 mb-3 lg:mb-0">
        <h2 className="font-medium text-lg mb-3 text-gray-900">Calendar</h2>
        <h5 className="font-bold text-2xl tracking-tight leading-8 text-gray-900">
          Monday, February 12th, 2024
        </h5>
        <p className="text-lg leading-6 text-gray-600 mt-3 font-medium">
          0 appointments
        </p>
      </div>

      <EventCalendar />
    </div>
  );
}
