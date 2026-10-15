'use client';

import * as React from 'react';
import Image from 'next/image';
import { ImageIcon, Copy, Check, Plus, X, Crosshair, Sparkles } from 'lucide-react';
import { MediaAsset, UserRole } from '@/types';

interface MediaManagerProps {
  initialAssets: MediaAsset[];
  userRole: UserRole;
}

export function MediaManager({
  initialAssets,
  userRole,
}: MediaManagerProps) {
  const [assets, setAssets] = React.useState<MediaAsset[]>(initialAssets);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [inspectingAsset, setInspectingAsset] = React.useState<MediaAsset | null>(null);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleFocalPointClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!inspectingAsset) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100) / 100;
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100) / 100;

    const updated = {
      ...inspectingAsset,
      focalPointX: x,
      focalPointY: y,
    };
    setInspectingAsset(updated);
    setAssets(assets.map((a) => (a.id === updated.id ? updated : a)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--muted)]">
          Total stored assets: <strong className="text-[var(--foreground)]">{assets.length}</strong>
        </span>
      </div>

      {/* Grid of Media Assets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div
                onClick={() => setInspectingAsset(asset)}
                className="relative aspect-4/3 w-full bg-[var(--background-subtle)] cursor-pointer group"
              >
                <Image
                  src={asset.fileUrl}
                  alt={asset.altText || asset.filename}
                  fill
                  sizes="240px"
                  className="object-cover"
                />

                {/* Focal Point Indicator */}
                <div
                  className="absolute w-4 h-4 rounded-full border-2 border-white bg-red-500/80 shadow-md pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-75 group-hover:opacity-100"
                  style={{
                    left: `${(asset.focalPointX || 0.5) * 100}%`,
                    top: `${(asset.focalPointY || 0.5) * 100}%`,
                  }}
                  title="Asset Focal Point"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                  <Crosshair className="w-4 h-4 mr-1" />
                  <span>Adjust Focal Point</span>
                </div>
              </div>

              <div className="p-3.5 space-y-1 text-xs">
                <div className="font-semibold text-[var(--foreground)] truncate" title={asset.filename}>
                  {asset.filename}
                </div>
                <div className="text-[10px] text-[var(--muted)] truncate">
                  {asset.altText || 'No alt text provided'}
                </div>
                <div className="text-[10px] text-[var(--muted)] font-mono flex items-center justify-between pt-1">
                  <span>{Math.round(asset.fileSize / 1024)} KB</span>
                  <span>Used {asset.usageCount}x</span>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-[var(--border)] bg-[var(--background-subtle)] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => handleCopyUrl(asset.id, asset.fileUrl)}
                className="inline-flex items-center space-x-1 text-[11px] text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer"
              >
                {copiedId === asset.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setInspectingAsset(asset)}
                className="text-[11px] text-[var(--accent)] hover:underline cursor-pointer"
              >
                Inspect
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect & Focal Point Modal */}
      {inspectingAsset && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div>
                <h3 className="font-serif text-xl text-[var(--foreground)]">
                  Asset Details & Focal Point Tuning
                </h3>
                <p className="text-[11px] text-[var(--muted)]">
                  Click on the image to position the focal center for responsive mobile crops.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectingAsset(null)}
                className="p-1 text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              onClick={handleFocalPointClick}
              className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-black cursor-crosshair select-none border border-[var(--border)]"
            >
              <Image
                src={inspectingAsset.fileUrl}
                alt={inspectingAsset.altText || inspectingAsset.filename}
                fill
                sizes="600px"
                className="object-contain"
              />

              {/* Pin */}
              <div
                className="absolute w-6 h-6 rounded-full border-2 border-white bg-red-500 shadow-xl pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white"
                style={{
                  left: `${(inspectingAsset.focalPointX || 0.5) * 100}%`,
                  top: `${(inspectingAsset.focalPointY || 0.5) * 100}%`,
                }}
              >
                <Crosshair className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[var(--background-subtle)] space-y-1">
                <span className="text-[10px] uppercase text-[var(--muted)]">Focal Coordinates</span>
                <div className="font-mono font-semibold">
                  X: {Math.round((inspectingAsset.focalPointX || 0.5) * 100)}% • Y: {Math.round((inspectingAsset.focalPointY || 0.5) * 100)}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--background-subtle)] space-y-1">
                <span className="text-[10px] uppercase text-[var(--muted)]">Direct File Path</span>
                <div className="font-mono text-[11px] truncate">{inspectingAsset.fileUrl}</div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                Accessible Alt Text (for Screen Readers & SEO)
              </label>
              <input
                type="text"
                value={inspectingAsset.altText || ''}
                onChange={(e) => {
                  const updated = { ...inspectingAsset, altText: e.target.value };
                  setInspectingAsset(updated);
                  setAssets(assets.map((a) => (a.id === updated.id ? updated : a)));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setInspectingAsset(null)}
                className="px-6 py-2 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
