'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Save, 
  ExternalLink, 
  AlertCircle 
} from 'lucide-react';
import { PortfolioLook, PortfolioCategory, UserRole } from '@/types';

interface PortfolioManagerProps {
  initialLooks: PortfolioLook[];
  categories: PortfolioCategory[];
  userRole: UserRole;
}

export function PortfolioManager({
  initialLooks,
  categories,
  userRole,
}: PortfolioManagerProps) {
  const [looks, setLooks] = React.useState<PortfolioLook[]>(initialLooks);
  const [filterCategory, setFilterCategory] = React.useState('ALL');
  const [editingLook, setEditingLook] = React.useState<Partial<PortfolioLook> | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [feedbackMsg, setFeedbackMsg] = React.useState('');

  const filteredLooks = looks.filter((l) => {
    if (filterCategory !== 'ALL' && l.categoryId !== filterCategory) return false;
    return true;
  });

  const handleStartCreate = () => {
    setEditingLook({
      title: '',
      slug: '',
      categoryId: categories[0]?.id || 'cat-bridal',
      clientType: 'Bridal',
      finishType: 'Glass Skin',
      skinToneDescription: 'Warm undertone radiance',
      excerpt: '',
      description: '',
      primaryImageUrl: '/assets/8cefb0245c79153f745fc34d21844435.jpg',
      galleryUrls: ['/assets/8cefb0245c79153f745fc34d21844435.jpg'],
      beforeImageUrl: '',
      afterImageUrl: '',
      status: 'PUBLISHED',
      isFeatured: true,
      productsUsed: [],
      keyTechniques: [],
    });
    setFeedbackMsg('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLook || !editingLook.title) return;

    setIsSaving(true);
    setFeedbackMsg('');

    try {
      const res = await fetch('/api/looks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingLook),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save look');

      if (editingLook.id) {
        setLooks(looks.map((l) => (l.id === data.look.id ? data.look : l)));
      } else {
        setLooks([data.look, ...looks]);
      }

      setEditingLook(null);
      setFeedbackMsg('Look saved successfully.');
      setTimeout(() => setFeedbackMsg(''), 4000);
    } catch (err: any) {
      alert(err.message || 'Error saving look');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (userRole !== 'OWNER') {
      alert('Only Studio Owners have permission to delete portfolio assets.');
      return;
    }

    if (!confirm(`Are you certain you wish to permanently delete look "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/looks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setLooks(looks.filter((l) => l.id !== id));
      setFeedbackMsg('Look deleted.');
      setTimeout(() => setFeedbackMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Error deleting look');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[var(--muted)]">Filter:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleStartCreate}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs font-semibold transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Portfolio Look</span>
        </button>
      </div>

      {feedbackMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">
          {feedbackMsg}
        </div>
      )}

      {/* Looks Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLooks.map((look) => {
          const statusBadge =
            look.status === 'PUBLISHED'
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
              : look.status === 'DRAFT'
              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
              : 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30';

          return (
            <div
              key={look.id}
              className="rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 w-full bg-[var(--background-subtle)]">
                  <Image
                    src={look.primaryImageUrl}
                    alt={look.title}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusBadge}`}>
                      {look.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[10px] tracking-widest uppercase font-semibold text-[var(--accent)]">
                    {look.categoryName} • {look.clientType}
                  </div>
                  <h3 className="font-serif text-lg text-[var(--foreground)] font-medium">
                    {look.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-2">
                    {look.excerpt || look.description}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-[var(--border)] bg-[var(--background-subtle)] flex items-center justify-between text-xs">
                <Link
                  href={`/portfolio/${look.slug}`}
                  target="_blank"
                  className="text-[var(--muted)] hover:text-[var(--foreground)] flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </Link>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingLook(look)}
                    className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)]"
                    title="Edit Look"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {userRole === 'OWNER' && (
                    <button
                      type="button"
                      onClick={() => handleDelete(look.id, look.title)}
                      className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-red-500/10 text-red-500"
                      title="Delete Look (Owner Only)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Look Editor Modal */}
      {editingLook && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <h3 className="font-serif text-2xl text-[var(--foreground)]">
                {editingLook.id ? 'Edit Portfolio Look' : 'Create New Portfolio Look'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingLook(null)}
                className="p-1.5 text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Look Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLook.title || ''}
                    onChange={(e) => setEditingLook({ ...editingLook, title: e.target.value })}
                    placeholder="e.g. Royal Velvet Mayfair Bride"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Category
                  </label>
                  <select
                    value={editingLook.categoryId || categories[0]?.id}
                    onChange={(e) => setEditingLook({ ...editingLook, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Finish Type
                  </label>
                  <select
                    value={editingLook.finishType || 'Glass Skin'}
                    onChange={(e) => setEditingLook({ ...editingLook, finishType: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                  >
                    <option value="Glass Skin">Glass Skin</option>
                    <option value="Velvet Matte">Velvet Matte</option>
                    <option value="Soft Glam">Soft Glam</option>
                    <option value="Dewy Radiant">Dewy Radiant</option>
                    <option value="High-Fashion Editorial">High-Fashion Editorial</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Client Type
                  </label>
                  <select
                    value={editingLook.clientType || 'Bridal'}
                    onChange={(e) => setEditingLook({ ...editingLook, clientType: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                  >
                    <option value="Bridal">Bridal</option>
                    <option value="Red Carpet">Red Carpet</option>
                    <option value="Editorial">Editorial</option>
                    <option value="Celebrity">Celebrity</option>
                    <option value="Private Client">Private Client</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Status
                  </label>
                  <select
                    value={editingLook.status || 'PUBLISHED'}
                    onChange={(e) => setEditingLook({ ...editingLook, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Primary Image URL
                </label>
                <input
                  type="text"
                  required
                  value={editingLook.primaryImageUrl || ''}
                  onChange={(e) => setEditingLook({ ...editingLook, primaryImageUrl: e.target.value })}
                  placeholder="/assets/8cefb0245c79153f745fc34d21844435.jpg"
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Before Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingLook.beforeImageUrl || ''}
                    onChange={(e) => setEditingLook({ ...editingLook, beforeImageUrl: e.target.value })}
                    placeholder="/assets/ff293627f3f413d12a8f47c2a4f6a519.jpg"
                    className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    After Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingLook.afterImageUrl || ''}
                    onChange={(e) => setEditingLook({ ...editingLook, afterImageUrl: e.target.value })}
                    placeholder="/assets/8cefb0245c79153f745fc34d21844435.jpg"
                    className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Skin Tone Description
                </label>
                <input
                  type="text"
                  value={editingLook.skinToneDescription || ''}
                  onChange={(e) => setEditingLook({ ...editingLook, skinToneDescription: e.target.value })}
                  placeholder="e.g. Warm Olive to Golden Undertones with luminous high-point reflection"
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Short Excerpt
                </label>
                <input
                  type="text"
                  value={editingLook.excerpt || ''}
                  onChange={(e) => setEditingLook({ ...editingLook, excerpt: e.target.value })}
                  placeholder="Brief summary for cards"
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Full Editorial Description
                </label>
                <textarea
                  rows={3}
                  value={editingLook.description || ''}
                  onChange={(e) => setEditingLook({ ...editingLook, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                />
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingLook(null)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] text-xs hover:bg-[var(--background-subtle)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black font-semibold text-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Look'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
