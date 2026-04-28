// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. 衛教文章 (Blog)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(), // 或是 z.string().transform((str) => new Date(str)), 視情況而定
    updatedDate: z.date().optional(),
    author: z.string().default('周孟翰 醫師'),
    category: z.array(z.enum(['排尿困擾與攝護腺', '私密健康與性傳染病', '微創治療與手術', '男性性功能與荷爾蒙', '一般泌尿疾病'])).default(['一般泌尿疾病']),
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

  }),
});

// 2. 最新消息 (News) [NEW]
const news = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/news" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    isPinned: z.boolean().default(false),
    category: z.enum(['announcement', 'closed', 'activity']).default('announcement'),
    coverImage: image().optional(),

  }),
});

// 3. 衛教影片 (Videos) [MODIFIED]
const videos = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/videos" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    youtubeUrl: z.string().url(),
    category: z.enum(['education', 'vlog', 'media']).default('education'),
    customThumbnail: image().optional(),
    description: z.string().optional(),
  }),
});

// 4. 短影音 (Old Collection -> New Singleton) [MODIFIED]
const shorts = defineCollection({
  loader: glob({ pattern: "index.yaml", base: "./src/content/shorts" }),
  schema: () => z.object({
    list: z.array(
      z.object({
        title: z.string(),
        date: z.date(),
        youtubeUrl: z.string().url(),
      })
    ).optional(),
  }),
});

// 4. 全站設定 (Settings)
const settings = defineCollection({
  loader: glob({ pattern: "global.yaml", base: "./src/content/settings" }),
  schema: ({ image }) => z.object({
    doctorName: z.string().default('周孟翰'),
    doctorTitle: z.string().default('院長'),
    currentHospitalPosition: z.string().optional(),
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
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    line: z.string().url().optional(),

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

// 7. 常見問答 (FAQ)
const faq = defineCollection({
  loader: glob({ pattern: "list.yaml", base: "./src/content/faq" }),
  schema: () => z.object({
    title: z.string().default('常見問答'),
    subtitle: z.string().optional(),
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional(),
  }),
});

export const collections = {
  'faq': faq,
  'blog': blog,
  'news': news,
  'videos': videos,
  'shorts': shorts,
  'settings': settings,
  'schedule': schedule,
  'resume': resume
};