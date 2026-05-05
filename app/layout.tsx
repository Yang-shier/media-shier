import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "知讯网",
  description: "专注高质量资讯内容，让阅读回归本质",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
