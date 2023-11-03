import { authOptions } from '@/auth'
import { chatMemberCollectionGroupRef } from '@/lib/converters/ChatMembers'
import { getDocs } from 'firebase/firestore'
import { getServerSession } from 'next-auth'
import React from 'react'
import ChatListRows from './ChatListRows'

export async function ChatList() {
    const session = await getServerSession(authOptions)

    const chatSnapshot = await getDocs(
      chatMemberCollectionGroupRef(session?.user.id!)
    )
    const initialChats = chatSnapshot.docs.map((doc)=>({
      ...doc.data(),
      timestamp:null,
  
    }))
  return (
    <>
     <ChatListRows initialChats = {initialChats}/> 
    </>
  )
}
