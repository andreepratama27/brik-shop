import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  cookies().delete("OutsideJwt");

  return NextResponse.json({
    data: null,
    success: true,
    message: "Success logout",
  });
}
