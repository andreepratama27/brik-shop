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

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const response = await prisma.category.update({
    where: {
      id: body.id,
    },
    data: body,
  });

  return NextResponse.json({
    success: true,
    message: `category updated`,
    data: response,
  });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const response = await prisma.category.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json({
    success: true,
    message: `category successfully deleted`,
    data: response,
  });
}
