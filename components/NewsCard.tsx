import Link from "next/link";

interface NewsCardProps {
  id: number;
  title: string;
  summary: string;
  category: string;
  createdAt: string;
  coverImage?: string;
  viewCount?: number;
  featured?: boolean;
}

export default function NewsCard({
  id,
  title,
  summary,
  category,
  createdAt,
  coverImage,
  viewCount = 0,
  featured = false,
}: NewsCardProps) {
  const categoryColors: Record<string, string> = {
    tech: "bg-blue-50 text-blue-600",
    finance: "bg-green-50 text-green-600",
    sports: "bg-orange-50 text-orange-600",
    entertainment: "bg-purple-50 text-purple-600",
  };

  const categoryNames: Record<string, string> = {
    tech: "科技",
    finance: "财经",
    sports: "体育",
    entertainment: "娱乐",
  };

  if (featured) {
    return (
      <Link href={`/news/${id}`} className="block group">
        <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="relative h-96 overflow-hidden">
            {coverImage ? (
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
                <span className="text-8xl opacity-20">📰</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[category] || "bg-gray-100 text-gray-600"}`}>
                {categoryNames[category] || category}
              </span>
              <h2 className="text-3xl font-bold mb-3 line-clamp-2 group-hover:text-indigo-200 transition-colors">
                {title}
              </h2>
              <p className="text-gray-200 text-sm line-clamp-2 mb-3">{summary}</p>
              <div className="flex items-center gap-4 text-xs text-gray-300">
                <span>{createdAt}</span>
                <span>•</span>
                <span>{viewCount} 阅读</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/news/${id}`} className="block group">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative h-48 overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
              <span className="text-5xl opacity-30">📰</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[category] || "bg-gray-100 text-gray-600"}`}>
              {categoryNames[category] || category}
            </span>
            <span className="text-xs text-gray-400">{createdAt}</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">{summary}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{viewCount} 阅读</span>
            <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">阅读更多 →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
