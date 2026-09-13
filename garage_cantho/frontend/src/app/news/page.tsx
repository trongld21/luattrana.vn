'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Newspaper, Calendar, ChevronRight } from 'lucide-react';
import { apiService } from '@/services/api';
import { PostItem } from '@/types';

export default function NewsPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await apiService.getPosts();
      setPosts(data);
    }
    loadPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/20">
          TIN TỨC & KINH NGHIỆM
        </span>
        <h1 className="text-4xl font-extrabold text-white">Bài Viết & Mẹo Bảo Dưỡng Ô Tô</h1>
        <p className="text-slate-400 text-sm">
          Cập nhật các kiến thức chăm sóc xe mùa mưa, mẹo giữ động cơ bền bỉ và thông tin khuyến mãi mới nhất tại Garage Tây Nam Bộ.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group">
            <div className="relative h-48 w-full">
              <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  <span>{new Date(post.published_at).toLocaleDateString('vi-VN')}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-red-400 transition leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{post.summary}</p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center space-x-1">
                  <span>Đọc tiếp bài viết</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
