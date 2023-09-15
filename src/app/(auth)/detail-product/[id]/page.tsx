"use client";
import AppWrapper from "@/app/components/ui/app-wrapper";
import { formatCurrency } from "@/app/lib/utils";
import { getProductDetail } from "@/app/service/product.service";
import type { Product } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DetailProduct({ params }: { params: { id: number } }) {
  const [detail, setDetail] = useState<Product | null>(null);
  const fetchDetailProduct = async () => {
    const response = await getProductDetail({ id: params.id });
    setDetail(response.data);
  };

  useEffect(() => {
    fetchDetailProduct();
  }, []);

  return (
    <AppWrapper>
      <div className="flex justify-between gap-8">
        <div className="image-wrapper w-[480px] h-[240px]">
          <div className="w-full h-full bg-black rounded relative">
            <Image
              alt={detail?.name as string}
              className="w-full h-full object-contain"
              src={`/upload/${detail?.imgSrc}`}
              fill
            />
          </div>
        </div>

        <div className="product-detail w-full">
          <div className="product--title">
            <p className="text-lg">{detail?.name}</p>
            <p>{formatCurrency(detail?.price as number)}</p>
          </div>

          <p>{detail?.description}</p>
        </div>
      </div>
    </AppWrapper>
  );
}
