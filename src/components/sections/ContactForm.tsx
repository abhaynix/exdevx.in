import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '../../lib/validators';
import { siteConfig } from '../../data/site';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
  headingLevel?: 2 | 3;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService, headingLevel = 3 }) => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [whatsappLink, setWhatsappLink] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: initialService || '',
      budget: '',
      message: '',
      honeypot: '',
    },
  });
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      setSubmissionStatus('error');
      setStatusMessage('Spam submission detected.');
      return;
    }

    setSubmissionStatus('loading');
    setStatusMessage('Preparing your WhatsApp message…');
    setWhatsappLink('');
    const message = [
      'Hi EXDEV X team, I just submitted a project inquiry.',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      ...(data.phone ? [`WhatsApp: ${data.phone}`] : []),
      `Service: ${data.service}`,
      `Timeline / Budget: ${data.budget || 'Not specified'}`,
      `Project: ${data.message}`,
    ].join('\n');
    const link = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    try {
      window.open(link, '_blank', 'noopener,noreferrer');
      setWhatsappLink(link);
      setSubmissionStatus('success');
      setStatusMessage('Review and send your prefilled message. If WhatsApp did not open automatically, use the link below. Your form entries remain here.');
    } catch {
      setWhatsappLink(link);
      setSubmissionStatus('error');
      setStatusMessage('WhatsApp could not open automatically. Use the link below to review and send your message. Your form entries remain here.');
    }
  };

  return (
    <div className="card-chai bg-[var(--surface)] p-5 sm:p-8 rounded-lg">
      <div className="mb-7 border-b border-[var(--text)]/10 pb-5">
        <Heading className="font-display text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-[var(--dark)] mb-2">
          Project inquiry
        </Heading>
        <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
          Name · contact details · service · project overview
        </p>
      </div>

      {/* Accessible aria-live status message */}
      <div aria-live="polite" className="mb-4">
        {submissionStatus === 'success' && (
          <div className="form-feedback p-4 bg-[var(--success-bg)] border border-[var(--success-border)] text-[var(--text-primary)] rounded-xs flex items-start gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 text-[var(--success)] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Continue in WhatsApp</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{statusMessage || 'Review and send your prefilled message. If WhatsApp did not open automatically, use the link below. Your form entries remain here.'}</p>
              {whatsappLink && <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] underline">Open WhatsApp conversation <ArrowUpRight className="h-3 w-3" /></a>}
            </div>
          </div>
        )}

        {submissionStatus === 'error' && (
          <div className="form-feedback p-4 bg-[var(--error-bg)] border border-[var(--error-border)] text-[var(--text-primary)] rounded-xs flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-[var(--error)] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Notice</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{statusMessage}</p>
              {whatsappLink && <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] underline">Open WhatsApp conversation <ArrowUpRight className="h-3 w-3" /></a>}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
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
            <label htmlFor="name" className="block text-sm font-sans font-semibold text-[var(--text)] mb-2">
              Your name <span aria-hidden="true" className="text-[var(--accent-bright)]">*</span><span className="sr-only"> (required)</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Abhay Jadhav"
              className="w-full min-h-11 bg-[var(--surface)] border border-[var(--control-border)] px-4 py-2.5 text-sm text-[var(--text)] rounded-md transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--focus-ring)] focus-ring"
              {...register('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              required
            />
            {errors.name && (
              <p id="name-error" role="alert" className="form-feedback text-xs text-[var(--error)] font-sans mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-sans font-semibold text-[var(--text)] mb-2">
              Work email <span aria-hidden="true" className="text-[var(--accent-bright)]">*</span><span className="sr-only"> (required)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. abhay@exdevx.in"
              className="w-full min-h-11 bg-[var(--surface)] border border-[var(--control-border)] px-4 py-2.5 text-sm text-[var(--text)] rounded-md transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--focus-ring)] focus-ring"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              required
            />
            {errors.email && (
              <p id="email-error" role="alert" className="form-feedback text-xs text-[var(--error)] font-sans mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-sans font-semibold text-[var(--text)] mb-2">
            WhatsApp number <span className="font-normal text-[var(--text-secondary)]">(Important)</span>
          </label>
          <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 70204 01094" className="w-full min-h-11 bg-[var(--surface)] border border-[var(--control-border)] px-4 py-2.5 text-sm text-[var(--text)] rounded-md transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--focus-ring)] focus-ring" {...register('phone', { setValueAs: (value: string) => value.replace(/[\s()-]/g, '') })} aria-invalid={errors.phone ? 'true' : 'false'} aria-describedby={errors.phone ? 'phone-error' : undefined} />
          {errors.phone && <p id="phone-error" role="alert" className="form-feedback text-xs text-[var(--error)] font-sans mt-1">{errors.phone.message}</p>}
        </div>

        {/* Row 2: Service & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="service" className="block text-sm font-sans font-semibold text-[var(--text)] mb-2">
              Service <span aria-hidden="true" className="text-[var(--accent-bright)]">*</span><span className="sr-only"> (required)</span>
            </label>
            <select
              id="service"
              className="w-full min-h-11 bg-[var(--surface)] border border-[var(--control-border)] px-4 py-2.5 text-sm text-[var(--text)] rounded-md transition-colors focus:border-[var(--focus-ring)] focus-ring"
              {...register('service')}
              aria-invalid={errors.service ? 'true' : 'false'}
              aria-describedby={errors.service ? 'service-error' : undefined}
              required
            >
              <option value="">Select scope…</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Backend & APIs">Backend &amp; APIs</option>
              <option value="AI & Automation">AI &amp; Automation</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Full Digital Overhaul">Full Digital Overhaul</option>
            </select>
            {errors.service && (
              <p id="service-error" role="alert" className="form-feedback text-xs text-[var(--error)] font-sans mt-1">{errors.service.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-sans font-semibold text-[var(--text)] mb-2">
              Indicative budget
            </label>
            <select
              id="budget"
              className="w-full min-h-11 bg-[var(--surface)] border border-[var(--control-border)] px-4 py-2.5 text-sm text-[var(--text)] rounded-md transition-colors focus:border-[var(--focus-ring)] focus-ring"
              {...register('budget')}
              aria-describedby="budget-note"
            >
              <option value="Not specified">Flexible / Scoping</option>
              <option value="₹8k–₹25k">₹8k–₹25k</option>
              <option value="₹25k–₹75k">₹25k–₹75k</option>
              <option value="₹75k–₹1.5L">₹75k–₹1.5L</option>
              <option value="₹1.5L–₹3.5L">₹1.5L–₹3.5L</option>
            </select>
            </div>
        </div>

        {/* Row 3: Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-sans font-semibold text-[var(--text)] mb-2">
            Project overview <span aria-hidden="true" className="text-[var(--accent-bright)]">*</span><span className="sr-only"> (required)</span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us about the product challenge, technical expectations, or current bottlenecks…"
            className="w-full min-h-32 bg-[var(--surface)] border border-[var(--control-border)] px-4 py-3 text-sm leading-relaxed text-[var(--text)] rounded-md transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--focus-ring)] focus-ring resize-y"
            {...register('message')}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            required
          />
          {errors.message && (
            <p id="message-error" role="alert" className="form-feedback text-xs text-[var(--error)] font-sans mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button & Fast Tracks */}
        <div className="pt-6 flex flex-col items-start gap-4 border-t border-[var(--text)]/10">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={submissionStatus === 'loading'}
            iconRight={null}
            className="min-h-11 w-full sm:w-auto !bg-[var(--accent-primary)] !text-[var(--on-accent)] transition-[background-color,filter,transform] hover:!bg-[var(--accent-hover)] dark:!bg-[#a27b3e] dark:!text-[#101114] dark:hover:!bg-[#b18a51] hover:brightness-110"
          >
            {submissionStatus === 'loading' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Opening WhatsApp…
              </span>
            ) : (
              'Continue with WhatsApp →'
            )}
          </Button>
          <p className="max-w-prose text-sm leading-relaxed text-[var(--text-secondary)]">
            Your inquiry opens in WhatsApp for you to review and send. No form details are emailed automatically. See our{' '}
            <Link to="/privacy-policy" className="font-medium text-[var(--primary)] underline underline-offset-2 focus-ring rounded-sm">Privacy Policy</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};
