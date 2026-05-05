"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalNews: 0,
    totalViews: 0,
    totalCategories: 4,
    todayNews: 0,
  });

  useEffect(() => {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      router.push("/admin");
      return;
    }

    // 获取统计数据
    fetch("/api/news?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const allNews = data.data || [];
        const today = new Date().toISOString().split("T")[0];
        const todayNews = allNews.filter((n: any) =>
          n.created_at && n.created_at.startsWith(today)
        );
        const totalViews = allNews.reduce((sum: number, n: any) => sum + (n.view_count || 0), 0);
        setStats({
          totalNews: data.total || allNews.length,
          totalViews,
          totalCategories: 4,
          todayNews: todayNews.length,
        });
      })
      .catch(() => {});
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
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
                <Link href="/admin/dashboard" className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">
                  仪表盘
                </Link>
                <Link href="/admin/news" className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                  新闻管理
                </Link>
                <Link href="/admin/categories" className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                  分类管理
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-indigo-600">
                查看前台
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">仪表盘</h1>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">新闻总数</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalNews}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">
                📰
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">总浏览量</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-2xl">
                👁️
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">分类数量</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCategories}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-2xl">
                📁
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">今日发布</p>
                <p className="text-3xl font-bold text-gray-900">{stats.todayNews}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-2xl">
                ✨
              </div>
            </div>
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">快捷操作</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/news/new"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
            >
              <div className="w-10 h-10 bg-indigo-100 group-hover:bg-indigo-200 rounded-lg flex items-center justify-center text-xl">
                ✏️
              </div>
              <div>
                <h3 className="font-medium text-gray-900">发布新闻</h3>
                <p className="text-xs text-gray-500">撰写并发布新文章</p>
              </div>
            </Link>

            <Link
              href="/admin/news"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center text-xl">
                📋
              </div>
              <div>
                <h3 className="font-medium text-gray-900">管理新闻</h3>
                <p className="text-xs text-gray-500">编辑或删除已发布新闻</p>
              </div>
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
            >
              <div className="w-10 h-10 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center text-xl">
                🗂️
              </div>
              <div>
                <h3 className="font-medium text-gray-900">分类管理</h3>
                <p className="text-xs text-gray-500">管理新闻分类</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
