export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-serif font-bold">联系我们</h1>

          <div className="mt-12 space-y-8">
            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                邮箱
              </h2>
              <p className="text-lg">contact@newsportal.com</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                商务合作
              </h2>
              <p className="text-lg">business@newsportal.com</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                投稿
              </h2>
              <p className="text-lg">submit@newsportal.com</p>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-gray-600 leading-relaxed">
                我们通常会在 24 小时内回复您的邮件。如果您有紧急事项，请在邮件标题中注明"紧急"。
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
