// 'use server'

import { generatePortalLink } from "@/actions/generatePortalLink";
import Link from "next/link";

export default function ManageAccountButton() {
  return (
    <form action={generatePortalLink}>
      <button type="submit">
        You are already subscribed to PRO
      </button>
    </form>

    // <Link href={'/chat'}>
    //    <button>
    //      You are already subscribed to PRO
    //    </button>
    // </Link>
  )
}
