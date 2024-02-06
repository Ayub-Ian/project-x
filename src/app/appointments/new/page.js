import React from "react";

export default function CreateService() {
  return (
    <div className="px-8 md:flex justify-center">
      <div className="max-w-2xl space-y-4 w-full">
        <div className="bg-white p-4 rounded-lg">
          <h5 className="font-bold text-2xl tracking-tight uppercase">New type of service</h5>
        </div>
        <div className="bg-white p-4 rounded-lg">
        <label className="font-semibold text-lg tracking-tighter">Service name</label>
        <div class=" border-b border-gray-500 py-2">
            
        <input type="email" id="helper-text" aria-describedby="helper-text-explanation" class="   text-gray-900 text-sm block w-full p-2.5 border-b border-b-gray-500 bg-transparent outline-0   " placeholder="name@flowbite.com"/>

        </div>
        </div>
      </div>
    </div>
  );
}
