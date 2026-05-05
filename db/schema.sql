-- 新闻门户数据库初始化脚本
-- 在Cloudflare D1控制台执行此SQL

-- 新闻表
CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'tech',
  author TEXT DEFAULT '管理员',
  view_count INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 分类表
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- 插入默认分类
INSERT INTO categories (name, slug, sort_order) VALUES ('科技', 'tech', 1);
INSERT INTO categories (name, slug, sort_order) VALUES ('财经', 'finance', 2);
INSERT INTO categories (name, slug, sort_order) VALUES ('体育', 'sports', 3);
INSERT INTO categories (name, slug, sort_order) VALUES ('娱乐', 'entertainment', 4);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_is_published ON news(is_published);
