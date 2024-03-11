"use client"
import { Button } from "@projekt906/ui/components/ui/button";
import { toast } from "@projekt906/ui/components/ui/sonner"
import { trpcAtom } from "../lib/atoms";
import { useAtom } from "jotai";

export default function Page() {

  const [trpc] = useAtom(trpcAtom)
  async function onClick() {
    // console.log(publicEnv.NEXT_PUBLIC_API_URL)
    // console.log(trpcClient.trpcClient)
    const msg = await trpc.hello.query("jayesh")
    toast("Hello from trpc! " + msg)
  }
  return (
    <main>
      <Button onClick={onClick} >Click me</Button>
      <p className="mt-10 text-4xl bg-red-50">yolo</p>
    </main>
  );
}
