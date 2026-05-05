"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewsListPage() {
  const router = useRouter();
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      router.push("/admin");
      return;
    }

    // 获取新闻列表
    fetch("/api/news?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setNewsList(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  const handleDelete = async (id: number) => {
    if (confirm("确定要删除这篇新闻吗？")) {
      try {
        const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
        if (res.ok) {
          setNewsList(newsList.filter((news) => news.id !== id));
          alert("删除成功");
        } else {
          alert("删除失败");
        }
      } catch {
        alert("删除失败");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  N
                </div>
                <span className="font-bold text-gray-900">管理后台</span>
              </Link>
              <div className="hidden md:flex items-center gap-1">
                <Link href="/admin/dashboard" className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                  仪表盘
                </Link>
                <Link href="/admin/news" className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">
                  新闻管理
                </Link>
                <Link href="/admin/categories" className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                  分类管理
                </Link>
              </div>
            </div>
            <Link href="/" className="text-sm text-gray-600 hover:text-indigo-600">
              查看前台
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">新闻管理</h1>
          <Link
            href="/admin/news/new"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            + 发布新闻
          </Link>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <p className="text-gray-500">加载中...</p>
          </div>
        ) : newsList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">还没有发布任何新闻</h2>
            <p className="text-gray-500 mb-6">点击下方按钮发布第一篇新闻</p>
            <Link
              href="/admin/news/new"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              发布新闻
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">浏览量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">发布时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody>
                {newsList.map((news) => (
                  <tr key={news.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{news.title}</td>
                    <td className="px-6 py-4 text-gray-600">{news.category}</td>
                    <td className="px-6 py-4 text-gray-600">{news.view_count || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(news.created_at).toLocaleDateString("zh-CN")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/news/${news.id}/edit`} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                          编辑
                        </Link>
                        <button
                          onClick={() => handleDelete(news.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
