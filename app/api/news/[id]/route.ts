export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;
    const { id } = params;

    await db.prepare("UPDATE news SET view_count = view_count + 1 WHERE id = ?").bind(id).run();

    const news = await db.prepare("SELECT * FROM news WHERE id = ?").bind(id).first();

    if (!news) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    return NextResponse.json({ data: news });
  } catch (error) {
    return NextResponse.json({ error: "获取文章失败" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;
    const { id } = params;
    const body = await request.json();
    const { title, content, summary, category, coverImage } = body;

    await db.prepare(
      "UPDATE news SET title = ?, content = ?, summary = ?, category = ?, cover_image = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(title, content, summary || "", category, coverImage || "", id).run();

    return NextResponse.json({ success: true, message: "更新成功" });
  } catch (error) {
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;
    const { id } = params;

    await db.prepare("DELETE FROM news WHERE id = ?").bind(id).run();

    return NextResponse.json({ success: true, message: "删除成功" });
  } catch (error) {
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}
