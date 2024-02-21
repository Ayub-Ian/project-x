import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOut from "@/components/Auth/SignOut";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }



  return (
    <main className="min-h-screen ">

      <h1>Hi, {user.email}</h1>
      <Link className="button" href="/profile">
        
        Go to Profile
      </Link>
      <SignOut />
    </main>
  );
}
