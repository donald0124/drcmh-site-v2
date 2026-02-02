import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content', 
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(), 
    tags: z.array(z.string()),
    coverImage: image().optional(),
    excerpt: z.string(),
  }),
});

const settings = defineCollection({
  type: 'data',
  schema: z.object({
    clinicName: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),
    bookingLink: z.string().url().optional(),
    announcement: z.string().optional(),
  }),
});

const schedule = defineCollection({
  type: 'data',
  schema: z.object({
    image: z.string().optional(),
    lastUpdated: z.string().or(z.date()),
  }),
});

export const collections = { 
    'posts': posts,
    'settings': settings,
    'schedule': schedule
};