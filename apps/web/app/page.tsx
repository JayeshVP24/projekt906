"use client"
import { Button } from "@projekt906/ui/components/ui/button";
import { toast } from "@projekt906/ui/components/ui/sonner"

export default function Page() {

  function onClick() {
    toast("button clicked")
  }
  return (
    <main>
      <Button onClick={onClick} >Click me</Button>
      <p className="mt-10 text-4xl bg-red-50">yolo</p>
    </main>
  );
}
