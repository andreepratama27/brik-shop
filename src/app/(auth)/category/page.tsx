"use client";
import CategoryTable from "@/app/components/category-table";
import AppWrapper from "@/app/components/ui/app-wrapper";

export default function Category() {
  return (
    <AppWrapper>
      <main className="px-4 sm:px-4 md:px-0">
        <p className="text-lg">List Kategori</p>

        <main className="mt-4">
          <CategoryTable />
        </main>
      </main>
    </AppWrapper>
  );
}
