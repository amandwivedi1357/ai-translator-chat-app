'use client'

import {  MessageSquarePlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useSubsciptionStore } from "@/store/store"
import { useToast } from "./ui/use-toast"
import Loading from "./Loading"

import {v4 as uuidv4} from "uuid"
import { getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"
import { addChatRef, chatMemberCollectionGroupRef } from "@/lib/converters/ChatMembers"
import { ToastAction } from "./ui/toast"
function CreateChatButton({isLarge}:{isLarge?:boolean}) {

    const {data:session} = useSession()
    
    const [loading,setLaoding] = useState(false)
    const {toast} = useToast(); 
    const subscription = useSubsciptionStore((state)=>state.subscription)
    const router = useRouter()

    const createNewChat =async () => {
        if(!session?.user.id)return

        setLaoding(true)
        toast({
          title:'Creating new chat...',
          description:'Hold tight while we create your new chat...',
          duration:3000,
        })

        // check if user is pro and limit them creating a new chat

        const noOfChats = (await getDocs(chatMemberCollectionGroupRef(session.user.id))).docs.map((doc)=>doc.data()).length;

        
        const isPro = subscription?.role==='pro' && subscription.status === 'active'

        if(!isPro&&noOfChats>=3){
          toast({
            title:'free plan limit exceeded',
            description:"you've exceeded the free plan limit of chats.Please upgrade to PRO to continue adding users to chats!",
            variant:'destructive',

            action:(
              <ToastAction altText="Upgrade" onClick={()=>router.push('/register')}>
                Upgrade To PRO
              </ToastAction>
            )

          })
          setLaoding(false)
          return
        }
        // ---

        const chatId = uuidv4()
        console.log(chatId)

        await setDoc(addChatRef(chatId,session?.user.id!),{
          userId:session?.user.id!,
          email:session?.user.email!,
          timestamp:serverTimestamp(),
          isAdmin:true,
          chatId:chatId,
          image:session?.user.image || "",
        }).then(()=>{
          toast({
            title:'Success',
            description:'your chat has been created!',
            className:'bg-green-600 text-white',
            duration:2000,
          });
          router.push(`/chat/${chatId}`)
        }).catch(()=>{
          toast({
            title:'Error!',
            description:'There was an error creating your chat!',
            variant:'destructive',
          });
        }).finally(()=>{
          setLaoding(false)
        })
    }
    if(isLarge){
      return (
        <div>
          <Button variant={'default'} onClick={createNewChat}> 
            {loading ? <Loading/>:'Create a New Chat'}
          </Button>
        </div>
      )
    }
  return (
    <Button variant={'ghost'} onClick = {createNewChat}><MessageSquarePlusIcon/></Button>
  )
}

export default CreateChatButton
