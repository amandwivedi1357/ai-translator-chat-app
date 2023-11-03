import { db } from "@/firebase";
import { LanguagesSupported } from "@/store/store";
import { Subscription } from "@/types/Subscription";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, collection, collectionGroup, doc, limit, orderBy, query, where } from "firebase/firestore";
import { SnapshotOptions } from "firebase/firestore";

export interface User{
    id:string;
    email:string;
    name:string;
    image:string;
}
export interface Message{
    id:string;
    input:string;
    timestamp:Date;
    user:User;
    translated?:{
        [K in LanguagesSupported]?:string;
    };
    
}

const messageConverter:FirestoreDataConverter<Message> = {
    toFirestore:function(message:Message):DocumentData{
        return {
            input:message.input,
            user:message.user,
            timestamp:message.timestamp,
            
        }
    },
    fromFirestore:function(
        snapshot:QueryDocumentSnapshot,
        options:SnapshotOptions
    ):Message{
        const data = snapshot.data(options);
        return{
            id:snapshot.id,
            input:data.input,
            timestamp:data.timeStamp?.toDate(),
            translated:data.translated,
            user:data.user,
        }
    }
}

export const messageRef = (chatId:string)=> 
    collection(db,'chats',chatId,'messages').withConverter(messageConverter);


export const limitedMessageRef = (chatId:string)=> 
    query(messageRef(chatId),limit(25))

export const sortedMessageRef = (chatId:string)=>
    query(messageRef(chatId),orderBy('timestamp','asc'));

export const limitedSortedMessageRef = (chatId:string) =>
    query(query(messageRef(chatId),limit(1)),orderBy('timestamp','desc'));