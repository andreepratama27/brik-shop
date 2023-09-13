import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/",
};

export function middleware(request: NextRequest) {
  const cookies = request.cookies.get("auth_token");

  if (!cookies) NextResponse.redirect(new URL("/login", request.url));
}
