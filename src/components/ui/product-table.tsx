"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { formatCurrency } from "@/app/lib/utils";
import { DeleteDialog } from "../delete-dialog";
import type { Product } from "@prisma/client";
import { getProduct } from "@/app/service/product.service";
import Link from "next/link";

export default function ProductTable() {
  const [product, setProduct] = useState<Product[]>([]);

  const fetchProduct = async () => {
    const products = await getProduct();
    setProduct(products.data);
  };

  const deleteProduct = async ({ productId }: { productId: number }) => {
    const response = await fetch("/api/product", {
      method: "DELETE",
      body: JSON.stringify({ id: productId }),
    });

    if (response.ok) {
      fetchProduct();
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nama Produk</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead>Tinggi (cm)</TableHead>
          <TableHead>Lebar (cm)</TableHead>
          <TableHead>Panjang (cm)</TableHead>
          <TableHead>Berat (cm)</TableHead>
          <TableHead className="text-right">Harga</TableHead>
          <TableHead className="text-right">Gambar</TableHead>
          <TableHead className="text-center">Opsi</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {product.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              <Link href={`/detail-product/${item.id}`}>{item.name}</Link>
            </TableCell>
            <TableCell>{item.description.slice(0, 10)}...</TableCell>
            <TableCell>{item.length}</TableCell>
            <TableCell className="text-right">{item.width}</TableCell>
            <TableCell className="text-right">{item.length}</TableCell>
            <TableCell className="text-right">{item.weight}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(item.price)}
            </TableCell>
            <TableCell className="flex justify-end">
              <div className="image-wrapper w-10 h-10 bg-red-500">
                <Image
                  className="w-full h-full"
                  height={40}
                  width={40}
                  src={`/upload/${item.imgSrc}`}
                  alt={item.name}
                />
              </div>
            </TableCell>
            <TableCell>
              <DeleteDialog
                deleteAction={() => deleteProduct({ productId: item.id })}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
