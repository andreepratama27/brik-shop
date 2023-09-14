import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const body = await prisma.category.findMany();

  return NextResponse.json({
    success: true,
    message: `All Categories`,
    data: body,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await prisma.category.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json({
    success: true,
    message: `New category added`,
    data: response,
  });
}
