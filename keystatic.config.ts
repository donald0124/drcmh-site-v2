import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    // 開發模式使用 local，上線使用 github
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
        '網站內容': ['blog', 'schedule'],
        '全站設定': ['settings'],
    }
  },

  singletons: {
    settings: singleton({
      label:'全站資訊 & 醫師資料',
      path: 'src/content/settings/global',
      schema: {
        // --- 1. 醫師基本資料 ---
        doctorName: fields.text({ label: '醫師姓名', defaultValue: '周孟翰' }),
        doctorTitle: fields.text({ label: '醫師職稱', defaultValue: '院長' }),
        clinicName: fields.text({ label: '診所名稱', defaultValue: '新店高美泌尿科診所' }), // 原本就有的
        
        // --- 2. 圖片設定 (關鍵：存到 src/assets 以利優化) ---
        avatar: fields.image({
          label: '醫師大頭照 (方形)',
          description: '建議上傳 1:1 方形照片，顯示於側邊欄。',
          // 存到 src/assets/images 資料夾
          directory: 'src/assets/images', 
          // 在 YAML 檔中寫入的相對路徑 (從 src/content/settings/ 往外找)
          publicPath: '../../assets/images', 
        }),

        // --- 3. 文案設定 ---
        slogan: fields.text({ 
            label: '首頁 Slogan (標語)', 
            defaultValue: '讓難以啟齒的煩惱，變成輕鬆自在的日常' 
        }),
        heroIntro: fields.text({ 
            label: '首頁 Hero 介紹文', 
            multiline: true,
            defaultValue: '在診間，沒有尷尬的提問，只有專業的傾聽...' 
        }),
        sidebarIntro: fields.text({ 
            label: '側邊欄簡介 (Sidebar)', 
            multiline: true,
            description: '顯示於文章側邊欄的短介紹',
            defaultValue: '致力於透過細膩的溝通與精準的治療，協助您卸下心理負擔，重拾自信生活。' 
        }),
        
        // --- 4. 其他診所資訊 ---
        phone: fields.text({ label: '預約電話' }),
        address: fields.text({ label: '診所地址' }),
        bookingLink: fields.url({ label: '線上掛號連結' }),
        announcement: fields.text({ 
            label: '頂部公告欄 (選填)', 
            description: '例如：颱風天休診公告，留空則不顯示' 
        }),

        // 👇👇👇 新增這個墊高用欄位 👇👇👇
        z_layout_spacer: fields.text({
          label: '--------- ⬇️ 頁面底部墊高區 (請忽略) ⬇️ ---------',
          description: '此欄位僅用於解決無法捲動到底部的問題，請勿填寫。',
          multiline: true, // 開啟多行模式，讓它佔據更多高度
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
    blog: collection({
      label: '衛教文章管理',
      slugField: 'title',
      path: 'src/content/blog/*',// 每個文章一個資料夾 (包含圖片)
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ 
          name: { 
            label: '文章標題 (Title)', 
            description: '顯示在網站上的大標題'
          },
          slug: {
            label: '網址代稱 (Slug)',
            description: '網址的最後一部分 (建議使用英文，例如: prostate-treatment)，這會影響 SEO 且發布後不建議修改。'
          }
        }),
        
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
            publicPath: './',
            description: '上傳需要一點時間。封面圖片，建議 1200x628 像素，比例約 1.91:1，有助於社群分享時顯示效果。',
        }),

        content: fields.document({
          label: '文章內文',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/content/blog',
            publicPath: './',
          },
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

        // 👇👇👇 新增這個墊高用欄位 👇👇👇
        z_layout_spacer: fields.text({
          label: '--------- ⬇️ 頁面底部墊高區 (請忽略) ⬇️ ---------',
          description: '此欄位僅用於解決無法捲動到底部的問題，請勿填寫。',
          multiline: true, // 開啟多行模式，讓它佔據更多高度
        }),


        
      },
    }),
  },
});
