import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">新闻</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              专注于提供高质量的新闻资讯，<br />
              让阅读回归本质。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">分类</h4>
            <div className="space-y-2">
              <Link href="/category/tech" className="block text-sm text-gray-500 hover:text-black transition-colors">科技</Link>
              <Link href="/category/finance" className="block text-sm text-gray-500 hover:text-black transition-colors">财经</Link>
              <Link href="/category/sports" className="block text-sm text-gray-500 hover:text-black transition-colors">体育</Link>
              <Link href="/category/entertainment" className="block text-sm text-gray-500 hover:text-black transition-colors">娱乐</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">关于</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-500 hover:text-black transition-colors">关于我们</Link>
              <Link href="/contact" className="block text-sm text-gray-500 hover:text-black transition-colors">联系方式</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} 新闻门户
        </div>
      </div>
    </footer>
  );
}
