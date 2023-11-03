import { db } from "@/firebase";
import { LanguagesSupported } from "@/store/store";
import { Subscription } from "@/types/Subscription";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, collection, collectionGroup, doc, limit, orderBy, query, where } from "firebase/firestore";
import { SnapshotOptions } from "firebase/firestore";
import { User } from "next-auth";

const userConverter:FirestoreDataConverter<User> = {
    toFirestore:function(customer:User):DocumentData{
        return {
            email:customer.email,
            image:customer.image,
            name:customer.name,
            
        }
    },
    fromFirestore:function(
        snapshot:QueryDocumentSnapshot,
        options:SnapshotOptions
    ):User{
        const data = snapshot.data(options);
        return{
            id:snapshot.id,
            email:data.email,
            image:data.image,
            name:data.image
        }
    }
}

export const getUserByEmailRef = (email:string)=> 
query(collection(db,'users'),where('email','==',email)).withConverter(userConverter);