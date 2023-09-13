import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const findData = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (!!findData && (await bcrypt.compare(body.password, findData.password))) {
    return NextResponse.json({
      success: true,
      message: "Successfully login",
      data: findData,
    });
  }

  return NextResponse.json({
    success: false,
    message: "User not found",
    data: {},
  });
}
