export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function GET(request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

    const result = await db.prepare("SELECT * FROM categories ORDER BY sort_order ASC").all();

    return NextResponse.json({ data: result.results });
  } catch (error) {
    return NextResponse.json({ error: "获取分类失败" }, { status: 500 });
  }
}
