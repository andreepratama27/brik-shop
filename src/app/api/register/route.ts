import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const findUser = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!!findUser) {
    return NextResponse.json(
      {
        message: "User already added",
      },
      { status: 303 }
    );
  }

  const results = await prisma.user.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json({
    results,
  });
}
