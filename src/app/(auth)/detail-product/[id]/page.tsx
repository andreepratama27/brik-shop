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
      <div className="flex justify-between gap-8 flex-col px-4 sm:px-4 sm:flex-col md:flex-row md:px-0">
        <div className="image-wrapper w-72 h-72 md:w-[480px] md:h-[240px]">
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
          <div className="product--title border-b-black border-b-2 mb-2">
            <p className="text-lg">{detail?.name}</p>
          </div>

          <p>{formatCurrency(detail?.price as number)}</p>

          <div className="product--description mt-4">
            <p className="text-lg">Description</p>
            <p>{detail?.description}</p>
          </div>

          <div className="product--spesification mt-4">
            <p className="text-lg font-bold border-b-black border-b pb-1 mb-2">
              Spesifikasi
            </p>

            <ul>
              <li>Berat: {detail?.weight} kg</li>
              <li>Lebar: {detail?.width} cm</li>
              <li>Tinggi: {detail?.height} cm</li>
              <li>Panjang: {detail?.length} cm</li>
            </ul>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}
