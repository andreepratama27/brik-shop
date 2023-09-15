"use client";
import ProductTable from "@/components/ui/product-table";
import AppWrapper from "../components/ui/app-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProductCard from "../components/product-card";
import CategoryCard from "../components/category-card";

export default function Home() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/add-product");
  };

  return (
    <AppWrapper>
      <div className="card-content grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 px-4 sm:px-4 md:px-0">
        <ProductCard />
        <CategoryCard />
      </div>

      <div className="main-content mt-8 px-4 sm:px-4 md:px-0">
        <div className="button-wrapper mb-4">
          <Button onClick={handleNavigation}>Tambah Product</Button>
        </div>
        <ProductTable />
      </div>
    </AppWrapper>
  );
}
