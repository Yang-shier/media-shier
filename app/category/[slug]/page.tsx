export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const categoryMeta: Record<string, { name: string; description: string }> = {
  tech: { name: "科技", description: "前沿技术与数字生活" },
  finance: { name: "财经", description: "经济趋势与市场洞察" },
  sports: { name: "体育", description: "赛事动态与体育文化" },
  entertainment: { name: "娱乐", description: "影视音乐与流行文化" },
  all: { name: "全部", description: "所有文章" },
};

const allArticles = [
  { id: 1, title: "人工智能正在重新定义我们与技术的关系", summary: "从日常对话到复杂决策，AI 正以前所未有的方式融入人类生活。", category: "tech", categoryName: "科技", author: "张明", createdAt: "2026年5月5日", readTime: "8 分钟" },
  { id: 2, title: "全球经济复苏信号明确，新兴市场成为增长引擎", summary: "国际货币基金组织最新报告指出，全球经济正在走出低谷。", category: "finance", categoryName: "财经", author: "李华", createdAt: "2026年5月5日", readTime: "6 分钟" },
  { id: 3, title: "世界杯预选赛格局渐明，亚洲足球迎来历史性突破", summary: "随着预选赛进入白热化阶段，亚洲球队展现出前所未有的竞争力。", category: "sports", categoryName: "体育", author: "王强", createdAt: "2026年5月4日", readTime: "5 分钟" },
  { id: 4, title: "独立电影的黄金时代：小成本制作如何征服全球观众", summary: "在流媒体平台的推动下，独立电影正在经历前所未有的繁荣期。", category: "entertainment", categoryName: "娱乐", author: "陈静", createdAt: "2026年5月4日", readTime: "7 分钟" },
  { id: 5, title: "新能源革命的下一站：固态电池量产在即", summary: "经过多年研发，固态电池技术终于走到了商业化的临界点。", category: "tech", categoryName: "科技", author: "刘洋", createdAt: "2026年5月3日", readTime: "6 分钟" },
  { id: 6, title: "央行政策转向：宽松周期开启对市场意味着什么", summary: "在经济增速放缓的背景下，全球主要央行纷纷释放宽松信号。", category: "finance", categoryName: "财经", author: "赵磊", createdAt: "2026年5月3日", readTime: "5 分钟" },
];

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const meta = categoryMeta[slug] || { name: slug, description: "" };
  const articles = slug === "all" ? allArticles : allArticles.filter((a) => a.category === slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* 分类标题 */}
          <header className="mb-12">
            <h1 className="text-3xl font-serif font-bold">{meta.name}</h1>
            <p className="mt-2 text-gray-500">{meta.description}</p>
          </header>

          {/* 文章列表 */}
          {articles.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-500">暂无文章</p>
              <Link href="/" className="mt-4 inline-block text-sm underline hover:opacity-60">
                返回首页
              </Link>
            </div>
          ) : (
            <div className="space-y-0">
              {articles.map((article, index) => (
                <article key={article.id} className={`py-8 ${index !== 0 ? "border-t border-gray-100" : ""}`}>
                  <Link href={`/news/${article.id}`} className="block group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {article.categoryName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-serif font-bold leading-snug group-hover:opacity-60 transition-opacity">
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
