import type { Product } from "@prisma/client";

export async function getProduct(): Promise<ApiResponse<Product[]>> {
  try {
    const response = await fetch("/api/product");
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProductDetail({
  id,
}: {
  id: number;
}): Promise<ApiResponse<Product>> {
  try {
    const response = await fetch(`/api/product/${id}`);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
