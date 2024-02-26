'use client'
import React from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import Intro from '@/components/onboarding/intro';
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";
import Availability from '@/components/onboarding/availability';
import { OnboardProvider } from '@/context/onboarding-context';



export default function Onboarding() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

 
  

  return (
    <OnboardProvider>
    <div className="flex h-screen flex-col items-center justify-center max-w-3xl mx-auto overflow-x-hidden">
    <div
      className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
        style={{
          clipPath:
            "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
        }}
      />
    </div>
        {type ? (
          <button
            className="group absolute left-2 sm:left-10 top-10 z-40 rounded-full p-2 transition-all hover:bg-gray-400"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-800 group-active:scale-90" />
          </button>
        ) : (
          <Intro key="intro" />
        )}

        {type === "availability" && <Availability key="availability" />}

    </div>
    </OnboardProvider>
  )
}
