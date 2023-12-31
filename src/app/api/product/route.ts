import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await prisma.product.findMany();

  return NextResponse.json({
    data: response,
    success: true,
    message: "All Products",
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await prisma.product.create({
    data: body,
  });

  return NextResponse.json({
    data: response,
    success: true,
    message: "Success add new product",
  });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const response = await prisma.product.delete({
    where: { id: body.id },
  });

  return NextResponse.json({
    data: null,
    success: true,
    message: "Success delete product",
  });
}
