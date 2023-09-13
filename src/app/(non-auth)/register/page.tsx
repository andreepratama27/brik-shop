"use client";

import AppWrapper from "@/app/components/ui/app-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const result = await response.json();

    if (result.success) {
      router.replace("/login");
    } else {
      setError(result.message);
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
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan email" {...field} />
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
                    placeholder="Masukkan password"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="w-full mt-2" type="submit">
            Daftar
          </Button>
        </form>
      </Form>

      <p className="mt-4">
        Sudah punya akun? Login{" "}
        <Link href="/login" className="underline">
          disini
        </Link>
      </p>
    </AppWrapper>
  );
}
