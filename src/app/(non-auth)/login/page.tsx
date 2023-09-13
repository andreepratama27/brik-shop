"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AppWrapper from "@/app/components/ui/app-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().min(2, { message: "minimum 2 character " }),
  password: z.string(),
});

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const result = await response.json();

    if (result.success) {
      router.replace("/");
    } else {
      setError(result.message);
      console.log(result.message);
    }
  };

  return (
    <AppWrapper>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Insert your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insert your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-2">
            Submit
          </Button>
        </form>
      </Form>

      <p className="mt-4">
        Tidak punya akun? Daftar{" "}
        <Link href="/register" className="underline">
          disini
        </Link>
      </p>
    </AppWrapper>
  );
}
