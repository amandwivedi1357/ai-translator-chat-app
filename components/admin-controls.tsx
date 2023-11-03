// import { ChatMembersRef } from "@/lib/converters/ChatMembers";
// import { getDocs } from "firebase/firestore";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function adminControls(req: NextApiRequest, res: NextApiResponse) {
//     const { chatId } = req.query;
    
//     const hasAccess = (await getDocs(ChatMembersRef(chatId))).docs.map((doc) => doc.id).includes(req.session?.user.id!);
    
//     if (!hasAccess) res.redirect('/chat');
    
//     // ...
    
//     return;
//     }