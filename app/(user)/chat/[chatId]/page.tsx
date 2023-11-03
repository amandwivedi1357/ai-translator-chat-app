
import { authOptions } from '@/auth'
import AdminControls from '@/components/AdminControls'
import ChatInput from '@/components/ChatInput'
import { ChatList } from '@/components/ChatList'
import ChatMembersBadge from '@/components/ChatMembersBadge'
import ChatMessages from '@/components/ChatMessages'
import { ChatMembersRef } from '@/lib/converters/ChatMembers'
import { sortedMessageRef } from '@/lib/converters/Messages'
import { getDocs } from 'firebase/firestore'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import React from 'react'
  type Props = {
    params:{
      chatId:string
    }
  }
   async function ChatPage({params:{chatId}}:Props) {
    
    const session = await getServerSession(authOptions)
    const initialMessages = (await getDocs(sortedMessageRef(chatId))).docs.map((doc)=>doc.data())
    const hasAccess = (await getDocs(ChatMembersRef(chatId))).docs.map((doc)=>doc.id).includes(session?.user.id!)

    // if(!hasAccess) res.redirect('/chat')
    return (
      <>
        {/*Admin Controls  */}
        <AdminControls chatId = {chatId}/>
        {/* ChatMembersBadge */}
          <ChatMembersBadge chatId={chatId}/>
        {/* chatMessages */}
          <div className='flex-1'>
            <ChatMessages
            chatId={chatId}
            session = {session}
            initialMessages={initialMessages}
            />
          </div>
        {/* chatInput */}
        <ChatInput chatId={chatId}/>
       
      </>
    )
  }
  
export default ChatPage


