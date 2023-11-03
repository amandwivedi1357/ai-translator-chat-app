'use client'

import { LanguageSupportedMap, LanguagesSupported, useLanguageStore, useSubsciptionStore } from '@/store/store'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Loading from './Loading';
import Link from 'next/link';

function LanguageSelect() {
    const [language,setLanguage,getLanguages,getNotSupportedLanguage] = 
        useLanguageStore((state)=>[
            state.language,
            state.setLanguage,
            state.getLanguages,
            state.getNotSupportedLanguage

        ])
        const subscription = useSubsciptionStore((state)=>state.subscription);
        const isPro = subscription?.role === 'pro' && subscription?.status ==='active'

        const pathName = usePathname()
        const isChatPage = pathName.includes('/chat');
        
  return isChatPage && (
    <div>
      <Select
      onValueChange={(value:LanguagesSupported)=>setLanguage(value)}
      >
        
  <SelectTrigger className="w-[150px] text-black dark:text-white">
    <SelectValue placeholder={LanguageSupportedMap[language]}
    className=''
    />
  </SelectTrigger>
  <SelectContent>
   {subscription===undefined ? (
    <Loading/>
   ):(
    <>
    {getLanguages(isPro).map((language)=>(
        <SelectItem key={language} value={language}>
            {LanguageSupportedMap[language]}
        </SelectItem>
    ))}
    {getNotSupportedLanguage(isPro).map((language)=>(
        <Link href={'/register'} key={language} prefetch={false}>
            <SelectItem 
            key={language}
            value={language}
            disabled
            className='bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1'
            >
                {LanguageSupportedMap[language]}(PRO)
            </SelectItem>
        </Link>
    ))}
    </>
   )}
  </SelectContent>
</Select>

    </div>
  )
}

export default LanguageSelect
