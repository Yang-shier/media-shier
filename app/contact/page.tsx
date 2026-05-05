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
                微信公众号
              </h2>
              <p className="text-lg font-medium">zoedexiaowu</p>
              <p className="text-sm text-gray-500 mt-2">
                关注我们的微信公众号，获取最新资讯推送
              </p>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-gray-600 leading-relaxed">
                欢迎通过微信公众号与我们互动交流。如有商务合作、内容建议或其他问题，请在公众号留言，我们会尽快回复。
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
