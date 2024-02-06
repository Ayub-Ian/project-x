import Link from "next/link";
import React from "react";

export default function Appointments() {
  return (
    <div className="px-8">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Appointments
            </h1>
            <button
              type="button"
              className="text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            >
                <Link href="/appointments/new">
              New type of service
              </Link>
            </button>
          </div>
          <span className="text-gray-500 text-sm font-normal">
            <p>Try not to miss meetings, and if you do,</p>
            <p>warn your clients. Create meaningful and </p>
            <p> predictable relationships with your clients.</p>
          </span>

          <div className="inline-flex mt-8 w-full gap-4 rounded-md shadow-sm">
            <Link
              href="/appointments"
              aria-current="page"
              className="px-4 py-2 w-full text-sm text-center font-medium text-primary bg-white border border-primary rounded-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Services
            </Link>
            <Link
              href="#"
              className="px-4 py-2 w-full text-center text-sm font-medium text-gray-900 bg-white rounded-lg border  border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Add ons
            </Link>
            <Link
              href="#"
              className="px-4 py-2 w-full text-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Coupons
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
