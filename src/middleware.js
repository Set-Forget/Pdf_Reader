"use client";
import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (request.url.includes("login")) {
    return NextResponse.next();
  }
  const userAuthenticated = request.cookies.get('userAuthenticated')?.value;
  if (userAuthenticated === "true") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|locales|assets|api/stripe/webhook).*)",
  ],
};
