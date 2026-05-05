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

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  let results: any[] = [];

  if (query) {
    try {
      const { env } = getRequestContext();
      const db = env.DB;
      const searchTerm = `%${query}%`;
      const result = await db.prepare(
        "SELECT * FROM news WHERE is_published = 1 AND (title LIKE ? OR summary LIKE ? OR content LIKE ?) ORDER BY created_at DESC LIMIT 20"
      ).bind(searchTerm, searchTerm, searchTerm).all();
      results = result.results || [];
    } catch {}
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <header className="mb-12">
            <h1 className="text-3xl font-serif font-bold">搜索结果</h1>
            {query && (
              <p className="mt-2 text-gray-500">
                关键词：<span className="text-black">{query}</span>
              </p>
            )}
          </header>

          {!query ? (
            <div className="py-16 text-center text-gray-500">
              请输入搜索关键词
            </div>
          ) : results.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-500">未找到相关文章</p>
              <Link href="/" className="mt-4 inline-block text-sm underline hover:opacity-60">
                返回首页
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500 mb-8">找到 {results.length} 篇文章</p>
              <div className="space-y-0">
                {results.map((article: any, index: number) => (
                  <article key={article.id} className={`py-8 ${index !== 0 ? "border-t border-gray-100" : ""}`}>
                    <Link href={`/news/${article.id}`} className="block group">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {categoryMap[article.category] || article.category}
                      </span>
                      <h2 className="mt-2 text-xl font-serif font-bold leading-snug group-hover:opacity-60 transition-opacity">
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
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
