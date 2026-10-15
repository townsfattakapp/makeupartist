'use client';

import * as React from 'react';
import Image from 'next/image';
import { Briefcase, Plus, Edit2, Check, X, Save, Clock, MapPin } from 'lucide-react';
import { ServicePackage, UserRole } from '@/types';

interface ServicesManagerProps {
  initialServices: ServicePackage[];
  userRole: UserRole;
}

export function ServicesManager({
  initialServices,
  userRole,
}: ServicesManagerProps) {
  const [services, setServices] = React.useState<ServicePackage[]>(initialServices);
  const [editingService, setEditingService] = React.useState<Partial<ServicePackage> | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');

  const handleStartCreate = () => {
    setEditingService({
      title: '',
      slug: '',
      category: 'Bridal',
      shortDescription: '',
      fullDescription: '',
      priceIndicative: '₹25,000',
      priceType: 'STARTING_AT',
      durationMinutes: 90,
      inclusions: ['Luxury skin preparation', 'Individual lash architecture', 'Touch-up formulation kit'],
      preparationGuide: 'Hydrate 14 days prior. Arrive with clean, bare skin.',
      travelPolicy: 'Complimentary within London Zones 1–3.',
      imageUrl: '/assets/8cefb0245c79153f745fc34d21844435.jpg',
      isFeatured: false,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;

    setIsSaving(true);
    setFeedback('');

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      if (editingService.id) {
        setServices(services.map((s) => (s.id === data.service.id ? data.service : s)));
      } else {
        setServices([...services, data.service]);
      }

      setEditingService(null);
      setFeedback('Service package saved successfully.');
      setTimeout(() => setFeedback(''), 4000);
    } catch (err: any) {
      alert(err.message || 'Error saving service');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--muted)]">
          Managing <strong className="text-[var(--foreground)]">{services.length}</strong> active service packages
        </span>

        <button
          type="button"
          onClick={handleStartCreate}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs font-semibold transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service Package</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">
          {feedback}
        </div>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[var(--accent)]">
                  {svc.category}
                </span>
                <span className="font-mono text-xs font-bold text-[var(--foreground)]">
                  {svc.priceIndicative}
                </span>
              </div>

              <h3 className="font-serif text-xl text-[var(--foreground)] font-medium">
                {svc.title}
              </h3>

              <p className="text-xs text-[var(--muted)] line-clamp-2">
                {svc.shortDescription}
              </p>

              <div className="text-[11px] text-[var(--muted)] flex items-center space-x-3 pt-2">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>~{svc.durationMinutes} mins</span>
                </span>
                <span>•</span>
                <span>{svc.inclusions.length} Inclusions</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-[10px] text-[var(--muted)]">
                Slug: /{svc.slug}
              </span>

              <button
                type="button"
                onClick={() => setEditingService(svc)}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--background-subtle)] text-xs text-[var(--foreground)]"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Package</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Editor Modal */}
      {editingService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <h3 className="font-serif text-2xl text-[var(--foreground)]">
                {editingService.id ? 'Edit Service Package' : 'Create Service Package'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-1.5 text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ''}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Category
                  </label>
                  <select
                    value={editingService.category || 'Bridal'}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                  >
                    <option value="Bridal">Bridal</option>
                    <option value="Occasion">Occasion</option>
                    <option value="Editorial">Editorial</option>
                    <option value="Masterclass">Masterclass</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Indicative Price (Display string)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.priceIndicative || ''}
                    onChange={(e) => setEditingService({ ...editingService, priceIndicative: e.target.value })}
                    placeholder="e.g. ₹45,000 or Enquire"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={editingService.durationMinutes || 90}
                    onChange={(e) => setEditingService({ ...editingService, durationMinutes: parseInt(e.target.value) || 90 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={editingService.shortDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Full Experience Description
                </label>
                <textarea
                  rows={3}
                  value={editingService.fullDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Preparation Guide (Skincare advice)
                </label>
                <textarea
                  rows={2}
                  value={editingService.preparationGuide || ''}
                  onChange={(e) => setEditingService({ ...editingService, preparationGuide: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Travel Policy
                </label>
                <input
                  type="text"
                  value={editingService.travelPolicy || ''}
                  onChange={(e) => setEditingService({ ...editingService, travelPolicy: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs"
                />
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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
                  <span>{isSaving ? 'Saving...' : 'Save Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
