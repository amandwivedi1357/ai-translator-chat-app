'use client'

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from './UserAvatar'
import { Session } from 'next-auth'
import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'
import { useSubsciptionStore } from '@/store/store'
import Loading from './Loading'
import { StarIcon } from 'lucide-react'
import ManageAccountButton from './ManageAccountButton'
  
export default function UserButton({session}:{session:Session | null}) {

  //subscription list

  const subscription = useSubsciptionStore((state)=>state.subscription)
  
if(!session) return (
  <Button variant={'outline'} onClick={()=>signIn()}>
    Sign In
  </Button>
)
  //session
  
  return session && (
    
    <DropdownMenu>
    <DropdownMenuTrigger>
        <UserAvatar name={session.user?.name} image={session.user?.image} />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {
        subscription===undefined &&(
          <DropdownMenuItem>
            <Loading/>
          </DropdownMenuItem>
        )
      }
      {
        subscription?.role==='pro' && (
          <>
          <DropdownMenuLabel
          className='text-xs flex items-center justify-center space-c-1 text-[#ff47d7] animate-pulse'
          >
          <StarIcon fill='#ff00c8'/>
          <p>PRO</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>

          <DropdownMenuItem>
            
             <ManageAccountButton/>
          </DropdownMenuItem>
          </>
        )
      }
      <DropdownMenuItem onClick={()=>signOut()}>Sign out</DropdownMenuItem>
      
    </DropdownMenuContent>
  </DropdownMenu>
   
  )
}
