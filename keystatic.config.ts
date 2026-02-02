import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: {
          owner: 'YOUR_GITHUB_USERNAME', // TODO: 開發者請修改這裡
          name: 'drcmh-site-v2',         // TODO: 開發者請修改這裡
        },
      }
    : {
        kind: 'local',
      },

  ui: {
    brand: { name: '周孟翰醫師後台' },
    navigation: {
        '網站內容': ['posts', 'schedule'],
        '全站設定': ['settings'],
    }
  },

  singletons: {
    settings: singleton({
      label: '全站資訊 (電話/連結)',
      path: 'src/content/settings/global',
      schema: {
        clinicName: fields.text({ label: '診所名稱', defaultValue: '新店高美泌尿科診所' }),
        phone: fields.text({ label: '預約電話' }),
        address: fields.text({ label: '診所地址' }),
        bookingLink: fields.url({ label: '線上掛號連結' }),
        announcement: fields.text({ 
            label: '頂部公告欄 (選填)', 
            description: '例如：颱風天休診公告，留空則不顯示' 
        }),
      },
    }),
    schedule: singleton({
      label: '門診時刻表',
      path: 'src/content/schedule/timetable',
      schema: {
        image: fields.image({
          label: '門診表圖片',
          description: '請上傳最新的門診時間表圖片',
          directory: 'public/images/schedule',
          publicPath: '/images/schedule/',
        }),
        lastUpdated: fields.date({ label: '更新日期', defaultValue: { kind: 'today' } }),
        note: fields.text({ label: '備註文字', description: '例如：國定假日看診異動說明' }),
      },
    }),
  },

  collections: {
    posts: collection({
      label: '衛教文章管理',
      slugField: 'title',
      path: 'src/content/blog/*',// 每個文章一個資料夾 (包含圖片)
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '標題' } }),
        date: fields.date({ label: '發布日期' }),      
        author: fields.text({ 
            label: '作者',
            defaultValue: '周孟翰 醫師', // 可以設一個預設值省時間
            description: '顯示於文章開頭，提升 E-A-T 權威性'
        }),

        tags: fields.array(
          fields.text({ label: '標籤' }),
          { label: '文章標籤 (Tags)', itemLabel: props => props.value }
        ),        
        coverImage: fields.image({
            label: '文章封面圖',
            directory: 'src/content/blog', // 放在文章同級目錄，便於 Astro Image 優化
            publicPath: './'
        }),

        // SEO 設定：給 Google 看
        seoTitle: fields.text({ 
            label: 'SEO 標題 (Meta Title)', 
            description: '若留空則預設使用文章標題' 
        }),
        seoDescription: fields.text({ 
            label: 'SEO 描述 (Meta Description)', 
            description: '建議 60-100 字，若留空則自動抓取內文前段' 
        }),
  
        // 列表專用：給網站訪客看
        excerpt: fields.text({ 
            label: '列表摘要', 
            multiline: true,
            description: '顯示於首頁卡片，若留空，程式端可設定回退使用 SEO 描述。'
        }),

        content: fields.document({
          label: '內文',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/content/blog',
            publicPath: './',
          },
        }),
      },
    }),
  },
});
