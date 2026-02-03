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

    // 👇 新增這些欄位以配合 MarkdownLayout 和 Keystatic
    excerpt: z.string().optional(), // 建議設為 optional 以防舊文章沒有
    author: z.string().default('周孟翰 醫師'), // 給予預設值
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

// 2. 全站設定 (Singleton)
const settings = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    // 醫師資料
    doctorName: z.string(),
    doctorTitle: z.string().default('院長'),
    clinicName: z.string(),
    
    // 圖片：使用 image() helper，這樣 Astro 會自動處理路徑優化
    avatar: image().optional(), 
    
    // 文案
    slogan: z.string().optional(),
    heroIntro: z.string().optional(),
    sidebarIntro: z.string().optional(),
    
    // 原本的欄位
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