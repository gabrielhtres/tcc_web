import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value;

	if (req.nextUrl.pathname === "/signin") {
		if (token) {
			return NextResponse.redirect(new URL("/scale", req.url));
		}

		return NextResponse.next();
	}

	if (token) {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL("/signin", req.url));
}

// See "Matching Paths" below to learn more
export const config = {
	// matcher: "/scale/:path*",
	matcher: ["/signin", "/scale/:path*"],
};
