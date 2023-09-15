import { JwtSecret } from "@/lib/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies();
  const jwtToken = cookie.get("OutsideJwt");

  if (!jwtToken) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Unauthenticated",
      },
      { status: 401 }
    );
  }

  const { value } = jwtToken;

  try {
    verify(value, JwtSecret as string);

    const response = {
      data: null,
      success: true,
      message: "Successfully authenticate",
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "Something wrong",
      },
      { status: 400 }
    );
  }
}
