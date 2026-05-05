# Cloudflare 部署指南

## 前置准备

确保你已经：
- ✅ 注册了 Cloudflare 账号
- ✅ 注册了 GitHub 账号
- ✅ 安装了 Node.js 和 Git

## 详细部署步骤

### 第一步：推送代码到 GitHub

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 仓库名称：`news-portal`（或其他名称）
   - 选择 Public 或 Private
   - **不要**勾选 "Add a README file"
   - 点击 **Create repository**

2. **推送本地代码**
   
   在项目目录打开终端，执行：
   
   ```bash
   git init
   git add .
   git commit -m "Initial commit: News Portal"
   git branch -M main
   git remote add origin https://github.com/你的用户名/news-portal.git
   git push -u origin main
   ```

### 第二步：创建 Cloudflare Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)

2. 左侧菜单选择 **Workers & Pages**

3. 点击 **Create application** → **Pages** → **Connect to Git**

4. 授权 GitHub（首次需要）

5. 选择刚才创建的仓库 `news-portal`

6. 配置构建设置：
   ```
   Project name: news-portal
   Production branch: main
   Framework preset: Next.js
   Build command: npx @cloudflare/next-on-pages
   Build output directory: .vercel/output/static
   ```

7. 点击 **Save and Deploy**

8. 等待首次部署完成（约 2-3 分钟）

### 第三步：创建 D1 数据库

1. 在 Cloudflare Dashboard，点击左侧 **Workers & Pages**

2. 切换到 **D1** 标签

3. 点击 **Create database**

4. 填写信息：
   ```
   Database name: news-portal-db
   ```

5. 点击 **Create**

6. **记下 Database ID**（后面会用到）

### 第四步：初始化数据库

1. 进入刚创建的 `news-portal-db` 数据库

2. 点击 **Console** 标签

3. 打开项目中的 `db/schema.sql` 文件，复制全部内容

4. 粘贴到 Console 中，点击 **Execute**

5. 看到 "Success" 提示即表示成功

6. （可选）执行 `db/seed.sql` 添加示例数据

### 第五步：绑定数据库到 Pages

1. 回到 **Workers & Pages**，点击你的 `news-portal` 项目

2. 进入 **Settings** 标签

3. 左侧选择 **Functions**

4. 找到 **D1 database bindings** 部分

5. 点击 **Add binding**

6. 填写：
   ```
   Variable name: DB
   D1 database: news-portal-db
   ```

7. 点击 **Save**

### 第六步：触发重新部署

1. 进入 **Deployments** 标签

2. 找到最新的部署记录

3. 点击右侧的 **...** → **Retry deployment**

4. 等待部署完成

5. 点击部署记录查看你的网站地址（如 `news-portal.pages.dev`）

## 🎉 完成！

现在你可以：
- 访问 `https://你的项目.pages.dev` 查看前台
- 访问 `https://你的项目.pages.dev/admin` 进入后台管理

## 后续修改和更新

每次修改代码后：

```bash
git add .
git commit -m "描述你的修改"
git push
```

Cloudflare 会自动检测并重新部署（约 1-2 分钟）。

## 常见问题

### Q: 部署失败怎么办？

A: 检查以下几点：
1. 确保 `package.json` 中的依赖都已安装
2. 查看部署日志中的错误信息
3. 确认构建命令和输出目录配置正确

### Q: 数据库连接失败？

A: 确保：
1. D1 数据库已创建并初始化
2. 数据库绑定的 Variable name 是 `DB`
3. 绑定后重新部署了项目

### Q: 如何自定义域名？

A: 
1. 在 Pages 项目的 **Custom domains** 中添加你的域名
2. 按照提示配置 DNS 记录
3. 等待 SSL 证书自动签发

### Q: 如何查看数据库内容？

A: 在 D1 数据库的 Console 中执行：
```sql
SELECT * FROM news;
SELECT * FROM categories;
```

## 需要帮助？

如果遇到问题，可以：
1. 查看 Cloudflare 部署日志
2. 检查浏览器控制台错误
3. 在 GitHub 仓库提交 Issue
