export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

// GET /api/categories - 获取分类列表
export async function GET(request: NextRequest) {
  try {
    // TODO: 从D1数据库查询
    const categories = [
      { id: 1, name: "科技", slug: "tech" },
      { id: 2, name: "财经", slug: "finance" },
      { id: 3, name: "体育", slug: "sports" },
      { id: 4, name: "娱乐", slug: "entertainment" },
    ];

    return NextResponse.json({ data: categories });
  } catch (error) {
    return NextResponse.json({ error: "获取分类失败" }, { status: 500 });
  }
}
