import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PROTECTED_ROUTES = ["/create", "/profile", "/chat"];

export function middleware(request: NextRequest) {
    // 🔹 сначала даём next-intl обработать locale
    const intlResponse = intlMiddleware(request);
    if (intlResponse) return intlResponse;

    const { pathname } = request.nextUrl;

    // /en/create → ["", "en", "create"]
    const parts = pathname.split("/");
    const locale = parts[1];
    const path = `/${parts.slice(2).join("/")}`;

    const isProtected = PROTECTED_ROUTES.some((route) =>
        path.startsWith(route)
    );

    if (!isProtected) {
        return NextResponse.next();
    }

    const token =
        request.cookies.get("authToken")?.value ||
        request.headers.get("authorization");

    if (!token) {
        return NextResponse.redirect(
            new URL(`/${locale}/ads/auth/login`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/(en|ru|kz)/:path*"],
};
