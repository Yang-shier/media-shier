"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories] = useState([
    { id: 1, name: "科技", slug: "tech", count: 0 },
    { id: 2, name: "财经", slug: "finance", count: 0 },
    { id: 3, name: "体育", slug: "sports", count: 0 },
    { id: 4, name: "娱乐", slug: "entertainment", count: 0 },
  ]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, [router]);

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
                <Link href="/admin/news" className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                  新闻管理
                </Link>
                <Link href="/admin/categories" className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">分类管理</h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标识</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">文章数</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">{category.slug}</code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{category.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          分类通过数据库管理，如需添加新分类请在D1控制台执行SQL。
        </p>
      </main>
    </div>
  );
}
