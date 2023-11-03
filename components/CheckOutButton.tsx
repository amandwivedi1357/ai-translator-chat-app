'use client'



import { db } from '@/firebase'
import { addDoc,collection,onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Loading from './Loading'
import { useSubsciptionStore } from '@/store/store'
import ManageAccountButton from './ManageAccountButton'

export default function CheckOutButton() {
    const [loading,setLoading] = useState(false)
    const {data:session} = useSession()
    const subscription = useSubsciptionStore((state)=>state.subscription)

    const isLoadingSubscription = subscription === undefined;

    const isSubscribed = subscription?.status==='active' && subscription?.role==='pro'

    const createCheckOutSession =async ()=>{
        if(!session?.user.id){
            return
        }
        setLoading(true)
        const docRef = await addDoc(collection(db,'customers',session.user.id,'checkout_sessions'),{
            price:"price_1O5UnNSIOjv7a78rtCylAw76",
            success_url:window.location.origin,
            cancel_url:window.location.origin,
        });
        return onSnapshot(docRef,(snap)=>{
            const data = snap.data();
            const url = data?.url;
            const error = data?.error

            console.log(data)
            if(error){
                alert(`An error occured: ${error.message}`)
                setLoading(false)
            }

            if(url){
                window.location.assign(url)
                setLoading(false)
            }
        })
    }
  return (
    <div className='flex flex-col space-y-2'>
{/* if subscribed show user is subscribed */}

{/* {isSubscribed && (
    <>
    <hr  className='mt-5'/>
    <p className='pt-5 text-center text-xs text-indigo-600 font-bold'>You are subscribed to PRO</p>
    </>
)} */}
    <div  className='mt-8 block rounded-md bg-indigo-700 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:cursor-default'>

        {isSubscribed ? (
            <ManageAccountButton/>
        ): isLoadingSubscription || loading ? (<Loading/>):(
            <button onClick={()=>createCheckOutSession()}>Sign up</button>
        )}
      
    </div>
    </div>
  )
}
