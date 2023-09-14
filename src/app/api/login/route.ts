import { JwtSecret } from "@/lib/constants";
import { serialize } from "cookie";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(req: NextRequest) {
  const body = await req.json();

  const findData = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (!!findData && (await bcrypt.compare(body.password, findData.password))) {
    const token = jwt.sign({ email: body.email }, JwtSecret as string, {
      expiresIn: MAX_AGE,
    });

    const serialized = serialize("OutsideJwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    const response = {
      success: true,
      message: "Successfully login",
      data: findData,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Set-Cookie": serialized,
      },
    });
  }

  return NextResponse.json({
    success: false,
    message: "User not found",
    data: {},
  });
}
