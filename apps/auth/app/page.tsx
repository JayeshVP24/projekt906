"use client"
import { Button } from "@projekt906/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormInput,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@projekt906/ui/components/ui/form"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@projekt906/ui/components/ui/card";
import { toast } from "@projekt906/ui/components/ui/sonner"
import formSchema from "./schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const [passwordType, setPasswordType] = useState<"text" | "password">("password")

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast("form submitted")
    console.log(values)
  }

  return (
    <main className="" >
      <Card className="mt-12 mb-8">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="erpId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ERP ID</FormLabel>
                    <FormControl>
                      <FormInput placeholder="S1032210047" {...field}
                      className="bg-card"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <span className="flex justify-between text-sm font-medium">
                      <FormLabel>Password</FormLabel>
                      <Link href="/forgot-password" className="text-primary">Forgot Password?</Link>
                    </span>
                    <FormControl>
                      <FormInput type="password" placeholder="*****" {...field}
                     className="bg-card"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">Sign In</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            By clicking "Sign in", you accept the  {" "}
            <a target="_blank" className="text-primary underline">Terms & conditions</a> outlined
          </p>
        </CardFooter>
      </Card>
      <p className="font-medium text-muted-foreground">
        Forgot your ERP ID? Contact your <a  className="text-primary underline">ERP Cordinator</a>
      </p>
    </main>
  );
}
