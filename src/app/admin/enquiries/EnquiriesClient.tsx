'use client';

import * as React from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Mail, 
  Phone, 
  MessageCircle, 
  Check, 
  X, 
  Save, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { Enquiry, EnquiryStatus } from '@/types';

interface EnquiriesClientProps {
  initialEnquiries: Enquiry[];
  initialSelectedId?: string;
}

const STATUSES: { value: EnquiryStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All Enquiries' },
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'QUOTED', label: 'Quoted' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CLOSED', label: 'Closed' },
];

export function EnquiriesClient({
  initialEnquiries,
  initialSelectedId,
}: EnquiriesClientProps) {
  const [enquiries, setEnquiries] = React.useState<Enquiry[]>(initialEnquiries);
  const [selectedStatus, setSelectedStatus] = React.useState<EnquiryStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedEnquiry, setSelectedEnquiry] = React.useState<Enquiry | null>(
    initialEnquiries.find((e) => e.id === initialSelectedId) || initialEnquiries[0] || null
  );

  const [savingStatus, setSavingStatus] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [editedNotes, setEditedNotes] = React.useState(selectedEnquiry?.internalNotes || '');
  const [editedStatus, setEditedStatus] = React.useState<EnquiryStatus>(selectedEnquiry?.status || 'NEW');

  React.useEffect(() => {
    if (selectedEnquiry) {
      setEditedNotes(selectedEnquiry.internalNotes || '');
      setEditedStatus(selectedEnquiry.status);
      setSaveSuccess(false);
    }
  }, [selectedEnquiry]);

  const filteredEnquiries = enquiries.filter((e) => {
    if (selectedStatus !== 'ALL' && e.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        e.fullName.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.referenceNumber.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.eventType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleUpdate = async () => {
    if (!selectedEnquiry) return;
    setSavingStatus(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editedStatus,
          internalNotes: editedNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');

      // Update state
      const updatedList = enquiries.map((e) => (e.id === selectedEnquiry.id ? data.enquiry : e));
      setEnquiries(updatedList);
      setSelectedEnquiry(data.enquiry);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating enquiry');
    } finally {
      setSavingStatus(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Status Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="Search by client, reference, location, or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {STATUSES.map((st) => (
            <button
              key={st.value}
              type="button"
              onClick={() => setSelectedStatus(st.value)}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer shrink-0 ${
                selectedStatus === st.value
                  ? 'bg-[var(--foreground)] text-[var(--background)] shadow-xs'
                  : 'bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
              }`}
            >
              {st.label}
              {st.value === 'NEW' && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-bold">
                  {enquiries.filter((e) => e.status === 'NEW').length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main CRM Workspace (List + Detail Drawer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Enquiries Table / List */}
        <div className="lg:col-span-7 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[var(--border)] bg-[var(--background-subtle)] flex items-center justify-between text-xs text-[var(--muted)]">
            <span>
              Showing <strong className="text-[var(--foreground)]">{filteredEnquiries.length}</strong> enquiries
            </span>
            <span>Click any enquiry to review details and notes</span>
          </div>

          <div className="divide-y divide-[var(--border)] max-h-[750px] overflow-y-auto">
            {filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((enq) => {
                const isSelected = selectedEnquiry?.id === enq.id;
                const statusColor =
                  enq.status === 'NEW' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' :
                  enq.status === 'CONFIRMED' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
                  enq.status === 'QUOTED' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' :
                  'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30';

                return (
                  <div
                    key={enq.id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className={`p-4 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[var(--accent-light)] border-l-4 border-l-[var(--accent)]'
                        : 'hover:bg-[var(--background-subtle)]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-xs text-[var(--foreground)]">{enq.fullName}</span>
                        <span className="font-mono text-[10px] text-[var(--muted)]">{enq.referenceNumber}</span>
                      </div>
                      <div className="text-[11px] text-[var(--muted)] flex items-center space-x-2">
                        <span>{enq.eventType}</span>
                        <span>•</span>
                        <span className="font-mono">{enq.eventDate}</span>
                        <span>•</span>
                        <span>{enq.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusColor}`}>
                        {enq.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center text-xs text-[var(--muted)]">
                No matching enquiries found.
              </div>
            )}
          </div>
        </div>

        {/* Right: Selected Enquiry Detail View */}
        <div className="lg:col-span-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md p-6 space-y-6 sticky top-24">
          {selectedEnquiry ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-[var(--border)] pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-[var(--accent)]">
                      {selectedEnquiry.referenceNumber}
                    </span>
                    <span className="text-[10px] text-[var(--muted)]">
                      Logged {new Date(selectedEnquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-[var(--foreground)] mt-1">
                    {selectedEnquiry.fullName}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={`mailto:${selectedEnquiry.email}?subject=Kumkum%20Patel%20Availability%20%5B${selectedEnquiry.referenceNumber}%5D`}
                    className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--background-subtle)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-[var(--border)] hover:bg-emerald-500/10 text-emerald-600 transition-colors"
                    title="Message WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Commission Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[var(--background-subtle)]">
                  <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] block">Event Date</span>
                  <span className="font-semibold text-[var(--foreground)] flex items-center space-x-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{selectedEnquiry.eventDate}</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[var(--background-subtle)]">
                  <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] block">Ready-By Time</span>
                  <span className="font-semibold text-[var(--foreground)] flex items-center space-x-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{selectedEnquiry.readyByTime}</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[var(--background-subtle)]">
                  <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] block">Party Size</span>
                  <span className="font-semibold text-[var(--foreground)] flex items-center space-x-1 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{selectedEnquiry.guestsCount} Guest(s)</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[var(--background-subtle)]">
                  <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] block">Est. Budget</span>
                  <span className="font-semibold text-[var(--foreground)] font-mono mt-0.5 block">
                    {selectedEnquiry.budgetRange}
                  </span>
                </div>
              </div>

              {/* Venue Location & Service */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start space-x-2 text-[var(--muted)]">
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>Venue: <strong className="text-[var(--foreground)]">{selectedEnquiry.location}</strong></span>
                </div>
                {selectedEnquiry.serviceTitle && (
                  <div className="flex items-start space-x-2 text-[var(--muted)]">
                    <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>Requested Service: <strong className="text-[var(--foreground)]">{selectedEnquiry.serviceTitle}</strong></span>
                  </div>
                )}
              </div>

              {/* Aesthetic Vision Notes */}
              {selectedEnquiry.aestheticNotes && (
                <div className="p-4 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--muted)] block">
                    Client Aesthetic Vision & Notes
                  </span>
                  <p className="text-xs text-[var(--foreground)] leading-relaxed whitespace-pre-line">
                    {selectedEnquiry.aestheticNotes}
                  </p>
                </div>
              )}

              {/* Status Update & Internal Notes Manager */}
              <div className="pt-4 border-t border-[var(--border)] space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1.5">
                    Commission Pipeline Status
                  </label>
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value as EnquiryStatus)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <option value="NEW">NEW — Awaiting Initial Response</option>
                    <option value="CONTACTED">CONTACTED — Date Discussion in Progress</option>
                    <option value="QUOTED">QUOTED — Formal Itinerary & Quote Sent</option>
                    <option value="CONFIRMED">CONFIRMED — Deposit Retainer Received</option>
                    <option value="COMPLETED">COMPLETED — Wedding Artistry Executed</option>
                    <option value="CLOSED">CLOSED — Date Unavailable / Declined</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1.5">
                    Internal Studio Notes & Log
                  </label>
                  <textarea
                    rows={4}
                    value={editedNotes}
                    onChange={(e) => setEditedNotes(e.target.value)}
                    placeholder="e.g. Quoted ₹75,000 package. Call with wedding planner scheduled for Thursday..."
                    className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={savingStatus}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savingStatus ? 'Saving...' : 'Save Status & Notes'}</span>
                  </button>

                  {saveSuccess && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 animate-fadeIn">
                      <Check className="w-4 h-4" />
                      <span>Updated successfully</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[var(--muted)]">
              Select an enquiry to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
