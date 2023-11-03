import { ChatList } from '@/components/ChatList';
import React from 'react'


type Props = {
    params:{};
    searchParams:{
        error:string;
    }
}
export default function ChatPage({searchParams:{error}}:Props) {
  return (
    <div>
      {/* chat permisiion chat */}

      <ChatList/>
    </div>
  )
}
