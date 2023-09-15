import { getCategory } from "@/app/service/category.service";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Category } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryCard() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategocy = async () => {
    const category = await getCategory();
    setCategories(category.data);
  };

  useEffect(() => {
    fetchCategocy();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{categories.length} Kategori</CardTitle>
        <CardDescription>
          <Link href="/category">Total Kategori</Link>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
