import Image from "next/image";
import Link from "next/link";

import { Button } from "@projekt906/ui/components/ui/button";
import { Input } from "@projekt906/ui/components/ui/input";
// import { toast } from "@projekt906/ui/components/ui/sonner"

import Mail from "./_assets/mail.svg"
import Twitter from "./_assets/twitter.svg"


export default function Page() {

  return (
    <main className="pt-24 space-y-2">
      <h1 className="font-semibold text-xl">Automating processes for colleges</h1>
      <p className="text-muted-foreground text-lg">Join the waitlist and get ready to witness something that has never been before</p>
      <div className="flex space-x-2">
        <Input className="bg-muted border-0" placeholder="Enter your email" />
        <Button className="px-8">Join</Button>
      </div>
      <div className="pt-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <Image src={Mail} alt="Mail Icon" />
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="icon">
            <Image src={Twitter} alt="Twitter Icon" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
