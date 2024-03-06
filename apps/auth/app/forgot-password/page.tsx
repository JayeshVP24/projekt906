"use client"
import { Button } from "@projekt906/ui/components/ui/button";
import { Label } from "@projekt906/ui/components/ui/label"
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
import { PinField } from "@projekt906/ui/components/ui/pin-input"
import { toast } from "@projekt906/ui/components/ui/sonner"
import { erpSchema, otpSchema, passwordSchema } from "./schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const erpForm = useForm<z.infer<typeof erpSchema>>({
    resolver: zodResolver(erpSchema),
  })
  
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  })

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  })

  const [otpSent, setOtpSent] = useState<boolean>(false)
  const [otpConfirmed, setOtpConfirmed] = useState<boolean>(false)
  const [resendOtp, setResendOtp] = useState<number>(10)

  function onErpSubmit(values: z.infer<typeof erpSchema>) {
    toast("OTP sent, check your phone")
    setOtpSent(true)
    console.log(values)

    setResendOtp(10)
    let secondsPassed = 0;
    const intervalId = setInterval(() => {
      setResendOtp(9 - secondsPassed)
      secondsPassed += 1;
      console.log("1 second interval.");

      if (secondsPassed > 10) {
        clearInterval(intervalId);
        console.log("10 seconds have passed. Stopping.");
      }
    }, 1000)

  }

  function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    toast("Otp Submitted")
    setOtpConfirmed(true)
    console.log(values)
  }

  function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    toast("password submitted")
    console.log(values)
  }

  function resetForm() {
    setOtpSent(false)
    setOtpConfirmed(false)
    setResendOtp(10)
    erpForm.reset()
    otpForm.reset()
    passwordForm.reset()
  }

  useEffect(() => {
    console.log("otp - ", otpForm.getValues("otp"))
  }, [otpForm])

  return (
    <main className="" >
      <Card className="mt-12 mb-8">
        <CardHeader>
          <CardTitle>Forgot your Password?</CardTitle>
          <CardDescription>No worries, enter the following details</CardDescription>
        </CardHeader>
        <CardContent>
          {!otpSent && (
            <Form {...erpForm}>
              <form onSubmit={erpForm.handleSubmit(onErpSubmit)} className="space-y-8">
                <FormField
                  control={erpForm.control}
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
                <Button className="w-full" type="submit">Submit</Button>
              </form>
            </Form>
          )}
          {otpSent && !otpConfirmed && (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-8">
                <div className="space-y-2">
                  <Label>Enter 6 digit OTP</Label>
                  <FormInput disabled value={erpForm.getValues("erpId")} className="bg-card"/>
                  <div className="flex gap-4 pt-4">
                    <PinField 
                      className="bg-card" 
                      length={6}
                      onComplete={(key) => {
                        console.log("key - ", key)
                        otpForm.setValue("otp", key)
                      }}
                    />
                  </div>
                </div>
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="space-y-0 !mt-0 !mb-0">
                      <FormControl>
                        <FormInput type="hidden" {...field} className="bg-card invisible"/>
                      </FormControl>
                      <FormMessage className="pt-2" />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <div>
                    {resendOtp > 0 && <p className="text-muted-foreground">Resend OTP in {" "}
                      <span className="text-primary">
                        {resendOtp} {" "} seconds
                      </span>
                    </p>}
                    {resendOtp <= 0 && 
                      <button className="text-primary hover:underline"
                        type="button"
                        onClick={erpForm.handleSubmit(onErpSubmit)}
                      >Resend OTP</button>
                    }
                  </div>
                  <Button className="w-full" type="submit">Submit</Button>
                  <Button className="w-full bg-card" type="button" variant="outline"
                    onClick={() => resetForm()}
                  >Reset ERP ID</Button>
                </div>
              </form>
            </Form>
          )}
          {otpConfirmed && (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-8">
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <FormInput type="password" placeholder="*********" {...field}
                          className="bg-card"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <FormInput type="password" placeholder="*********" {...field}
                          className="bg-card"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <Button className="w-full" type="submit">Submit</Button>
                  <Button className="w-full bg-card" type="button" variant="outline"
                    onClick={() => resetForm()}
                  >Reset ERP ID</Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            By clicking "Submit", you accept the  {" "}
            <a target="_blank" className="text-primary underline">Terms & conditions</a> outlined
          </p>
        </CardFooter>
      </Card>
      <p className="font-medium text-muted-foreground">
        Want to sign in? <Link href="/" className="text-primary underline">Click here</Link>
      </p>
    </main>
  );
}
