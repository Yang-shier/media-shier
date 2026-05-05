export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

// 模拟数据
const featured = {
  id: 1,
  title: "人工智能正在重新定义我们与技术的关系",
  summary: "从日常对话到复杂决策，AI 正以前所未有的方式融入人类生活。这不仅是技术的进步，更是一场关于人类未来的深刻变革。",
  category: "tech",
  categoryName: "科技",
  author: "张明",
  createdAt: "2026年5月5日",
  readTime: "8 分钟",
};

const articles = [
  {
    id: 2,
    title: "全球经济复苏信号明确，新兴市场成为增长引擎",
    summary: "国际货币基金组织最新报告指出，全球经济正在走出低谷，新兴市场国家的强劲表现为世界经济注入了新的活力。",
    category: "finance",
    categoryName: "财经",
    author: "李华",
    createdAt: "2026年5月5日",
    readTime: "6 分钟",
  },
  {
    id: 3,
    title: "世界杯预选赛格局渐明，亚洲足球迎来历史性突破",
    summary: "随着预选赛进入白热化阶段，亚洲球队展现出前所未有的竞争力，多支球队有望创造历史最佳战绩。",
    category: "sports",
    categoryName: "体育",
    author: "王强",
    createdAt: "2026年5月4日",
    readTime: "5 分钟",
  },
  {
    id: 4,
    title: "独立电影的黄金时代：小成本制作如何征服全球观众",
    summary: "在流媒体平台的推动下，独立电影正在经历前所未有的繁荣期。越来越多的创作者选择用更自由的方式讲述故事。",
    category: "entertainment",
    categoryName: "娱乐",
    author: "陈静",
    createdAt: "2026年5月4日",
    readTime: "7 分钟",
  },
  {
    id: 5,
    title: "新能源革命的下一站：固态电池量产在即",
    summary: "经过多年研发，固态电池技术终于走到了商业化的临界点。这项突破将彻底改变电动汽车和储能行业的格局。",
    category: "tech",
    categoryName: "科技",
    author: "刘洋",
    createdAt: "2026年5月3日",
    readTime: "6 分钟",
  },
  {
    id: 6,
    title: "央行政策转向：宽松周期开启对市场意味着什么",
    summary: "在经济增速放缓的背景下，全球主要央行纷纷释放宽松信号。投资者需要重新审视资产配置策略。",
    category: "finance",
    categoryName: "财经",
    author: "赵磊",
    createdAt: "2026年5月3日",
    readTime: "5 分钟",
  },
];

const trending = [
  { id: 1, title: "人工智能正在重新定义我们与技术的关系", category: "科技" },
  { id: 2, title: "全球经济复苏信号明确", category: "财经" },
  { id: 3, title: "世界杯预选赛格局渐明", category: "体育" },
  { id: 5, title: "固态电池量产在即", category: "科技" },
];

const tags = ["人工智能", "经济", "新能源", "世界杯", "电影", "央行", "科技", "投资"];

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* 头条 */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <Link href={`/news/${featured.id}`} className="block group">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {featured.categoryName}
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-serif font-bold leading-tight text-balance group-hover:opacity-70 transition-opacity">
              {featured.title}
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-3xl">
              {featured.summary}
            </p>
            <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">
              <span>{featured.author}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{featured.createdAt}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{featured.readTime}</span>
            </div>
          </Link>
        </section>

        <hr className="max-w-6xl mx-auto border-gray-200" />

        {/* 主内容区 */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* 文章列表 */}
            <div className="lg:col-span-2">
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
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-2">
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

            {/* 侧边栏 */}
            <aside className="lg:border-l lg:border-gray-100 lg:pl-12">
              {/* 热门文章 */}
              <div className="mb-12">
                <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-6">
                  热门阅读
                </h3>
                <div className="space-y-5">
                  {trending.map((item, index) => (
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
                          {item.category}
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
