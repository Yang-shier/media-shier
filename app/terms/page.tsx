export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-serif font-bold">使用条款</h1>
          <p className="mt-4 text-sm text-gray-500">最后更新：2026年5月5日</p>

          <div className="mt-12 space-y-6 text-gray-700 leading-relaxed">
            <p>
              欢迎使用我们的服务。使用本网站即表示您同意遵守以下条款。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-4">内容使用</h2>
            <p>
              本网站的所有内容，包括文字、图片、视频等，均受版权保护。未经许可，不得复制、转载或用于商业用途。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-4">用户行为</h2>
            <p>
              您同意不会使用本网站从事任何非法活动，不会发布虚假、诽谤、侵权或有害的内容。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-4">免责声明</h2>
            <p>
              我们努力确保内容的准确性，但不对内容的完整性、准确性或时效性做出保证。使用本网站的风险由您自行承担。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-4">条款变更</h2>
            <p>
              我们保留随时修改这些条款的权利。修改后的条款将在网站上公布，继续使用本网站即表示您接受修改后的条款。
            </p>

            <h2 className="text-2xl font-serif font-bold mt-12 mb-4">联系我们</h2>
            <p>
              如果您对这些条款有任何疑问，请通过 legal@newsportal.com 联系我们。
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
