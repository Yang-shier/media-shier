export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-serif font-bold">关于知讯网</h1>

          <div className="mt-12 space-y-6 text-gray-700 leading-relaxed">
            <p>
              知讯网是一个专注于提供高质量资讯内容的平台。在信息碎片化的时代，我们致力于为读者筛选和呈现真正有价值的深度内容，让阅读回归本质。
            </p>

            <p>
              我们相信，优质的内容不应被淹没在信息洪流中。知讯网通过精心策划和编辑，为您带来科技、财经、体育、娱乐等多个领域的精选资讯，帮助您高效获取有价值的信息。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-6">我们的理念</h2>

            <p>
              <strong>精选内容</strong> — 我们不追求数量，只关注质量。每一篇文章都经过精心筛选。
            </p>

            <p>
              <strong>深度阅读</strong> — 我们提供有深度、有见解的内容，而不是快餐式的信息碎片。
            </p>

            <p>
              <strong>简洁设计</strong> — 我们采用极简的设计风格，让您专注于内容本身，享受纯粹的阅读体验。
            </p>

            <p>
              <strong>持续更新</strong> — 我们保持内容的时效性，为您带来最新的资讯动态。
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
