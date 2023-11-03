'use client'

import React, { Dispatch, SetStateAction } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useToast } from './ui/use-toast'
import { Button } from './ui/button'
import { Copy } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
  
export default function ShareLink({
    isOpen,
    chatId,
    setIsOpen
}:{
    isOpen:boolean,
    chatId:string,
    setIsOpen:Dispatch<SetStateAction<boolean>>
}) {
    const {toast} = useToast()
    const host = window.location.host;

    const linkToChat = process.env.NODE_ENV === 'development'
    ? `http://${host}/chat/${chatId}`
    : `https://${host}/chat/${chatId}`


    async function copyToClipBoard() {
        try {
            await navigator.clipboard.writeText(linkToChat);
            console.log('text copied to clipboard')

            toast({
                title:'Copied SuccessFully!',
                description:'Share this with the person you want to chat with',
                className:'bg-green-600 text-white'
                
            });
        } catch (error) {
            console.log('Failed to copy text',error)
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)} defaultOpen={isOpen}>
    <DialogTrigger asChild>
      <Button variant={'outline'}>
      <Copy className='mr-1'/>
      Share Link
      </Button>
    </DialogTrigger>
    <DialogContent className='sm:max-w-md'>
      <DialogHeader>
        <DialogTitle>Add User to Chat</DialogTitle>
        <DialogDescription>
          Any User who has been{" "}
          <span className='text-indigo-600 font-bold'>
              granted acess
          </span>{" "}
          can use this link
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
            <Label htmlFor={'link'} className='sr-only'>
                Link
            </Label>
    <Input id='link' defaultValue={linkToChat} readOnly/>
        </div>
        <Button 
        type='submit'
        onClick={()=>copyToClipBoard()}
        size='sm'
        className='px-3'
        >
            <span className='sr-only'>Copy</span>
            <Copy className='h-4 w-4'/>
        </Button>
      </div>
      <DialogFooter className='sm:justify-start'>
        <DialogClose asChild>
      <Button type="button" variant={'secondary'}>Close</Button>
      </DialogClose>
    </DialogFooter>
    </DialogContent>
  </Dialog>
  )

}
