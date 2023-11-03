import {create} from "zustand"
import {Subscription} from '@/types/Subscription'

export type LanguagesSupported = 
    | "en"
    | "de"
    | "fr"
    | "es"
    | "hi"
    | "ja"
    | "la"
    | "ru"
    | "zh"
    | "ar";


    export const LanguageSupportedMap: Record<LanguagesSupported,string> = {
        en:'English',
        de:'German',
        fr:'French',
        es:'Spanish',
        hi:'Hindi',
        ja:'Japanese',
        la:'Latin',
        ru:'Russian',
        zh:'Mandarin',
        ar:'Arabic',
    }

    const LANGUAGES_IN_FREE = 2
    interface LanguageState {
        language:LanguagesSupported,
        setLanguage:(language : LanguagesSupported)=>void;
        getLanguages:(isPro:boolean)=>LanguagesSupported[];
        getNotSupportedLanguage:(isPro:boolean)=>LanguagesSupported[]
    }

     export const useLanguageStore = create<LanguageState>()((set,get)=>({
        language:'en',
        setLanguage:(language:LanguagesSupported)=>set({language}),
        getLanguages:(isPro:boolean)=>{
            //if the user is pro, return all supported languages

            if(isPro)
                return Object.keys(LanguageSupportedMap)as LanguagesSupported[];


                //if not pro, return only the first two languages

            return Object.keys(LanguageSupportedMap).slice(
                    0,
                    LANGUAGES_IN_FREE, 
                )as LanguagesSupported[];
        },
        getNotSupportedLanguage:(isPro:boolean)=>{
            if(isPro) return [];//no unsupported language for "pro" users

            return Object.keys(LanguageSupportedMap).slice(LANGUAGES_IN_FREE) as LanguagesSupported[]
            //exluding the first two supported languages
        }
     })
     )
    
    interface SubscriptionState {
        subscription:Subscription | null | undefined;
        setSubscription:(subscription:Subscription | null)=>void;

    }

    export const useSubsciptionStore = create<SubscriptionState>((set)=>({
        subscription:undefined,
        setSubscription:(subscription:Subscription|null)=>set({
            subscription
        }),
    }))

