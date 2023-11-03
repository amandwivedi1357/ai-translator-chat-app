'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import * as z from 'zod'
import { useToast } from './ui/use-toast'
import useAdminId from '@/hooks/useAdminId'
import { useSubsciptionStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'
import { addChatRef, chatMemberAdminRef } from '@/lib/converters/ChatMembers'
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import { ToastAction } from './ui/toast'
import { getUserByEmailRef } from '@/lib/converters/User'
import ShareLink from './ShareLink'
  

const formSchema = z.object({
    email:z.string().email('Please enter a valid email address')
})
export default function InviteUser({chatId}:{chatId:string}) {
    const {data:session} = useSession();
    const {toast} = useToast()
    const adminId = useAdminId({chatId})
    const subscription = useSubsciptionStore((state)=>state.subscription);
    const router = useRouter()
    const [open,setOpen] = useState(false)
    const [openInviteLink,setopenInviteLink] = useState(false) 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:''
        },
    })

    async function onSubmit(values:z.infer<typeof formSchema>) {
        if(!session?.user.id) return

        toast({
            title:'Sending invite',
            description:'Please wait while we send the invite...'
        });


        const noOfUsersInChat=(await getDocs(chatMemberAdminRef(chatId))).docs.map(
            (doc)=>doc.data()
        ).length
    
        const isPro = subscription?.role==='pro' && subscription.status ==='active' ;
    
        if(!isPro && noOfUsersInChat >=2){
            toast({
                title:'Free plan limit exceeded ',
                description:'exceeded FREE plan , upgrade to PRO for adding users to chats!',
                variant:'destructive',
                action:(
                    <ToastAction 
                    altText='Upgrade' 
                    onClick={()=>router.push('/register')}
                    >
                        Upgrade to Pro
                    </ToastAction>
                )
            });
            return;
        }
        const querySnapShot = await getDocs(getUserByEmailRef(values.email))
        if(querySnapShot.empty){
            toast({
                title:'User not Found',
                description:'Please enter an email address that is registered or try again one they sign up!',
                variant:'destructive'
            })
            return;
        }
        else{
            const user = querySnapShot.docs[0].data()
             
            await setDoc(addChatRef(chatId,user.id),{
                userId:user.id,
                email:user.email!,
                timestamp:serverTimestamp(),
                chatId:chatId,
                isAdmin:false,
                image:user.image || '',
            }).then(()=>{
                setOpen(false)
                toast({
                    title:'Added to chat',
                    description:'The user has been added to chat successfully!',
                    className:'bg-green-600 text-white',
                    duration:3000,
                })
                setopenInviteLink(true)
            })
            .catch(()=>{
                toast({
                    title:'Error!',
                    description:'Whoops... there was an error adding the user to the chat!',
                    variant:'destructive'
                });
                setOpen(false)
            })
        }
        form.reset();
    }
   
  return (adminId===session?.user.id && (
    <>
        <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button >
    <PlusCircleIcon className='mr-1'/>
    Add User To Chat
    </Button>
  </DialogTrigger>
  <DialogContent className='sm:max-w-md'>
    <DialogHeader>
      <DialogTitle>Add user to Chat</DialogTitle>
      <DialogDescription>
        Simply enter another users email address to invite them to this chat!{" "}
        <span className='text-indigo-600 font-bold'>
            (Note: they must be registered)
        </span>
      </DialogDescription>
    </DialogHeader>
    <Form {...form}>
        <form 
        className='flex flex-col space-y-2'
        onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
            control={form.control}
            name='email'
            render={({field})=>(
                <FormItem>
                    <FormControl>
                        <Input placeholder='john@doe.com' {...field}/>
                    </FormControl>
                </FormItem>
            )}
            />
            <Button className='ml-auto sm:w-fit w-full ' type='submit'>
                Add to Chat
            </Button>
        </form>
    </Form>
  </DialogContent>
</Dialog>
                <ShareLink
                isOpen={openInviteLink}
                setIsOpen = {setopenInviteLink}
                chatId = {chatId}
                />
    </>
  )
    
  )
}
