"use client"

import { subscriptionRef } from '@/lib/converters/Subscription';
import { useSubsciptionStore } from '@/store/store';
import { onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function SubscriptionProvider({
    children,
  }: {
    children: React.ReactNode
  }) {

    const {data:session} = useSession()
    const setSubcription = useSubsciptionStore(
        (state) => state.setSubscription
      );
      
      useEffect(() => {
        if (!session) return;
        return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
          if (snapshot.empty) {
            console.log('User has NO subscription');
            setSubcription(null);
            
          } else {
            console.log('has subscription');
            setSubcription(snapshot.docs[0].data());
          }
        }, (error) => {
          console.log('error getting documents', error);
        });
      }, [session,setSubcription]);
  return (
    <>
     {children} 
    </>
  )
}
