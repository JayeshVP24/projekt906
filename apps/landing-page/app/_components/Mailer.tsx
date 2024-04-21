"use client"

import { Button } from "@projekt906/ui/components/ui/button";
import { Input } from "@projekt906/ui/components/ui/input";
import { toast } from "@projekt906/ui/components/ui/sonner"

const Mailer = () => {
  return (
    <form className="flex space-x-2" onSubmit={(e) => {
      e.preventDefault()
      toast.success('Thank you for joining the waitlist')
    }}>
      <Input type='email' required className="bg-muted border-0" placeholder="Enter your email" />
      <Button type="submit" className="px-8" >Join</Button>
    </form>
  )
}

export default Mailer
