import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "新闻门户",
  description: "最新资讯，尽在掌握",
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
