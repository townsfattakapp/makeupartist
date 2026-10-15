'use client';

import * as React from 'react';
import Image from 'next/image';
import { Play, ArrowUpRight, Volume2, VolumeX, X, Heart } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { InstagramPost } from '@/types';

interface InstagramSectionProps {
  posts: InstagramPost[];
  handle?: string;
}

export function InstagramSection({
  posts,
  handle = 'aurelialuxemakeup',
}: InstagramSectionProps) {
  const [activeMedia, setActiveMedia] = React.useState<InstagramPost | null>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  return (
    <section id="instagram" className="py-24 border-t border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs tracking-ultra-wide uppercase text-[var(--accent)] font-medium">
              <InstagramIcon className="w-4 h-4 text-pink-500" />
              <span>Studio & Backstage Journal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-2" title="Live Studio Curation Active" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)]">
              Curated from Instagram
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-xl">
              An intimate window into our London studio trials, backstage bridal preparations, and masterclass demonstrations.
            </p>
          </div>

          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] text-xs tracking-luxury uppercase font-medium transition-all shadow-xs hover:shadow-md cursor-pointer group"
          >
            <span>Follow @{handle}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveMedia(post)}
              className="group relative aspect-4/5 rounded-xl overflow-hidden cursor-pointer bg-[var(--background-subtle)] border border-[var(--border)] shadow-xs hover:shadow-lg transition-all duration-300"
            >
              {post.mediaType === 'VIDEO' ? (
                <div className="relative w-full h-full">
                  <video
                    src={post.mediaUrl}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                    <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={post.mediaUrl}
                    alt={post.caption}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white text-xs">
                {post.likesCount && (
                  <div className="flex items-center space-x-1 text-[11px] text-[var(--accent)] font-mono mb-1">
                    <Heart className="w-3 h-3 fill-[var(--accent)]" />
                    <span>{post.likesCount.toLocaleString()}</span>
                  </div>
                )}
                <p className="line-clamp-2 text-[11px] leading-tight text-white/90">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video / Post Modal Player */}
        {activeMedia && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
          >
            <div className="relative w-full max-w-4xl bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveMedia(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Display */}
              <div className="relative w-full md:w-3/5 bg-black flex items-center justify-center aspect-9/16 sm:aspect-1/1 md:aspect-auto">
                {activeMedia.mediaType === 'VIDEO' ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video
                      src={activeMedia.mediaUrl}
                      autoPlay
                      loop
                      playsInline
                      muted={isMuted}
                      controls
                      className="max-h-[85vh] w-auto max-w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="absolute bottom-4 left-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[var(--accent)]" />}
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-[50vh] md:h-full">
                    <Image
                      src={activeMedia.mediaUrl}
                      alt={activeMedia.caption}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Caption & Instagram Action */}
              <div className="w-full md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-4 border-b border-[var(--border)]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[2px]">
                      <div className="w-full h-full rounded-full bg-[var(--background)] flex items-center justify-center font-serif font-bold text-xs">
                        AL
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-xs tracking-wide">@{handle}</div>
                      <div className="text-[10px] text-[var(--muted)]">Verified Studio Curation</div>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">
                    {activeMedia.caption}
                  </p>

                  {activeMedia.likesCount && (
                    <div className="text-xs text-[var(--muted)] font-mono">
                      {activeMedia.likesCount.toLocaleString()} appreciative client saves & likes
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-[var(--border)] mt-6 space-y-3">
                  <a
                    href={activeMedia.permalink || `https://instagram.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-colors"
                  >
                    <span>View Post On Instagram</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <p className="text-[10px] text-center text-[var(--muted)]">
                    Consent obtained for all editorial client features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
