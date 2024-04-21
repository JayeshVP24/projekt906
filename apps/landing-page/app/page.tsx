import Image from "next/image";
import Link from "next/link";

import { Button } from "@projekt906/ui/components/ui/button";

import Mail from "./_assets/mail.svg"
import Twitter from "./_assets/twitter.svg"
import Mailer from "./_components/Mailer";


export default function Page() {

  return (
    <main className="pt-24 space-y-2">
      <h1 className="font-semibold text-xl">Automating processes for colleges</h1>
      <p className="text-muted-foreground text-lg">Join the waitlist and get ready to witness something that has never been before</p>
      <Mailer />
      <div className="pt-4">
        <Link href="mailto:agnixerp@gmail.com">
          <Button variant="ghost" size="icon">
            <Image src={Mail} alt="Mail Icon" />
          </Button>
        </Link>
        <Link href="https://twitter.com/agnixerp">
          <Button variant="ghost" size="icon">
            <Image src={Twitter} alt="Twitter Icon" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
