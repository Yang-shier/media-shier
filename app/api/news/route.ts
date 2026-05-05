export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

// GET /api/news - 获取新闻列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // TODO: 从D1数据库查询
    // const db = getDb(request);
    // const news = await db.prepare("SELECT * FROM news WHERE category = ?").bind(category).all();

    return NextResponse.json({ data: [], total: 0 });
  } catch (error) {
    return NextResponse.json({ error: "获取新闻失败" }, { status: 500 });
  }
}

// POST /api/news - 创建新闻
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, summary, category, coverImage } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "标题和内容不能为空" }, { status: 400 });
    }

    // TODO: 插入到D1数据库
    // const db = getDb(request);
    // const result = await db.prepare(
    //   "INSERT INTO news (title, content, summary, category, cover_image, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))"
    // ).bind(title, content, summary, category, coverImage).run();

    return NextResponse.json({
      success: true,
      message: "新闻发布成功",
      id: 1 // result.meta.last_row_id
    });
  } catch (error) {
    return NextResponse.json({ error: "发布新闻失败" }, { status: 500 });
  }
}
