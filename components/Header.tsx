"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
            知讯网
          </Link>

          {/* 导航 */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/category/tech" className="text-sm text-gray-600 hover:text-black transition-colors">
              科技
            </Link>
            <Link href="/category/finance" className="text-sm text-gray-600 hover:text-black transition-colors">
              财经
            </Link>
            <Link href="/category/sports" className="text-sm text-gray-600 hover:text-black transition-colors">
              体育
            </Link>
            <Link href="/category/entertainment" className="text-sm text-gray-600 hover:text-black transition-colors">
              娱乐
            </Link>
          </nav>

          {/* 搜索 */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-gray-600 hover:text-black transition-colors"
            aria-label="搜索"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 搜索栏 */}
      {searchOpen && (
        <div className="border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索文章..."
                className="flex-1 text-base outline-none placeholder:text-gray-400"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-sm text-gray-500 hover:text-black"
              >
                取消
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
