'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Send, 
  Copy, 
  CheckCircle2 
} from 'lucide-react';
import { ServicePackage } from '@/types';

interface EnquiryFormProps {
  services: ServicePackage[];
  initialServiceId?: string;
  initialLookName?: string;
  responseTimeHours?: number;
}

export function EnquiryForm({
  services,
  initialServiceId,
  initialLookName,
  responseTimeHours = 24,
}: EnquiryFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lookFromParam = searchParams.get('look') || initialLookName || '';
  const serviceFromParam = searchParams.get('service') || initialServiceId || (services[0]?.id || '');

  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionSuccess, setSubmissionSuccess] = React.useState<any>(null);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [copiedRef, setCopiedRef] = React.useState(false);

  // Form State
  const [formData, setFormData] = React.useState({
    eventType: 'Haute Bridal',
    eventDate: '',
    readyByTime: '12:00 PM',
    location: '',
    serviceId: serviceFromParam,
    guestsCount: 1,
    fullName: '',
    email: '',
    phone: '',
    aestheticNotes: lookFromParam ? `Interested in look: ${lookFromParam}` : '',
    budgetRange: '₹25,000 - ₹50,000',
    referenceImageUrl: '',
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg('');
  };

  // Validation
  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!formData.eventDate) {
        setErrorMsg('Please select your envisioned event date.');
        return false;
      }
      const selected = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setErrorMsg('Event date cannot be in the past.');
        return false;
      }
      return true;
    }

    if (currentStep === 2) {
      if (!formData.location.trim()) {
        setErrorMsg('Please provide your venue or location address.');
        return false;
      }
      return true;
    }

    if (currentStep === 3) {
      if (formData.guestsCount < 1) {
        setErrorMsg('Please specify at least 1 person.');
        return false;
      }
      return true;
    }

    if (currentStep === 4) {
      if (!formData.fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return false;
      }
      if (!formData.phone.trim()) {
        setErrorMsg('Please enter a contact phone number.');
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSubmissionSuccess(data.enquiry);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (submissionSuccess?.referenceNumber) {
      navigator.clipboard.writeText(submissionSuccess.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 3000);
    }
  };

  // SUCCESS SCREEN
  if (submissionSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
            Enquiry Received
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)]">
            Thank You, {submissionSuccess.fullName}
          </h2>
          <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
            Your availability enquiry has been logged directly with Kumkum Patel’s studio. We guarantee a tailored response within{' '}
            <strong className="text-[var(--foreground)]">{responseTimeHours} business hours</strong>.
          </p>
        </div>

        {/* Reference Box */}
        <div className="p-4 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)] flex items-center justify-between max-w-md mx-auto text-left">
          <div>
            <span className="text-[10px] tracking-widest uppercase text-[var(--muted)] block">
              Reference Number
            </span>
            <span className="font-mono text-base font-bold text-[var(--foreground)]">
              {submissionSuccess.referenceNumber}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyRef}
            aria-label="Copy reference number"
            className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--card)] text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors flex items-center space-x-1 cursor-pointer"
          >
            {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedRef ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Next Steps Card */}
        <div className="text-left text-xs text-[var(--muted)] bg-[var(--background)] p-4 rounded-xl border border-[var(--border)] space-y-2 max-w-md mx-auto">
          <h4 className="font-semibold text-[var(--foreground)] tracking-wide uppercase text-[11px]">
            What Happens Next:
          </h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Our studio coordinator checks calendar availability for {formData.eventDate}.</li>
            <li>We draft a tailored itinerary including travel and kit specifications.</li>
            <li>You receive an email quote with an option to schedule a complimentary telephone consultation.</li>
          </ol>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-6 py-2.5 rounded-full border border-[var(--border)] text-xs tracking-luxury uppercase font-medium hover:border-[var(--foreground)] transition-colors"
          >
            Return to Studio Home
          </button>
          <button
            type="button"
            onClick={() => router.push('/portfolio')}
            className="px-6 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-colors"
          >
            Explore Portfolio
          </button>
        </div>
      </div>
    );
  }

  const selectedService = services.find((s) => s.id === formData.serviceId);

  return (
    <div className="max-w-2xl mx-auto rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl overflow-hidden">
      {/* Progress Header */}
      <div className="p-6 bg-[var(--background-subtle)] border-b border-[var(--border)]">
        <div className="flex items-center justify-between text-xs tracking-luxury uppercase font-medium text-[var(--muted)] mb-3">
          <span>
            Step {step} of 5:{' '}
            <strong className="text-[var(--foreground)]">
              {step === 1 && 'Event Date & Type'}
              {step === 2 && 'Location & Timing'}
              {step === 3 && 'Service & Guest Count'}
              {step === 4 && 'Contact & Aesthetic Vision'}
              {step === 5 && 'Review & Submit'}
            </strong>
          </span>
          <span className="font-mono text-[11px]">{step * 20}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-500 ease-out"
            style={{ width: `${step * 20}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {/* Error Notice */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: EVENT TYPE & DATE */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-3">
                Event Commission Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Haute Bridal',
                  'Red Carpet / Black Tie',
                  'Destination Wedding',
                  'Editorial / Campaign',
                  'Private Consultation',
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField('eventType', type)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                      formData.eventType === type
                        ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--foreground)] ring-1 ring-[var(--accent)]'
                        : 'border-[var(--border)] hover:border-[var(--muted)] text-[var(--muted)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{type}</span>
                      {formData.eventType === type && (
                        <Check className="w-4 h-4 text-[var(--accent)]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-2">
                Envisioned Event Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.eventDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => updateField('eventDate', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />
              </div>
              <p className="text-[11px] text-[var(--muted)] mt-1.5">
                Dates are strictly reserved on a first-confirmed basis to ensure undivided artistic dedication.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION & READY TIME */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-2">
                Venue or Preparation Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--muted)]" />
                <input
                  type="text"
                  placeholder="e.g. The Dorchester, London or Villa Balbiano, Lake Como"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />
              </div>
              <p className="text-[11px] text-[var(--muted)] mt-1.5">
                We travel nationally and internationally with our full editorial mobile kit.
              </p>
            </div>

            <div>
              <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-2">
                Desired Ready-By Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--muted)]" />
                <input
                  type="text"
                  placeholder="e.g. 12:30 PM (or 2 hours before photographer arrival)"
                  value={formData.readyByTime}
                  onChange={(e) => updateField('readyByTime', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SERVICE PACKAGE & GUEST COUNT */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-3">
                Select Service Experience
              </label>
              <div className="space-y-3">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => updateField('serviceId', svc.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.serviceId === svc.id
                        ? 'border-[var(--accent)] bg-[var(--accent-light)] ring-1 ring-[var(--accent)]'
                        : 'border-[var(--border)] hover:border-[var(--muted)]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-serif text-base text-[var(--foreground)] font-medium">
                          {svc.title}
                        </div>
                        <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-1">
                          {svc.shortDescription}
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <span className="font-mono text-xs font-semibold text-[var(--accent)] block">
                          {svc.priceIndicative}
                        </span>
                        <span className="text-[10px] text-[var(--muted)]">
                          ~{svc.durationMinutes} mins
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-2">
                Number of People Requiring Artistry
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={formData.guestsCount}
                  onChange={(e) => updateField('guestsCount', parseInt(e.target.value) || 1)}
                  className="w-24 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-center font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />
                <span className="text-xs text-[var(--muted)]">
                  {formData.guestsCount === 1 ? 'Bride / Client only' : `Client + ${formData.guestsCount - 1} party members`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT & AESTHETIC NOTES */}
        {step === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lady Genevieve Sterling"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="e.g. genevieve@example.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-1.5">
                  Mobile / WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +44 7700 900142"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-1.5">
                  Estimated Artistry Budget
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => updateField('budgetRange', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <option value="Under ₹25,000">Under ₹25,000</option>
                  <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                  <option value="₹1,00,000+ (Destination / Multi-Day)">₹1,00,000+ (Destination / Multi-Day)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)] mb-1.5">
                Aesthetic Vision & Dress / Venue Details
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your desired finish (e.g. dewy glass skin, soft glam), gown neckline, skin sensitivities, or specific inspirations..."
                value={formData.aestheticNotes}
                onChange={(e) => updateField('aestheticNotes', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              />
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW STEP */}
        {step === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-4 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)] space-y-3">
              <h4 className="font-serif text-lg text-[var(--foreground)] border-b border-[var(--border)] pb-2">
                Summary of Your Consultation Request
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">Event Type</span>
                  <span className="font-semibold">{formData.eventType}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">Date</span>
                  <span className="font-semibold">{formData.eventDate}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">Location</span>
                  <span className="font-semibold">{formData.location}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">Ready-By</span>
                  <span className="font-semibold">{formData.readyByTime}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">Service</span>
                  <span className="font-semibold">{selectedService?.title || 'Selected Experience'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">Party Size</span>
                  <span className="font-semibold">{formData.guestsCount} person(s)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">Contact</span>
                  <span className="font-semibold">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">Email & Phone</span>
                  <span className="font-semibold">{formData.email}</span>
                </div>
              </div>
            </div>

            {/* Non-binding Notice */}
            <div className="flex items-start space-x-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
              <ShieldCheck className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <strong>Important Booking Notice:</strong>
                <p className="mt-0.5 leading-relaxed">
                  Submitting this enquiry does not confirm a booking or obligate payment. Our studio will review your date and provide a formal, customized quotation within 24 hours.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Buttons Action Bar */}
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full border border-[var(--border)] text-xs tracking-luxury uppercase font-medium hover:bg-[var(--background-subtle)] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-all cursor-pointer shadow-sm"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black text-xs tracking-luxury uppercase font-semibold transition-all shadow-md hover:shadow-xl cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Transmitting Request...' : 'Transmit Availability Request'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
