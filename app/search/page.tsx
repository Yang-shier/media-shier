export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const allArticles = [
  { id: 1, title: "人工智能正在重新定义我们与技术的关系", summary: "从日常对话到复杂决策，AI 正以前所未有的方式融入人类生活。", category: "科技", author: "张明", createdAt: "2026年5月5日" },
  { id: 2, title: "全球经济复苏信号明确，新兴市场成为增长引擎", summary: "国际货币基金组织最新报告指出，全球经济正在走出低谷。", category: "财经", author: "李华", createdAt: "2026年5月5日" },
  { id: 3, title: "世界杯预选赛格局渐明，亚洲足球迎来历史性突破", summary: "随着预选赛进入白热化阶段，亚洲球队展现出前所未有的竞争力。", category: "体育", author: "王强", createdAt: "2026年5月4日" },
  { id: 4, title: "独立电影的黄金时代：小成本制作如何征服全球观众", summary: "在流媒体平台的推动下，独立电影正在经历前所未有的繁荣期。", category: "娱乐", author: "陈静", createdAt: "2026年5月4日" },
  { id: 5, title: "新能源革命的下一站：固态电池量产在即", summary: "经过多年研发，固态电池技术终于走到了商业化的临界点。", category: "科技", author: "刘洋", createdAt: "2026年5月3日" },
  { id: 6, title: "央行政策转向：宽松周期开启对市场意味着什么", summary: "在经济增速放缓的背景下，全球主要央行纷纷释放宽松信号。", category: "财经", author: "赵磊", createdAt: "2026年5月3日" },
];

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";

  // 简单的搜索过滤
  const results = query
    ? allArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.summary.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* 搜索标题 */}
          <header className="mb-12">
            <h1 className="text-3xl font-serif font-bold">搜索结果</h1>
            {query && (
              <p className="mt-2 text-gray-500">
                关键词：<span className="text-black">{query}</span>
              </p>
            )}
          </header>

          {/* 搜索结果 */}
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
                {results.map((article, index) => (
                  <article key={article.id} className={`py-8 ${index !== 0 ? "border-t border-gray-100" : ""}`}>
                    <Link href={`/news/${article.id}`} className="block group">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {article.category}
                      </span>
                      <h2 className="mt-2 text-xl font-serif font-bold leading-snug group-hover:opacity-60 transition-opacity">
                        {article.title}
                      </h2>
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                        {article.summary}
                      </p>
                      <div className="mt-3 text-xs text-gray-400">
                        {article.author} · {article.createdAt}
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
