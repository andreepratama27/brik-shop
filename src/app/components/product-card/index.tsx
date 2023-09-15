import { getProduct } from "@/app/service/product.service";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProduct = async () => {
    const product = await getProduct();
    setProducts(product.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{products.length} Produk</CardTitle>
        <CardDescription>Total Produk</CardDescription>
      </CardHeader>
    </Card>
  );
}
