"use client";
import AppWrapper from "@/app/components/ui/app-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddProduct() {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [category, setCategory] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCategory = async () => {
    const response = await fetch("/api/category", { method: "GET" });
    const result = await response.json();

    setCategory(result.data);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const fileData = new FormData();
    fileData.set("file", file as File);

    const name = formData.get("name");
    const description = formData.get("description");
    const width = Number(formData.get("width"));
    const height = Number(formData.get("height"));
    const length = Number(formData.get("length"));
    const weight = Number(formData.get("weight"));
    const price = Number(formData.get("price"));

    const objData = {
      name,
      description,
      width,
      height,
      length,
      weight,
      price,
      category: selectedCategory,
      imgSrc: file?.name as string,
    };

    const uploadFile = await fetch("/api/upload", {
      method: "POST",
      body: fileData,
    });

    if (uploadFile.ok) {
      const submitProduct = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(objData),
      });

      if (submitProduct.ok) {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <AppWrapper>
      <main className="px-4 sm:px-4 md:px-0">
        <p className="text-lg mb-4 font-bold">Tambah Produk</p>

        <form onSubmit={handleSubmit}>
          <div className="form-section mb-4">
            <Label>Nama</Label>
            <Input name="name" className="mt-2" />
          </div>

          <div className="form-section mb-4">
            <Label>Deskripsi Produk</Label>
            <Textarea name="description" className="mt-2" />
          </div>

          <div className="form-section mb-4">
            <Label>Kategori</Label>
            <div className="mb-4"></div>

            <select onChange={(evt) => setSelectedCategory(evt.target.value)}>
              {category.map((item: Category) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-section mb-4">
            <Label>Upload Image</Label>

            <input
              type="file"
              name="file"
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                setFile(evt.target.files?.[0])
              }
            />
          </div>

          <div className="form-section mb-4">
            <Label>Harga (Rp)</Label>
            <Input className="mt-4" name="price" type="number" />
          </div>

          <div className="form-section mb-4">
            <Label>Lebar (cm)</Label>
            <Input name="width" className="mt-4" type="number" />
          </div>

          <div className="form-section mb-4">
            <Label>Tinggi (cm)</Label>
            <Input name="height" type="number" className="mt-4" />
          </div>

          <div className="form-section mb-4">
            <Label>Panjang (cm)</Label>
            <Input name="length" type="number" className="mt-4" />
          </div>

          <div className="form-section mb-4">
            <Label>Berat (kg)</Label>
            <Input name="weight" type="number" className="mt-4" />
          </div>

          <div className="button-wrapper">
            <Button>Tambahkan Produk</Button>
          </div>
        </form>
      </main>
    </AppWrapper>
  );
}
