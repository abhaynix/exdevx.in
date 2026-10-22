import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional().refine((phone) => !phone || /^\+[1-9]\d{7,14}$/.test(phone), { message: 'Enter a valid number with country code, e.g. +917020401094' }),
  service: z.string().min(1, { message: "Please select a primary service" }),
  budget: z.string().optional(),
  message: z.string().min(10, { message: "Please share a brief message (minimum 10 characters)" }).max(2000),
  honeypot: z.string().max(0, { message: "Spam detected" }).optional().or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
