import DatePick from "@/components/booking/datepicker";
import TimeSlotSelector from "@/components/booking/timepicker";
import React from "react";

function BookingPage() {
  return (
    <div className="flex h-full items-center justify-center min-h-[100dvh]">
      <div className="flex min-h-full w-full flex-col overflow-clip md:overflow-visible  items-center ">
        <div className="grid max-w-full rounded-md items-start md:grid-cols-3 md:grid-rows-1 border border-[#383838] divide-[#383838] md:divide-x md:divide-y-0 divide-y  bg-[#1f1f1f]  sm:motion-reduce:transition-none md:flex-row sm:transition-[width] sm:duration-300">
          <div className="md:max-w-[280px] h-full">
            
              <ul className="flex items-center border-muted">
                <li className="-mr-[4px] inline-block">
                  <a
                    data-state="closed"
                    href="https://cal.com/papajones?redirect=false"
                  >
                    <span
                      data-testid="avatar"
                      className="bg-emphasis item-center relative inline-flex aspect-square justify-center rounded-full align-top overflow-hidden border-subtle w-6 h-6 min-w-6 min-h-6"
                    >
                      <img
                        alt="Papa Jones"
                        className="aspect-square rounded-full w-6 h-6 min-w-6 min-h-6"
                        src="https://app.cal.com/papajones/avatar.png"
                      />
                    </span>
                  </a>
                </li>
              </ul>
              <p className="text-subtle mt-2 text-sm font-semibold">Papa Jones</p>
              <h1
                data-testid="event-title"
                className="text-text text-xl font-semibold my-2"
              >
                15 Min Meeting
              </h1>
              <div className="space-y-4 font-medium rtl:-mr-2">
                <div className="flex items-start justify-start text-sm text-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-20 mr-2 mt-[2px] h-4 w-4 flex-shrink-0 rtl:ml-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div className="relative z-10 max-w-full break-words">
                    15 mins
                  </div>
                </div>
             
                <div className="flex items-start justify-start text-sm text-text cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-20 mr-2 mt-[2px] h-4 w-4 flex-shrink-0 rtl:ml-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" x2="22" y1="12" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <div className="relative z-10 max-w-full break-words">
                    In-store
                  </div>
                </div>
              </div>
        
          </div>
          <div className="mt-auto md:max-w-[460px] px-5 py-3 h-full">
            <DatePick />
          </div>
          <div className="flex flex-col md:max-w-[280px] px-5 py-3 items-start h-full min-w-full">
          <p className="text-sm font-semibold">Available Timeslots</p>
          <div className="w-full">
            <TimeSlotSelector />
          </div>
        </div>
        </div>
     
      </div>
    </div>
  );
}

export default BookingPage;
