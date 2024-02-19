import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export function ServiceList({ services }) {
  return (
    <div className="mt-4 border border-gray-300 rounded-lg divide-y dark:border-[#c1c1c35a] dark:divide-[#c1c1c35a] ">
      {services.map((service) => (
        <div
          key={service.id}
          className=" p-2 md:flex items-center justify-between"
        >
          <div className="flex space-x-1 tracking-tight items-center  pb-2.5 mt-1 ">
            <p className="text-sm font-normal">{service.name}</p>
            <span className="text-sm font-normal ">
              ({service.duration} minutes @ {service.price})
            </span>
          </div>
          <div className="flex items-center">
            <label className="inline-flex items-center mr-3 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>

            <div className="inline-flex rounded shadow-sm">
              <a
                href="#"
                className="px-4 py-1 text-sm font-medium text-gray-900  bg-white border border-gray-200 rounded-s hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <svg
                  className="w-[16px] h-[16px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <svg
                  className="w-[16px] h-[16px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.2 9.8a3.4 3.4 0 0 0-4.8 0L5 13.2A3.4 3.4 0 0 0 9.8 18l.3-.3m-.3-4.5a3.4 3.4 0 0 0 4.8 0L18 9.8A3.4 3.4 0 0 0 13.2 5l-1 1"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <svg
                  className="w-[16px] h-[16px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M12 6h0m0 6h0m0 6h0"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Appointments() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: services, error } = await supabase
    .from("services")
    .select("id,name, price, duration")
    .eq("creative_id", user.id);

  if (error) {
    throw new Error("Error fetching:", error);
  }

  console.log({ services });
  return (
    <div className="px-8">
    

      <div className="mt-4">
        <div className="flex items-center justify-between">
        <div>
        <h5 className="font-medium">Appointment Types</h5>
        <p className="text-sm tracking-tight text-slate-500 dark:text-slate-400">
          Create appointments to share for people to book on your calendar.
        </p>
        </div>

        <Link href="/appointments/new/" className="text-sm bg-primary rounded px-4 py-2">New appointment type</Link>
        </div>
        {!services ? (
          <div className="flex justify-center items-center min-h-80">
            <h1 className="font-medium text-lg text-gray-500">No services available yet!</h1>
          </div>
        ) : (
          <ServiceList services={services} />
        )}
      </div>
    </div>
  );
}
