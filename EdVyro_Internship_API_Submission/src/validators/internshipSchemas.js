import { z } from 'zod';

const text = (max) => z.string().trim().min(1).max(max);
const optionalText = (max) => z.string().trim().max(max).optional();

export const internshipFields = {
  title: text(160),
  company: text(120),
  domain: text(80),
  location: text(120),
  mode: z.enum(['remote', 'hybrid', 'onsite']),
  description: text(5000),
  requirements: z.array(text(300)).max(30).default([]),
  stipend: z.coerce.number().min(0).max(10000000).default(0),
  currency: z.string().trim().length(3).default('INR'),
  applicationUrl: z.string().url().max(500),
  status: z.enum(['open', 'closed', 'draft']).default('open'),
  deadline: z.string().date().nullable().optional(),
};

export const createInternshipSchema = z.object({
  body: z.object(internshipFields).strict(),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const updateInternshipSchema = z.object({
  body: z.object({
    title: optionalText(160),
    company: optionalText(120),
    domain: optionalText(80),
    location: optionalText(120),
    mode: z.enum(['remote', 'hybrid', 'onsite']).optional(),
    description: optionalText(5000),
    requirements: z.array(text(300)).max(30).optional(),
    stipend: z.coerce.number().min(0).max(10000000).optional(),
    currency: z.string().trim().length(3).optional(),
    applicationUrl: z.string().url().max(500).optional(),
    status: z.enum(['open', 'closed', 'draft']).optional(),
    deadline: z.string().date().nullable().optional(),
  }).strict().refine((data) => Object.keys(data).length > 0, 'At least one field is required'),
  params: z.object({ id: z.string().uuid() }),
  query: z.object({}).optional(),
});

export const idSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ id: z.string().uuid() }),
  query: z.object({}).optional(),
});

export const listInternshipsSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().trim().max(160).optional(),
    domain: z.string().trim().max(80).optional(),
    location: z.string().trim().max(120).optional(),
    status: z.enum(['open', 'closed', 'draft']).optional(),
    sortBy: z.enum(['created_at', 'title', 'stipend']).default('created_at'),
    order: z.enum(['asc', 'desc']).default('desc'),
  }).strict(),
});
