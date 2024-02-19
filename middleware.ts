import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/getUrl";

//this middleware is for link redirection
export async function middleware(req: NextRequest, res: NextResponse) {
  const pathname = decodeURIComponent(req.nextUrl.pathname);

  // Check if the request is for the home page or not a shortened URL
  if (pathname === "/" || pathname.split("/").length > 2) {
    return NextResponse.next();
  }
  const shortUrl = pathname.split("/")[1] ?? "";

  try {
    const url = await getUrl(shortUrl);
    if (!url?.longUrl) return NextResponse.next();
    return NextResponse.redirect(decodeURIComponent(url.longUrl));
  } catch (e) {
    return NextResponse.next();
  }
}
