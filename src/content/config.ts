import { defineCollection, z } from 'astro:content';

// 1. 文章集合
// 修正重點：變數名稱必須定義為 'blog'
const blog = defineCollection({
  type: 'content', 
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(), 
    tags: z.array(z.string()),
    coverImage: image().optional(),
    excerpt: z.string(),
  }),
});

// 2. 全站設定 (Singleton)
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

// 3. 門診表 (Singleton)
const schedule = defineCollection({
  type: 'data',
  schema: z.object({
    image: z.string().optional(),
    lastUpdated: z.string().or(z.date()),
  }),
});

// 匯出設定
export const collections = { 
    'blog': blog,      // 這裡參照上方的 const blog
    'settings': settings,
    'schedule': schedule
};