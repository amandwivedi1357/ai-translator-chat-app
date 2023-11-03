'use client'


import { auth } from '@/firebase';
import { signInWithCustomToken } from 'firebase/auth/cordova';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React,{useEffect} from 'react'

async function syncFirebaseAuth(session:Session){
    if(session && session.firebaseToken){
        try {
            await signInWithCustomToken(auth,session.firebaseToken)
        } catch (error) {
            console.error('Error Signing in with custom token',error)
        }
    }
    else{
        auth.signOut()
    }
}

export default function FirebaseAuthProvider({children}:{children:React.ReactNode}) {
    const {data:session} = useSession()
    useEffect(() => {
        if(!session) return
        syncFirebaseAuth(session)
    }, [session]);
  return (
    <>
     {children} 
    </>
  )
}
