import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  // 開發模式使用 local，上線使用 github
  storage: import.meta.env.PROD
    ? {
      kind: 'github',
      repo: {
        owner: 'drchou2026', // 已填上您的 username
        name: 'drcmh-site-v2', // 已填上您的 repo name
      },
    }
    : {
      kind: 'local',
    },

  ui: {
    brand: { name: '周孟翰醫師後台' },
    navigation: {
      '網站內容': ['blog', 'news', 'videos', 'schedule'],
      '全站設定': ['settings', 'resume'],
    }
  },

  singletons: {
    settings: singleton({
      label: '全站資訊 & 醫師資料',
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

        doctorWord: fields.text({
          label: '醫師的話 (Doctor\'s Word)',
          multiline: true,
          description: '顯示於首頁的醫師短語或理念闡述。',
          defaultValue: '致力於透過細膩的溝通與精準的治療，協助您卸下心理負擔，重拾自信生活。'
        }),

        sidebarIntro: fields.text({
          label: '側邊欄及頁尾簡介 (Sidebar+Footer Intro)',
          multiline: true,
          description: '顯示於文章側邊欄的短介紹',
          defaultValue: '致力於透過細膩的溝通與精準的治療，協助您卸下心理負擔，重拾自信生活。'
        }),

        // --- 4. 其他診所資訊 ---
        phone: fields.text({ label: '預約電話' }),
        email: fields.text({ label: '聯絡 Email' }),
        address: fields.text({ label: '診所地址' }),
        bookingLink: fields.url({ label: '線上掛號連結' }),
        googleMapEmbedLink: fields.url({ label: 'Google 地圖嵌入連結' }),


        // 👇👇👇 新增這個墊高用欄位 👇👇👇
        z_layout_spacer: fields.text({
          label: '--------- ⬇️ 頁面底部墊高區 (請忽略) ⬇️ ---------',
          description: '此欄位僅用於解決無法捲動到底部的問題，請勿填寫。',
          multiline: true, // 開啟多行模式，讓它佔據更多高度
        }),

      },
    }),

    resume: singleton({
      label: '醫師專業履歷 (Resume)',
      path: 'src/content/settings/resume',
      schema: {
        experiences: fields.array(
          fields.text({ label: '經歷項目' }),
          { label: '專業經歷 (Experiences)', itemLabel: props => props.value }
        ),
        associations: fields.array(
          fields.text({ label: '醫學會項目' }),
          { label: '專業醫學會 (Associations)', itemLabel: props => props.value }
        ),
        educations: fields.array(
          fields.text({ label: '學歷項目' }),
          { label: '學歷 (Educations)', itemLabel: props => props.value }
        ),
        certifications: fields.array(
          fields.text({ label: '證照項目' }),
          { label: '專科證照 (Certifications)', itemLabel: props => props.value }
        ),
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

        // 🟢 每週門診表設定
        weeklySchedule: fields.array(
          fields.object({
            day: fields.select({
              label: '星期',
              options: [
                { label: '週一', value: '週一' },
                { label: '週二', value: '週二' },
                { label: '週三', value: '週三' },
                { label: '週四', value: '週四' },
                { label: '週五', value: '週五' },
                { label: '週六', value: '週六' },
                { label: '週日', value: '週日' },
              ],
              defaultValue: '週一',
            }),
            morning: fields.object({
              status: fields.select({
                label: '早診狀態',
                options: [
                  { label: '看診 (Open)', value: '看診' },
                  { label: '休診 (Closed)', value: '休診' },
                  { label: '特約診 (Reserved)', value: '特約診' },
                  { label: '手術日 (Surgery)', value: '手術日' },
                  { label: '自訂 (Custom)', value: '自訂' },
                ],
                defaultValue: '看診',
              }),
              customLabel: fields.text({ label: '自訂顯示文字 (選「自訂」才顯示)' }),
              note: fields.text({ label: '備註/時間 (例如: 09:00-12:00)' }),
            }, { label: '早診 (Morning)' }),
            afternoon: fields.object({
              status: fields.select({
                label: '午診狀態',
                options: [
                  { label: '看診 (Open)', value: '看診' },
                  { label: '休診 (Closed)', value: '休診' },
                  { label: '特約診 (Reserved)', value: '特約診' },
                  { label: '手術日 (Surgery)', value: '手術日' },
                  { label: '自訂 (Custom)', value: '自訂' },
                ],
                defaultValue: '看診',
              }),
              customLabel: fields.text({ label: '自訂顯示文字 (選「自訂」才顯示)' }),
              note: fields.text({ label: '備註/時間 (例如: 14:00-17:00)' }),
            }, { label: '午診 (Afternoon)' }),
            evening: fields.object({
              status: fields.select({
                label: '晚診狀態',
                options: [
                  { label: '看診 (Open)', value: '看診' },
                  { label: '休診 (Closed)', value: '休診' },
                  { label: '特約診 (Reserved)', value: '特約診' },
                  { label: '手術日 (Surgery)', value: '手術日' },
                  { label: '自訂 (Custom)', value: '自訂' },
                ],
                defaultValue: '看診',
              }),
              customLabel: fields.text({ label: '自訂顯示文字 (選「自訂」才顯示)' }),
              note: fields.text({ label: '備註/時間 (例如: 18:00-21:00)' }),
            }, { label: '晚診 (Evening)' }),
          }),
          {
            label: '每週門診表 (Weekly Schedule)',
            itemLabel: props => props.fields.day.value || '新增一天',
          }
        ),

        // 👇👇👇 墊高用欄位 👇👇👇
        z_layout_spacer: fields.text({
          label: '--------- ⬇️ 頁面底部墊高區 (請忽略) ⬇️ ---------',
          description: '此欄位僅用於解決無法捲動到底部的問題，請勿填寫。',
          multiline: true,
        }),

      },
    }),
  },

  collections: {
    blog: collection({
      label: '衛教文章管理',
      slugField: 'title',
      path: 'src/content/blog/*',// 每個文章一個資料夾 (包含圖片)
      format: { contentField: 'content' },
      columns: ['title', 'date'],
      // 🟢 新增這一行：預覽網址設定
      // 這樣在編輯文章時，頂部會出現一個「眼睛」或「連結」圖示，點擊直接跳到該文章
      previewUrl: '/blog/{slug}',
      schema: {
        title: fields.slug({
          name: { label: '文章標題 (Title)', description: '顯示在網站上的大標題' },
          slug: { label: '網址代稱 (Slug)', description: '網址的最後一部分 (建議使用英文，例如: prostate-treatment)，這會影響 SEO 且發布後不建議修改。' }
        }),

        date: fields.date({ label: '發布日期' }),
        author: fields.text({ label: '作者', defaultValue: '周孟翰 醫師', }),
        // 🟢 改成這樣：
        tags: fields.text({
          label: '文章標籤 (Tags)',
          description: '請用「半形逗號」分隔多個標籤。例如：攝護腺, 頻尿, 雷射手術',
        }),
        coverImage: fields.image({
          label: '文章封面圖',
          directory: 'src/content/blog', // 放在文章同級目錄，便於 Astro Image 優化
          publicPath: './',
          description: '上傳需要一點時間。封面圖片，建議 1200x628 像素，比例約 1.91:1，有助於社群分享時顯示效果。',
        }),

        content: fields.document({
          label: '文章內文',
          formatting: {
            headingLevels: [2, 3, 4, 5, 6], // 限制只能用 H2 ~ H6
            blockTypes: true, // 開啟引用 (Blockquote) 等功能
            alignment: true,  // 開啟置左/置中/置右
            listTypes: true,  // 開啟列表 (ul/ol)
          },
          dividers: true,
          links: true,
          images: {
            directory: 'src/content/blog',
            publicPath: './',
          },
        }),

        // SEO 設定：給 Google 看
        advanced: fields.conditional(
          // 1. 控制開關 (預設 false = 縮起來)
          fields.checkbox({
            label: '自訂 SEO 與摘要 (進階選項)',
            description: '若不勾選，系統將自動抓取文章標題與內文前段作為 SEO 設定。'
          }),
          {
            // 2. 當勾選 (true) 時顯示的欄位
            true: fields.object({
              excerpt: fields.text({
                label: '列表摘要',
                multiline: true,
                description: '顯示於首頁卡片。'
              }),
              seoTitle: fields.text({
                label: 'SEO 標題',
                description: '覆蓋預設的網頁標題。'
              }),
              seoDescription: fields.text({
                label: 'SEO 描述',
                description: '建議 60-100 字。'
              }),
            }),
            // 3. 當沒勾選 (false) 時，裡面是空的 (保持乾淨)
            false: fields.empty(),
          }
        ),

        // 👇👇👇 新增這個墊高用欄位 👇👇👇
        z_layout_spacer: fields.text({
          label: '--------- ⬇️ 頁面底部墊高區 (請忽略) ⬇️ ---------',
          description: '此欄位僅用於解決無法捲動到底部的問題，請勿填寫。',
          multiline: true, // 開啟多行模式，讓它佔據更多高度
        }),
      },
    }),

    // --- 2. 最新消息 (News) ---
    news: collection({
      label: '最新消息管理',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: '公告標題' },
          slug: { label: '網址代稱 (Slug)', description: '建議使用日期開頭，如 2026-02-04-holiday' }
        }),
        date: fields.date({ label: '發布日期', defaultValue: { kind: 'today' } }),

        isPinned: fields.checkbox({
          label: '置頂公告 (Pinned)',
          description: '勾選後，此消息將優先顯示於首頁跑馬燈或列表最上方。'
        }),

        category: fields.select({
          label: '公告類別',
          defaultValue: 'announcement',
          options: [
            { label: '診所公告 (Announcement)', value: 'announcement' },
            { label: '停診通知 (Closed)', value: 'closed' },
            { label: '活動快訊 (Activity)', value: 'activity' },
          ],
        }),

        coverImage: fields.image({
          label: '公告封面圖 (選填)',
          directory: 'src/content/news',
          publicPath: './',
        }),

        content: fields.document({
          label: '公告內容',
          formatting: true,
          links: true,
          images: { directory: 'src/content/news', publicPath: './' },
        }),

        // 👇👇👇 墊高用欄位 👇👇👇
        z_layout_spacer: fields.text({
          label: '--------- ⬇️ 頁面底部墊高區 (請忽略) ⬇️ ---------',
          description: '此欄位僅用於解決無法捲動到底部的問題，請勿填寫。',
          multiline: true,
        }),
      },
    }),

    // --- 3. 影音專區 (Videos) ---
    videos: collection({
      label: '影音專區管理',
      slugField: 'title',
      path: 'src/content/videos/*',
      schema: {
        title: fields.slug({ name: { label: '影片標題' } }),
        date: fields.date({ label: '發布日期', defaultValue: { kind: 'today' } }),

        platform: fields.select({
          label: '影片平台',
          defaultValue: 'youtube',
          options: [
            { label: 'YouTube (長影片/Shorts)', value: 'youtube' },
            { label: 'Instagram (Reels)', value: 'instagram' },
          ],
        }),

        videoUrl: fields.url({
          label: '影片連結 (URL)',
          description: '請直接貼上 YouTube 或 Instagram 的完整網址。系統會自動抓取 ID。',
        }),

        category: fields.select({
          label: '影片分類',
          defaultValue: 'education',
          options: [
            { label: '衛教解說 (Education)', value: 'education' },
            { label: '診間花絮 (Vlog)', value: 'vlog' },
            { label: '媒體採訪 (Media)', value: 'media' },
          ],
        }),

        customThumbnail: fields.image({
          label: '自訂封面圖 (選填)',
          description: '若留空，將嘗試自動抓取 YouTube 縮圖。IG 影片建議手動上傳。',
          directory: 'src/content/videos',
          publicPath: './',
        }),

        description: fields.text({
          label: '影片簡介',
          multiline: true,
        }),

        // 👇👇👇 墊高用欄位 👇👇👇
        z_layout_spacer: fields.text({
          label: '--------- ⬇️ 頁面底部墊高區 (請忽略) ⬇️ ---------',
          description: '此欄位僅用於解決無法捲動到底部的問題，請勿填寫。',
          multiline: true,
        }),
      },
    }),
  },
});