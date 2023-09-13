import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const findData = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (!!findData) {
    return NextResponse.json(
      {
        findData,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      message: "User not found",
    },
    { status: 404 }
  );
}
