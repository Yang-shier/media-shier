export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function GET(request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = "SELECT * FROM news WHERE is_published = 1";
    const bindings: any[] = [];

    if (category && category !== "all") {
      query += " AND category = ?";
      bindings.push(category);
    }

    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    bindings.push(limit, offset);

    const result = await db.prepare(query).bind(...bindings).all();

    const countQuery = category && category !== "all"
      ? await db.prepare("SELECT COUNT(*) as total FROM news WHERE is_published = 1 AND category = ?").bind(category).first()
      : await db.prepare("SELECT COUNT(*) as total FROM news WHERE is_published = 1").first();

    return NextResponse.json({
      data: result.results,
      total: (countQuery as any)?.total || 0,
    });
  } catch (error) {
    console.error("获取文章失败:", error);
    return NextResponse.json({
      error: "获取文章失败",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

    const body = await request.json();
    const { title, content, summary, category, coverImage } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "标题和内容不能为空" }, { status: 400 });
    }

    const result = await db.prepare(
      "INSERT INTO news (title, content, summary, category, cover_image) VALUES (?, ?, ?, ?, ?)"
    ).bind(
      title,
      content,
      summary || "",
      category || "tech",
      coverImage || ""
    ).run();

    return NextResponse.json({
      success: true,
      message: "发布成功",
      id: result.meta.last_row_id,
    });
  } catch (error) {
    console.error("发布失败:", error);
    return NextResponse.json({
      error: "发布失败",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
