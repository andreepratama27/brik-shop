import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryDialog from "@/components/category-dialog";
import { useEffect, useState } from "react";
import { DeleteDialog } from "@/components/delete-dialog";
import { getCategory } from "@/app/service/category.service";
import type { Category } from "@prisma/client";

export default function CategoryTable() {
  const [data, setData] = useState<Category[]>([]);

  const fetchCategory = async () => {
    const categories = await getCategory();
    setData(categories.data);
  };

  const deleteCategory = async ({ id }: { id: number }) => {
    const response = await fetch("/api/category", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      fetchCategory();
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <div className="button-wrapper mb-4">
        <CategoryDialog onSuccess={fetchCategory} />
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nama Kategori</TableHead>
            <TableHead>Opsi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <div className="option-wrap flex gap-2">
                  <CategoryDialog category={item} onSuccess={fetchCategory} />
                  <DeleteDialog
                    deleteAction={() => deleteCategory({ id: item.id })}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
