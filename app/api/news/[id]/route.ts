export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

// GET /api/news/[id] - 获取单个新闻
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: 从D1数据库查询
    // const db = getDb(request);
    // const news = await db.prepare("SELECT * FROM news WHERE id = ?").bind(id).first();

    return NextResponse.json({ data: null });
  } catch (error) {
    return NextResponse.json({ error: "获取新闻失败" }, { status: 500 });
  }
}

// PUT /api/news/[id] - 更新新闻
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, summary, category, coverImage } = body;

    // TODO: 更新D1数据库
    // const db = getDb(request);
    // await db.prepare(
    //   "UPDATE news SET title = ?, content = ?, summary = ?, category = ?, cover_image = ?, updated_at = datetime('now') WHERE id = ?"
    // ).bind(title, content, summary, category, coverImage, id).run();

    return NextResponse.json({ success: true, message: "更新成功" });
  } catch (error) {
    return NextResponse.json({ error: "更新新闻失败" }, { status: 500 });
  }
}

// DELETE /api/news/[id] - 删除新闻
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: 从D1数据库删除
    // const db = getDb(request);
    // await db.prepare("DELETE FROM news WHERE id = ?").bind(id).run();

    return NextResponse.json({ success: true, message: "删除成功" });
  } catch (error) {
    return NextResponse.json({ error: "删除新闻失败" }, { status: 500 });
  }
}
