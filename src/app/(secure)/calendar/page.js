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
          

  return (
    <div className="px-5  w-full">
      <div  className="flex items-center space-x-2 mb-3 ">
        <p className=" tracking-tight leading-6 ">
          Monday, February 12th, 2024
        </p>
        <p className="leading-6  ">
          0 appointments
        </p>
      </div>

      <EventCalendar />
    </div>
  );
}
