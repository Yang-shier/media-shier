export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getRequestContext } from "@cloudflare/next-on-pages";

const categoryMap: Record<string, string> = {
  tech: "科技",
  finance: "财经",
  sports: "体育",
  entertainment: "娱乐",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}

function estimateReadTime(content: string) {
  const chars = content.length;
  const minutes = Math.ceil(chars / 400);
  return `${minutes} 分钟`;
}

export default async function NewsPage({ params }: { params: { id: string } }) {
  let article: any = null;
  let related: any[] = [];

  try {
    const { env } = getRequestContext();
    const db = env.DB;

    await db.prepare("UPDATE news SET view_count = view_count + 1 WHERE id = ?").bind(params.id).run();
    article = await db.prepare("SELECT * FROM news WHERE id = ?").bind(params.id).first();

    if (article) {
      const relatedResult = await db.prepare(
        "SELECT id, title, category FROM news WHERE category = ? AND id != ? AND is_published = 1 ORDER BY created_at DESC LIMIT 3"
      ).bind(article.category, params.id).all();
      related = relatedResult.results || [];
    }
  } catch {}

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold mb-4">文章不存在</h1>
            <Link href="/" className="text-sm underline hover:opacity-60">
              返回首页
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link
            href={`/category/${article.category}`}
            className="text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-black transition-colors"
          >
            {categoryMap[article.category] || article.category}
          </Link>

          <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold leading-tight">
            {article.title}
          </h1>

          <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
            <span>{article.author || "知讯网"}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{formatDate(article.created_at)}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{estimateReadTime(article.content)}</span>
          </div>

          <hr className="my-10 border-gray-200" />

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              fontSize: "18px",
              lineHeight: "1.75",
              color: "#1a1a1a",
            }}
          />

          <hr className="my-12 border-gray-200" />

          {related.length > 0 && (
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-6">
                相关阅读
              </h3>
              <div className="space-y-4">
                {related.map((item: any) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="block group"
                  >
                    <h4 className="font-medium leading-snug group-hover:opacity-60 transition-opacity">
                      {item.title}
                    </h4>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {categoryMap[item.category] || item.category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
