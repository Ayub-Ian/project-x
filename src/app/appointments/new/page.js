import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CreateServiceForm from "@/components/appointments/create";
import React from "react";

export default async function CreateService() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="px-8 md:flex justify-center">
      <div className="max-w-2xl space-y-2 w-full">
        <div className=" p-4 rounded-lg">
          <p>Back</p>
          <h5 className="font-bold text-2xl tracking-tight uppercase">New type of service</h5>
        </div>

        <section className="dark:blue-900 rounded-lg">
  <div className=" px-4 mx-auto max-w-2xl py-4 ">
    <CreateServiceForm user={user} />
  </div>
</section>

      </div>
    </div>
  );
}
