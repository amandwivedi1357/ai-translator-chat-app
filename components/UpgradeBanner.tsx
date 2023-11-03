'use client'

import { useSubsciptionStore } from '@/store/store'

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export default function UpgradeBanner() {
    const subscription = useSubsciptionStore((state)=>state.subscription)

    const isPro = subscription?.role==='pro'
    const router = useRouter();

    if(subscription===undefined || isPro) return null


  return (
    <Button className='w-full rounded-none bg-gradient-to-r from-[#7775D6] to-[#E935C1] text-white px-5 py-2 hover:from-[#7775D6] hover:to-[#E935C1]
    hover:shadow-md hover:opacity-75 transition-all
    '
    onClick={()=>router.push('/register')}
    >
      Upgrade to Pro to Unlock all features!
    </Button>
  )
}
