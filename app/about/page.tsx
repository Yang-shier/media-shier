export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-serif font-bold">关于我们</h1>

          <div className="mt-12 space-y-6 text-gray-700 leading-relaxed">
            <p>
              我们是一个专注于提供高质量新闻资讯的平台。在信息爆炸的时代，我们相信优质内容的价值，致力于为读者筛选和呈现真正有价值的信息。
            </p>

            <p>
              我们的团队由经验丰富的记者、编辑和技术专家组成。我们坚持新闻专业主义，追求客观、准确、深入的报道。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-6">我们的价值观</h2>

            <p>
              <strong>真实</strong> — 我们坚持事实核查，拒绝虚假信息。
            </p>

            <p>
              <strong>独立</strong> — 我们保持编辑独立性，不受外部利益影响。
            </p>

            <p>
              <strong>深度</strong> — 我们追求深度报道，而不仅仅是表面信息。
            </p>

            <p>
              <strong>多元</strong> — 我们尊重不同观点，呈现多元视角。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-6">联系我们</h2>

            <p>
              如果您有任何问题、建议或合作意向，欢迎通过<a href="/contact" className="underline hover:opacity-60">联系页面</a>与我们取得联系。
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
