export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-serif font-bold">隐私政策</h1>
          <p className="mt-4 text-sm text-gray-500">最后更新：2026年5月5日</p>

          <div className="mt-12 space-y-6 text-gray-700 leading-relaxed">
            <p>
              我们重视您的隐私。本隐私政策说明了我们如何收集、使用和保护您的个人信息。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-4">信息收集</h2>
            <p>
              我们可能收集您主动提供的信息，如订阅邮箱、评论内容等。我们也会自动收集一些技术信息，如 IP 地址、浏览器类型等，用于改善服务。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-4">信息使用</h2>
            <p>
              我们使用收集的信息来提供和改善服务、发送新闻推送、回复您的询问等。我们不会将您的个人信息出售给第三方。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-4">信息保护</h2>
            <p>
              我们采取合理的安全措施来保护您的个人信息。但请注意，没有任何互联网传输方式是完全安全的。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-4">Cookie</h2>
            <p>
              我们使用 Cookie 来改善用户体验。您可以通过浏览器设置来管理 Cookie。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-4">联系我们</h2>
            <p>
              如果您对本隐私政策有任何疑问，请通过 privacy@newsportal.com 联系我们。
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
