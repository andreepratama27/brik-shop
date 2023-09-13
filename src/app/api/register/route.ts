import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const findUser = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!!findUser) {
    return NextResponse.json({
      success: false,
      message: "User already registered",
      data: {},
    });
  }

  const hashPassword = bcrypt.hashSync(body.password, 10);

  const results = await prisma.user.create({
    data: {
      ...body,
      password: hashPassword,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Register success",
    data: results,
  });
}
