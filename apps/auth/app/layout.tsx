import "@projekt906/ui/globals.css";
import { Toaster } from "@projekt906/ui/components/ui/sonner"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@projekt906/ui/lib/utils";
import Image from "next/image";

import Logo from "@projekt906/ui/assets/logo.svg"
import BG from "./bg.png"
import BGLayer from "./bg.svg"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "906 ERP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen max-w-md mx-auto px-8 py-8 flex flex-col")}>
        <span className="">
          <Image src={BG} alt="background" className="absolute top-0 inset-0 -z-20" />
          <Image src={BGLayer} alt="background layer" className="absolute top-0 inset-0 -z-10" />
        </span>
        <header>
          <Image src={Logo} alt="logo" />
        </header>
        {children}
        <footer className="flex justify-between mt-auto text-muted-foreground text-sm">
          <p className="">©906. All rights Reserved</p>
          <a target="_blank">Contact</a>
          <a target="_blank">Privacy & terms</a>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
