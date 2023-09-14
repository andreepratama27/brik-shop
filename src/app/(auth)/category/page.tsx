"use client";
import CategoryTable from "@/app/components/category-table";
import AppWrapper from "@/app/components/ui/app-wrapper";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "minimum 2 character length" }),
});

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function DialogDemo() {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const result = await response.json();

    if (result.success) {
      setOpenDialog(false);
    } else {
      console.log(result.message);
    }
  };

  return (
    <Dialog open={openDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpenDialog(true)}>Tambah Kategori</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Kategori</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nama
                </Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Input className="col-span-3" {...field} />
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function Category() {
  return (
    <AppWrapper>
      <p className="text-lg">List Kategori</p>

      <main className="mt-4">
        <div className="button-wrapper mb-4">
          <DialogDemo />
        </div>
        <CategoryTable />

        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormControl>
                  <Input placeholder="Masukkan nama" {...field} />
                </FormControl>
              )}
            />

            <Button type="submit" className="mt-4">
              Tambah
            </Button>
          </form>
        </Form> */}
      </main>
    </AppWrapper>
  );
}
