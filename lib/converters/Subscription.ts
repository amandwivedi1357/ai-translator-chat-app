import { db } from "@/firebase";
import { Subscription } from "@/types/Subscription";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, collection } from "firebase/firestore";
import { SnapshotOptions } from "firebase/firestore";

const SubscriptionConverters:FirestoreDataConverter<Subscription> = {
    toFirestore:function(subscription:Subscription):DocumentData{
        return {
            ...subscription
        }
    },
    fromFirestore:function(
        snapshot:QueryDocumentSnapshot,
        options:SnapshotOptions
    ):Subscription{
        const data = snapshot.data(options);
        const sub:Subscription = {
    id:snapshot.id,
    metadata : data.metadata,
    stripeLink:data.stripeLink,
    role:"pro",
    quantity:data.quantity,
    items:data.items,
    product:data.product,
    price:data.price,
    prices:data.prices,
    payment_method:data.payment_method,
    latest_invoice:data.latest_invoice,
    status:data.status,
   
    cancel_at_period_end:data.cancel_at_period_end,

    created:data.created,
    current_period_start:data.current_period_start,
    current_period_end:data.cancel_at_period_end,
    ended_at:data.ended_at,
    cancel_at:data.cancel_at,
    canceled_at:data.canceled_at,

    trial_start:data.trial_start,
    trial_end:data.trial_end,
        };
        return sub
    }

    
}

export const subscriptionRef = (userId:string)=>collection(db,'customers',userId,"subscriptions").withConverter(
    SubscriptionConverters
)