'use client'
import { atom } from "jotai";
import { createClient } from "./trpcClient";

export const trpcAtom = atom(() => {
  if(typeof window !== 'undefined') {
    return createClient()
    //@ts-ignore
  } else return null as  ReturnType<typeof createClient>
}
)
