import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import type { Category } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2, { message: "minimum 2 character length" }),
});

export default function CategoryDialog({
  onSuccess,
  category,
}: {
  onSuccess: () => void;
  category?: Category;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: category?.name ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let response;

    if (!!category) {
      response = await fetch("/api/category", {
        method: "PUT",
        body: JSON.stringify({
          ...values,
          id: category.id,
        }),
      });
    } else {
      response = await fetch("/api/category", {
        method: "POST",
        body: JSON.stringify(values),
      });
    }

    const result = await response?.json();

    if (result.success) {
      setOpenDialog(false);
      onSuccess();
    } else {
      console.log(result.message);
    }
  };

  return (
    <Dialog open={openDialog}>
      <DialogTrigger asChild>
        {!!category ? (
          <Button variant="link" onClick={() => setOpenDialog(true)}>
            Edit
          </Button>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Tambah Kategori</Button>
        )}
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
