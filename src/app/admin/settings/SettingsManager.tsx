'use client';

import * as React from 'react';
import { Settings, Save, ShieldAlert, Check, Sparkles } from 'lucide-react';
import { SiteSettings, UserRole } from '@/types';

interface SettingsManagerProps {
  initialSettings: SiteSettings;
  userRole: UserRole;
}

export function SettingsManager({
  initialSettings,
  userRole,
}: SettingsManagerProps) {
  const [settings, setSettings] = React.useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState('');

  const isOwner = userRole === 'OWNER';

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner) {
      alert('Only Studio Owners have permission to modify studio branding and SEO settings.');
      return;
    }

    setIsSaving(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');

      setSettings(data.settings);
      setSuccessMsg('Studio settings and SEO parameters saved successfully.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(err.message || 'Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {!isOwner && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            You are logged in as an <strong>Editor</strong>. Core studio settings and SEO tags are read-only and can only be updated by the Studio Owner.
          </span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand & Lead Artist Identity */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-4">
          <h3 className="font-serif text-xl text-[var(--foreground)] border-b border-[var(--border)] pb-3">
            Brand Identity & Artist Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                Studio Brand Name
              </label>
              <input
                type="text"
                disabled={!isOwner}
                value={settings.studioName}
                onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                Lead Artist Name
              </label>
              <input
                type="text"
                disabled={!isOwner}
                value={settings.artistName}
                onChange={(e) => setSettings({ ...settings, artistName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
              Tagline & Market Positioning
            </label>
            <input
              type="text"
              disabled={!isOwner}
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs"
            />
          </div>

          <div className="text-xs">
            <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
              Artist Manifesto & Bio
            </label>
            <textarea
              rows={4}
              disabled={!isOwner}
              value={settings.bio}
              onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs"
            />
          </div>
        </div>

        {/* Concierge & Communication Settings */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-4">
          <h3 className="font-serif text-xl text-[var(--foreground)] border-b border-[var(--border)] pb-3">
            Concierge Channels & SLA
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                Contact Email
              </label>
              <input
                type="email"
                disabled={!isOwner}
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                Studio Telephone
              </label>
              <input
                type="text"
                disabled={!isOwner}
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                disabled={!isOwner}
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                Instagram Handle
              </label>
              <input
                type="text"
                disabled={!isOwner}
                value={settings.instagramHandle}
                onChange={(e) => setSettings({ ...settings, instagramHandle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                Guaranteed Response Time (Hours)
              </label>
              <input
                type="number"
                disabled={!isOwner}
                value={settings.responseTimeHours}
                onChange={(e) => setSettings({ ...settings, responseTimeHours: parseInt(e.target.value) || 24 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Global SEO Metadata */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-4">
          <h3 className="font-serif text-xl text-[var(--foreground)] border-b border-[var(--border)] pb-3">
            Search Engine Optimization (SEO) & Social Graph
          </h3>

          <div className="text-xs">
            <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
              Global Title Tag
            </label>
            <input
              type="text"
              disabled={!isOwner}
              value={settings.seoTitle}
              onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs"
            />
          </div>

          <div className="text-xs">
            <label className="block uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
              Meta Description
            </label>
            <textarea
              rows={3}
              disabled={!isOwner}
              value={settings.seoDescription}
              onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] disabled:opacity-60 text-xs"
            />
          </div>
        </div>

        {isOwner && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black font-semibold text-xs tracking-luxury uppercase transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Updating Studio Settings...' : 'Save Studio & SEO Configuration'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
