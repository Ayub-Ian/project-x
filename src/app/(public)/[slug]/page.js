import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function PublicPage() {

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
  
  return (
    <div className="mx-auto">
      <div className="mx-auto max-w-3xl px-4 py-24">
        <div className="mb-8 text-center">
          <span className="bg-emphasis item-center relative inline-flex aspect-square justify-center rounded-full align-top overflow-hidden w-24 h-24 min-w-24 min-h-24">
            <img
            
              alt="Papa Jones"
              className="aspect-square rounded-full w-24 h-24 min-w-24 min-h-24"
              src="https://app.cal.com/papajones/avatar.png"
            />
          </span>
          <h1 className="text-3xl my-1 tracking-tighter font-semibold">Papa Jones</h1>
        </div>
        <div className="border border-[#383838] divide-y divide-[#383838] rounded-md">
            {services.map(service => (
                 <div key={service.id} className="bg-[#1f1f1f] hover:bg-[#404040] group relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className=" absolute right-4 top-4 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"><line x1="5" x2="19" y1="12" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                 <div className="p-5">
                   <Link href="#">
                     <div className="flex flex-wrap items-center">
                       <h2 className="  pr-2 text-sm font-semibold">
                         {service.name}
                       </h2>
                     </div>
                     <div className="font-medium inline-flex items-center justify-center rounded gap-x-1 bg-[#2e2e2e] py-1 px-1.5 text-xs leading-3">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         className="h-3 w-3 stroke-[3px]"
                       >
                         <circle cx="12" cy="12" r="10"></circle>
                         <polyline points="12 6 12 12 16 14"></polyline>
                       </svg>
                       {service.duration}m
                     </div>
                   </Link>
                 </div>
               </div>
            ))  }
       
         
        </div>
      </div>
    </div>
  );
}

export default PublicPage;
