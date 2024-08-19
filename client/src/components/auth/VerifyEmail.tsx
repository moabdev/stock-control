"use client";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function VerifyEmail() {
  const [code, setCode] = React.useState<string>("");

  const handleVerifyEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Email Enviado!",
      description: `code: ${code}`,
    });
  };

  return (
    <div className="flex flex-col justify-center max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200">
        Verifique seu e-mail
      </h2>

      <form className="my-8" onSubmit={handleVerifyEmail}>
        <div className="flex flex-col items-center">
          <InputOTP
            className="w-full"
            maxLength={6}
            value={code}
            onChange={(code) => setCode(code)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            className="w-full bg-gradient-to-r from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 mt-8 text-white"
            type="submit"
          >
            Enviar &rarr;
          </Button>
        </div>
      </form>
    </div>
  );
}
