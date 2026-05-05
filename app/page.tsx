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

async function getNews() {
  try {
    const { env } = getRequestContext();
    const db = env.DB;
    const result = await db.prepare("SELECT * FROM news WHERE is_published = 1 ORDER BY created_at DESC LIMIT 10").all();
    return result.results || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const allNews = await getNews();
  const featured = allNews[0];
  const articles = allNews.slice(1, 6);
  const trending = allNews.slice(0, 4);

  const tags = ["人工智能", "经济", "新能源", "世界杯", "电影", "央行", "科技", "投资"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* 头条 */}
        {featured && (
          <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
            <Link href={`/news/${featured.id}`} className="block group">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {categoryMap[featured.category as string] || featured.category}
              </span>
              <h1 className="mt-3 text-4xl md:text-5xl font-serif font-bold leading-tight text-balance group-hover:opacity-70 transition-opacity">
                {featured.title}
              </h1>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-3xl">
                {featured.summary}
              </p>
              <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">
                <span>{featured.author || "知讯网"}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{formatDate(featured.created_at as string)}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{estimateReadTime(featured.content as string)}</span>
              </div>
            </Link>
          </section>
        )}

        <hr className="max-w-6xl mx-auto border-gray-200" />

        {/* 主内容区 */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* 文章列表 */}
            <div className="lg:col-span-2">
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
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-2">
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

            {/* 侧边栏 */}
            <aside className="lg:border-l lg:border-gray-100 lg:pl-12">
              {/* 热门文章 */}
              <div className="mb-12">
                <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-6">
                  热门阅读
                </h3>
                <div className="space-y-5">
                  {trending.map((item: any, index: number) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.id}`}
                      className="flex gap-4 group"
                    >
                      <span className="text-2xl font-serif font-bold text-gray-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="text-sm font-medium leading-snug group-hover:opacity-60 transition-opacity">
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-400 mt-1 block">
                          {categoryMap[item.category] || item.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 标签 */}
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-6">
                  话题
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 border border-gray-200 text-xs text-gray-600 hover:border-black hover:text-black transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
