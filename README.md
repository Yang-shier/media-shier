# 新闻门户网站

基于 Next.js + Cloudflare Pages + D1 数据库构建的现代化新闻门户系统。

## ✨ 功能特性

- 📰 新闻发布与管理
- 🏷️ 分类管理（科技、财经、体育、娱乐）
- 🎨 响应式设计，支持移动端
- ⚡ 边缘计算，全球加速
- 🔒 简洁的后台管理系统
- 💾 Cloudflare D1 数据库

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

```bash
npm run dev
```

访问 http://localhost:3000 查看前台
访问 http://localhost:3000/admin 进入后台管理

## 📦 部署到 Cloudflare

### 步骤 1：创建 GitHub 仓库

1. 在 GitHub 创建新仓库
2. 推送代码到 GitHub：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 步骤 2：连接 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 选择你的 GitHub 仓库
4. 构建配置：
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
5. 点击 **Save and Deploy**

### 步骤 3：创建 D1 数据库

1. 在 Cloudflare Dashboard，进入 **Workers & Pages** → **D1**
2. 点击 **Create database**
3. 数据库名称：`news-portal-db`
4. 点击 **Create**

### 步骤 4：初始化数据库

1. 进入刚创建的 D1 数据库
2. 点击 **Console** 标签
3. 复制 `db/schema.sql` 的内容并执行
4. （可选）复制 `db/seed.sql` 的内容并执行，添加示例数据

### 步骤 5：绑定数据库到 Pages

1. 回到 **Workers & Pages**，选择你的 Pages 项目
2. 进入 **Settings** → **Functions** → **D1 database bindings**
3. 点击 **Add binding**
   - **Variable name**: `DB`
   - **D1 database**: 选择 `news-portal-db`
4. 点击 **Save**

### 步骤 6：重新部署

1. 进入 **Deployments** 标签
2. 点击最新部署右侧的 **...** → **Retry deployment**
3. 等待部署完成

## 🎯 使用说明

### 前台功能

- **首页**：展示最新新闻列表
- **分类页**：按分类浏览新闻
- **新闻详情**：查看完整新闻内容

### 后台管理

访问 `/admin` 进入管理后台：

- **新闻管理**：发布、编辑、删除新闻
- **分类管理**：查看和管理新闻分类

## 📝 修改和更新

### 本地修改

1. 修改代码
2. 本地测试：`npm run dev`
3. 提交并推送到 GitHub：

```bash
git add .
git commit -m "描述你的修改"
git push
```

4. Cloudflare 会自动检测并重新部署

### 常见修改

**修改网站标题**：编辑 `app/layout.tsx`

**修改导航栏**：编辑 `components/Header.tsx`

**添加新分类**：在 D1 控制台执行：
```sql
INSERT INTO categories (name, slug, sort_order) VALUES ('新分类', 'new-category', 5);
```

**修改样式**：编辑对应组件的 Tailwind CSS 类名

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **部署**: Cloudflare Pages
- **数据库**: Cloudflare D1 (SQLite)
- **边缘运行时**: Cloudflare Workers

## 📂 项目结构

```
news-portal/
├── app/                    # Next.js 应用目录
│   ├── (frontend)/        # 前台页面
│   ├── admin/             # 后台管理
│   ├── api/               # API 路由
│   └── layout.tsx         # 根布局
├── components/            # 共享组件
├── db/                    # 数据库脚本
│   ├── schema.sql        # 数据库结构
│   └── seed.sql          # 示例数据
├── public/               # 静态资源
└── package.json          # 项目配置
```

## 🔧 环境要求

- Node.js 18+
- npm 或 yarn
- Git
- Cloudflare 账号
- GitHub 账号

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

如有问题，请在 GitHub 仓库提交 Issue。
