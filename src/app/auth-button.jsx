"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function AuthButton() {

    const supabase = createClientComponentClient( )

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }


    return <>
    <button onClick={handleSignIn}>Login</button>
    <button onClick={handleLogout}>Logout</button>

    </>


}