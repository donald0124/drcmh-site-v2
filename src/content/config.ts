// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. 衛教文章 (Blog)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(), // 或是 z.string().transform((str) => new Date(str)), 視情況而定
    author: z.string().default('周孟翰 醫師'),
    tags: z.string().optional().transform((str) => {
      if (!str) return [];
      return str.split(',').map((s) => s.trim()).filter(Boolean);
    }),
    coverImage: image().optional(),

    // 🟢 對應 Keystatic 的 Conditional 欄位 (advanced)
    advanced: z.union([
      // 情況 A: 有勾選 (true)
      z.object({
        discriminant: z.literal(true),
        value: z.object({
          excerpt: z.string().optional(),
          seoTitle: z.string().optional(),
          seoDescription: z.string().optional(),
        })
      }),
      // 情況 B: 沒勾選 (false)
      z.object({
        discriminant: z.literal(false),
      }),
    ]).default({ discriminant: false }), // 給個預設值避免報錯

    // 墊高欄位
    z_layout_spacer: z.string().optional(),
  }),
});

// 2. 最新消息 (News) [NEW]
const news = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/news" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    isPinned: z.boolean().default(false),
    category: z.enum(['announcement', 'closed', 'activity']).default('announcement'),
    coverImage: image().optional(),

    // 墊高欄位
    z_layout_spacer: z.string().optional(),
  }),
});

// 3. 影音專區 (Videos) [NEW]
const videos = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/videos" }), // 注意: 如果 Keystatic 存成 yaml 這裡就要改
  // Keystatic 預設 collection 可能是 .mdoc 或 .yaml，請檢查實際產生的檔案副檔名
  // 假設 videos 是沒有 content 欄位的，Keystatic 通常存成 .yaml 或 .json
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    platform: z.enum(['youtube', 'instagram']).default('youtube'),
    videoUrl: z.string().url(),
    category: z.enum(['education', 'vlog', 'media']).default('education'),
    customThumbnail: image().optional(),
    description: z.string().optional(),

    // 墊高欄位
    z_layout_spacer: z.string().optional(),
  }),
});

// 4. 全站設定 (Settings)
const settings = defineCollection({
  loader: glob({ pattern: "global.yaml", base: "./src/content/settings" }),
  schema: ({ image }) => z.object({
    doctorName: z.string().default('周孟翰'),
    doctorTitle: z.string().default('院長'),
    clinicName: z.string(),
    avatar: image().optional(),
    slogan: z.string().optional(),
    heroIntro: z.string().optional(),
    doctorWord: z.string().optional(), // [NEW]
    sidebarIntro: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    bookingLink: z.string().url().optional(),
    googleMapEmbedLink: z.string().url().optional(), // [NEW]

    // 墊高欄位
    z_layout_spacer: z.string().optional(),
  }),
});

// 5. 門診表 (Schedule)
const schedule = defineCollection({
  loader: glob({ pattern: "timetable.yaml", base: "./src/content/schedule" }),
  schema: ({ image }) => z.object({
    image: image().optional(),
    lastUpdated: z.date().optional(), // 或是 z.string()
    note: z.string().optional(),

    // 🟢 每週門診表設定
    weeklySchedule: z.array(
      z.object({
        day: z.string(),
        morning: z.object({
          status: z.string(),
          customLabel: z.string().optional(),
          note: z.string().optional(),
        }),
        afternoon: z.object({
          status: z.string(),
          customLabel: z.string().optional(),
          note: z.string().optional(),
        }),
        evening: z.object({
          status: z.string(),
          customLabel: z.string().optional(),
          note: z.string().optional(),
        }),
      })
    ).optional(),

    // 墊高欄位
    z_layout_spacer: z.string().optional(),
  }),
});

// 6. 專業履歷 (Resume)
const resume = defineCollection({
  loader: glob({ pattern: "resume.yaml", base: "./src/content/settings" }),
  schema: ({ image }) => z.object({
    experiences: z.array(z.string()).optional(),
    associations: z.array(z.string()).optional(),
    educations: z.array(z.string()).optional(),
    certifications: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blog,
  'news': news,
  'videos': videos,
  'settings': settings,
  'schedule': schedule,
  'resume': resume
};