export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

// 模拟新闻详情
const article = {
  id: 1,
  title: "人工智能正在重新定义我们与技术的关系",
  content: `
    <p>在过去的几年里，人工智能技术经历了令人瞩目的发展。从简单的语音助手到能够进行复杂推理的大型语言模型，AI 正在以前所未有的速度改变着我们的生活方式。</p>

    <p>这种变化不仅仅体现在技术层面。更重要的是，它正在重新定义人类与技术之间的关系。我们不再只是技术的使用者，而是开始与技术进行更深层次的互动和协作。</p>

    <h2>技术的人性化</h2>

    <p>传统的人机交互往往是单向的、机械的。用户需要学习复杂的命令和操作流程，才能让机器按照自己的意图工作。但 AI 的出现改变了这一切。</p>

    <p>现代的 AI 系统能够理解自然语言，识别语境，甚至推测用户的意图。这使得人机交互变得更加自然和直观。我们可以用日常对话的方式与机器沟通，而不需要掌握专门的技术知识。</p>

    <h2>协作而非替代</h2>

    <p>关于 AI 是否会取代人类工作的讨论从未停止。但越来越多的实践表明，AI 的真正价值在于增强人类的能力，而不是简单地替代人类。</p>

    <p>在医疗领域，AI 帮助医生更快速地分析影像资料，但最终的诊断决策仍然需要医生的专业判断。在创意产业，AI 可以提供灵感和辅助工具，但创意的核心仍然来自人类的想象力和情感。</p>

    <h2>伦理与责任</h2>

    <p>随着 AI 技术的深入应用，我们也面临着新的伦理挑战。算法的偏见、隐私保护、决策透明度等问题都需要认真对待。</p>

    <p>技术的发展不应该脱离人文关怀。我们需要确保 AI 的发展方向符合人类的价值观，服务于人类的福祉。这需要技术专家、政策制定者和公众的共同努力。</p>

    <h2>展望未来</h2>

    <p>AI 技术仍在快速发展中。未来，我们可能会看到更加智能、更加人性化的 AI 系统。但无论技术如何进步，人类的创造力、同理心和道德判断力都是不可替代的。</p>

    <p>关键在于，我们要学会与 AI 共存，发挥各自的优势，共同创造一个更美好的未来。</p>
  `,
  category: "tech",
  categoryName: "科技",
  author: "张明",
  createdAt: "2026年5月5日",
  readTime: "8 分钟",
};

const related = [
  { id: 5, title: "新能源革命的下一站：固态电池量产在即", category: "科技" },
  { id: 7, title: "量子计算的商业化之路还有多远", category: "科技" },
  { id: 8, title: "元宇宙概念降温后，VR 行业何去何从", category: "科技" },
];

export default async function NewsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16">
          {/* 分类标签 */}
          <Link
            href={`/category/${article.category}`}
            className="text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-black transition-colors"
          >
            {article.categoryName}
          </Link>

          {/* 标题 */}
          <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold leading-tight">
            {article.title}
          </h1>

          {/* 元信息 */}
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
            <span>{article.author}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{article.createdAt}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{article.readTime}</span>
          </div>

          {/* 分隔线 */}
          <hr className="my-10 border-gray-200" />

          {/* 正文 */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              fontSize: "18px",
              lineHeight: "1.75",
              color: "#1a1a1a",
            }}
          />

          {/* 分隔线 */}
          <hr className="my-12 border-gray-200" />

          {/* 相关文章 */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-6">
              相关阅读
            </h3>
            <div className="space-y-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="block group"
                >
                  <h4 className="font-medium leading-snug group-hover:opacity-60 transition-opacity">
                    {item.title}
                  </h4>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {item.category}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
