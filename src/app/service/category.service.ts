import type { Category } from "@prisma/client";

export async function getCategory(): Promise<ApiResponse<Category[]>> {
  try {
    const response = await fetch("/api/category");
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
