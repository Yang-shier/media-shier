export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getRequestContext } from "@cloudflare/next-on-pages";

const categoryMeta: Record<string, { name: string; description: string }> = {
  tech: { name: "科技", description: "前沿技术与数字生活" },
  finance: { name: "财经", description: "经济趋势与市场洞察" },
  sports: { name: "体育", description: "赛事动态与体育文化" },
  entertainment: { name: "娱乐", description: "影视音乐与流行文化" },
  all: { name: "全部", description: "所有文章" },
};

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

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const meta = categoryMeta[slug] || { name: slug, description: "" };
  let articles: any[] = [];

  try {
    const { env } = getRequestContext();
    const db = env.DB;

    if (slug === "all") {
      const result = await db.prepare(
        "SELECT * FROM news WHERE is_published = 1 ORDER BY created_at DESC LIMIT 20"
      ).all();
      articles = result.results || [];
    } else {
      const result = await db.prepare(
        "SELECT * FROM news WHERE is_published = 1 AND category = ? ORDER BY created_at DESC LIMIT 20"
      ).bind(slug).all();
      articles = result.results || [];
    }
  } catch {}

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <header className="mb-12">
            <h1 className="text-3xl font-serif font-bold">{meta.name}</h1>
            <p className="mt-2 text-gray-500">{meta.description}</p>
          </header>

          {articles.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-500">暂无文章</p>
              <Link href="/" className="mt-4 inline-block text-sm underline hover:opacity-60">
                返回首页
              </Link>
            </div>
          ) : (
            <div className="space-y-0">
              {articles.map((article: any, index: number) => (
                <article key={article.id} className={`py-8 ${index !== 0 ? "border-t border-gray-100" : ""}`}>
                  <Link href={`/news/${article.id}`} className="block group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {categoryMap[article.category] || article.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {estimateReadTime(article.content)}
                      </span>
                    </div>
                    <h2 className="text-xl font-serif font-bold leading-snug group-hover:opacity-60 transition-opacity">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                      {article.summary}
                    </p>
                    <div className="mt-3 text-xs text-gray-400">
                      {article.author || "知讯网"} · {formatDate(article.created_at)}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
