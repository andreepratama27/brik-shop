"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductTable from "@/components/ui/product-table";
import AppWrapper from "../components/ui/app-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/add-product");
  };

  return (
    <AppWrapper>
      <main className="py-8">
        <div className="card-content grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">50 Produk</CardTitle>
              <CardDescription>Total Produk</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">50 Kategori</CardTitle>
              <CardDescription>Total Kategori</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="main-content mt-8">
          <div className="button-wrapper mb-4">
            <Button onClick={handleNavigation}>Tambah Product</Button>
          </div>
          <ProductTable />
        </div>
      </main>
    </AppWrapper>
  );
}
