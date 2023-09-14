"use client";
import CategoryTable from "@/app/components/category-table";
import AppWrapper from "@/app/components/ui/app-wrapper";

export default function Category() {
  return (
    <AppWrapper>
      <p className="text-lg">List Kategori</p>

      <main className="mt-4">
        <CategoryTable />
      </main>
    </AppWrapper>
  );
}
