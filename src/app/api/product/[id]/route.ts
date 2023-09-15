import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = Number(params.id);
  const response = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  return NextResponse.json({
    data: response,
    message: "Successfully find data",
    success: true,
  });
}
