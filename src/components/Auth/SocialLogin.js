"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function SocialAuthButton() {

    const supabase = createClientComponentClient( )

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }


    return <>
    <button onClick={handleSignIn}>Google</button>

    </>


}