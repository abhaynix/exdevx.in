import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '../../lib/validators';
import { siteConfig } from '../../data/site';
import { Button } from '../ui/Button';
import { CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService }) => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      service: initialService || '',
      budget: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      setSubmissionStatus('error');
      setStatusMessage('Spam submission detected.');
      return;
    }

    setSubmissionStatus('loading');
    setStatusMessage('Transmitting project inquiry…');

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

    try {
      if (!endpoint) {
        throw new Error('Contact endpoint is not configured.');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'exdevx.in',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      setSubmissionStatus('success');
      setStatusMessage('Thank you. Your inquiry has been received.');
      reset();
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmissionStatus('error');
      setStatusMessage(`Submission failed. Please email us directly at ${siteConfig.contact.email} or WhatsApp us at ${siteConfig.contact.phone}.`);
    }
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--text)]/10 p-6 sm:p-10 rounded-xs shadow-xs">
      <div className="mb-6">
        <h3 className="font-display text-2xl font-semibold text-[var(--primary)] mb-2">
          Project Specification Inquiry
        </h3>
        <p className="text-xs font-mono text-[var(--text)]/60 uppercase tracking-wider">
          Direct engineering consultation · NDA upon request · Direct replies
        </p>
      </div>

      {/* Accessible aria-live status message */}
      <div aria-live="polite" className="mb-4">
        {submissionStatus === 'success' && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xs flex items-start gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Inquiry Received</p>
              <p className="text-xs text-emerald-800 mt-1">{statusMessage}</p>
            </div>
          </div>
        )}

        {submissionStatus === 'error' && (
          <div className="p-4 bg-rose-50 border border-rose-300 text-rose-900 rounded-xs flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Notice</p>
              <p className="text-xs text-rose-800 mt-1">{statusMessage}</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Anti-spam honeypot (hidden from screen readers & users) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url_honeypot">Leave blank</label>
          <input
            id="website_url_honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('honeypot')}
          />
        </div>

        {/* Row 1: Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)] mb-1.5">
              Your Name <span className="text-[var(--accent)]">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Vikram Sharma"
              className="w-full bg-[var(--bg)] border border-[var(--text)]/15 px-3.5 py-2.5 text-sm text-[var(--text)] rounded-xs focus-ring"
              {...register('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="text-xs text-rose-600 font-sans mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)] mb-1.5">
              Work Email <span className="text-[var(--accent)]">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. vikram@company.com"
              className="w-full bg-[var(--bg)] border border-[var(--text)]/15 px-3.5 py-2.5 text-sm text-[var(--text)] rounded-xs focus-ring"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-xs text-rose-600 font-sans mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Service & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="service" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)] mb-1.5">
              Primary Capability <span className="text-[var(--accent)]">*</span>
            </label>
            <select
              id="service"
              className="w-full bg-[var(--bg)] border border-[var(--text)]/15 px-3.5 py-2.5 text-sm text-[var(--text)] rounded-xs focus-ring"
              {...register('service')}
              aria-invalid={errors.service ? 'true' : 'false'}
            >
              <option value="">Select scope…</option>
              <option value="Web Applications">Web Application (React / Next.js)</option>
              <option value="Mobile Apps">Mobile App (React Native)</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Backend & API Engineering">Backend & API Engineering</option>
              <option value="Automation Systems">Automation & Background Workers</option>
              <option value="AI Integrations">AI Agents & Gemini Integration</option>
              <option value="SEO & Digital Marketing">SEO & Digital Marketing</option>
              <option value="Full Digital Overhaul">Full Digital Overhaul</option>
            </select>
            {errors.service && (
              <p className="text-xs text-rose-600 font-sans mt-1">{errors.service.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="budget" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)] mb-1.5">
              Target Timeline / Budget
            </label>
            <select
              id="budget"
              className="w-full bg-[var(--bg)] border border-[var(--text)]/15 px-3.5 py-2.5 text-sm text-[var(--text)] rounded-xs focus-ring"
              {...register('budget')}
            >
              <option value="Not specified">Flexible / Scoping</option>
              <option value="₹1.5L - ₹3.5L / $2k - $4.5k">₹1.5L – ₹3.5L ($2k – $4.5k)</option>
              <option value="₹3.5L - ₹7.5L / $4.5k - $9k">₹3.5L – ₹7.5L ($4.5k – $9k)</option>
              <option value="₹7.5L+ / $10k+">₹7.5L+ ($10k+)</option>
            </select>
          </div>
        </div>

        {/* Row 3: Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)] mb-1.5">
            Project Overview & Goals <span className="text-[var(--accent)]">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us about the product challenge, technical expectations, or current bottlenecks…"
            className="w-full bg-[var(--bg)] border border-[var(--text)]/15 px-3.5 py-2.5 text-sm text-[var(--text)] rounded-xs focus-ring resize-y"
            {...register('message')}
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <p className="text-xs text-rose-600 font-sans mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button & Fast Tracks */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--text)]/10">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={submissionStatus === 'loading'}
            className="w-full sm:w-auto"
          >
            {submissionStatus === 'loading' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Dispatching…
              </span>
            ) : (
              'Submit Project Inquiry'
            )}
          </Button>

          <div className="text-xs font-mono text-[var(--text)]/70 flex items-center gap-3">
            <span>Or WhatsApp directly:</span>
            <a
              href={siteConfig.contact.whatsappFormatted}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-0.5 focus-ring"
            >
              +91 88301 74066
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
