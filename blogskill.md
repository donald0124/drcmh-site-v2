# 衛教文章撰寫 SEO 指南

每次在 `src/content/blog/` 新增 `.mdx` 文章時，請依照以下清單確認所有欄位都有正確填寫。

---

## 一、Frontmatter 必填欄位

```yaml
---
title: 【文章主標題】          # 顯示在頁面 h1，建議 20–40 字
date: YYYY-MM-DD
author: 周孟翰 醫師
category:
  - 排尿困擾與攝護腺           # 從以下五項選一或多項：
                               # 排尿困擾與攝護腺
                               # 私密健康與性傳染病
                               # 微創治療與手術
                               # 男性性功能與荷爾蒙
                               # 一般泌尿疾病
tags: 關鍵字A, 關鍵字B, 關鍵字C  # 逗號分隔，3–6 個，對應文章核心概念
coverImage: ../../assets/images/blog/資料夾名稱/封面圖.jpg

advanced:
  discriminant: true
  value:
    excerpt: >-
      文章摘要，100–150 字。這段文字會顯示在文章頁的引言區塊，
      也是 Google / AI 搜尋引擎最先讀取的段落，請寫得清楚、精準。
    seoTitle: 完整關鍵字 + 品牌名 | 周孟翰醫師   # 建議 30–60 字
    seoDescription: >-
      給搜尋結果頁的描述，120–160 字。請包含主要關鍵字、
      病症名稱、治療方式，並自然帶入「周孟翰醫師」或「新店高美泌尿科」。
---
```

---

## 二、摘要的兩個角色（兩者都要寫，但內容不同）

### 2-1. Frontmatter `excerpt`（給讀者看的引言）

`advanced.value.excerpt` 由 `src/pages/blog/[slug].astro` 自動渲染為 h1 下方的引言區塊（帶左側色條），同時作為 `seoDescription` 的 fallback。

寫法：**短、口語、吸引人繼續閱讀**，約 50–80 字。

```yaml
excerpt: >-
  UroLift® 與 Rezūm 是目前主流的攝護腺微創手術選項，各有不同的適應族群與效果時程。
  本文整理兩者的原理、優勢與限制，協助你了解個人化治療方向。
```

### 2-2. MDX 內文 blockquote（給 AI 爬取的 speakable 段落）

在 frontmatter 結束後、第一個 `##` 標題之前，加入一段 blockquote。
`speakable` JSON-LD 的 cssSelector 包含 `"blockquote"`，這是 Google AI Overview、Perplexity、ChatGPT 引用本站的主要入口。

寫法：**詳細、包含醫學術語、明確提及醫師姓名**，約 80–120 字。

```markdown
> **摘要：** [病症/手術名稱（含英文縮寫）] 是 [定義與背景]，[機制A] 與 [機制B] 各有 [差異重點]。
> 本文由泌尿科專科醫師周孟翰說明 [核心主題]，以及 [治療/比較內容] 等臨床選項。
```

**範例：**
```markdown
> **摘要：** 攝護腺微創手術（MIST）是藥物與傳統手術之間的重要選項，UroLift® 透過機械拉開尿道、Rezūm 利用水蒸氣消融攝護腺組織，兩者在恢復時間與適應症上各有差異。
> 本文由泌尿科專科醫師周孟翰比較兩種微創手術的原理、優勢與限制，協助攝護腺肥大患者了解個人化治療方向。
```

> **注意：** 兩段文字應有所區別，避免完全相同。`excerpt` 偏向引言，blockquote 偏向技術摘要。

---

## 三、文章結構建議

### 標題階層
- `##`（h2）：主要章節，每個問題或主題一個
- `###`（h3）：細項說明，例如治療方式比較、步驟列表
- 避免跳過層級（不要從 h2 直接跳到 h4）

### E-E-A-T 強化技巧（AI 引擎會評分）
- **數字具體化**：「約 50% 的 50 歲男性有攝護腺肥大症狀」優於「很多男性」
- **條件式說明**：「若 IIEF-5 分數低於 21 分，建議就診評估」
- **建議就醫時機**：每篇文章至少一處明確說明「什麼情況下應該看醫師」
- **比較結構**：治療選項使用表格或條列式對比，方便 AI 引用

### 免責聲明（自動加入，無需手動撰寫）

> **已模組化：** 免責聲明由 `src/components/blog/Disclaimer.astro` 統一管理，並由 `src/pages/blog/[slug].astro` 在每篇文章 `<Content />` 之後自動插入。**請勿在 .mdx 內容中重複加入免責聲明。**

如需修改聲明文字，請直接編輯 `src/components/blog/Disclaimer.astro`，所有文章會一次更新。

---

## 四、圖片規範

| 項目 | 規範 |
|---|---|
| 存放路徑 | `src/assets/images/blog/文章slug名稱/` |
| 封面圖尺寸 | 建議 1200×630px（符合 OG 圖片比例） |
| alt 文字 | 中文描述圖片內容，包含關鍵字，例如「攝護腺肥大手術比較圖解」 |
| 檔名 | 使用中文或英文描述性命名，避免 `IMG_001.jpg` |

---

## 五、自動生效的 SEO 機制（無需額外操作）

新增文章後，以下功能會**自動**套用，不需要手動設定：

| 機制 | 說明 |
|---|---|
| `MedicalWebPage` JSON-LD | 自動從 frontmatter 生成，包含作者、發布日期、speakable |
| `BreadcrumbList` JSON-LD | 自動生成「首頁 > 衛教專欄 > 文章標題」結構 |
| `og:type = "article"` | 已在 Layout 設定，社群平台分享時正確辨識為文章 |
| `og:url` 使用 canonical URL | 確保社群平台抓到正確的網址 |
| Canonical URL | 每篇文章自動產生，避免重複內容問題 |
| Sitemap | 建置時自動加入，爬蟲可自動發現新文章 |
| Pagefind 全文索引 | 建置時自動建立站內搜尋索引 |

---

## 六、發布前 Checklistblo

```
□ title          已填寫，20–40 字，包含核心關鍵字
□ date           正確的發布日期（YYYY-MM-DD）
□ category       已選擇正確分類（至少一項）
□ tags           3–6 個關鍵字，逗號分隔
□ coverImage     已提供封面圖，並存放於正確路徑
□ excerpt        100–150 字，清楚說明文章主旨
□ seoTitle       30–60 字，含關鍵字與「周孟翰醫師」
□ seoDescription 120–160 字，包含病症、治療、品牌關鍵字
□ excerpt        frontmatter 已填寫（短、口語，自動顯示於文章頂部引言區）
□ 文章開頭       有 MDX blockquote 摘要（詳細、含醫學術語、提及醫師，供 speakable AI 引用）
□ 數字具體化     答案中有明確數字或條件說明
□ 建議就醫時機   至少一處說明何時應就診
□ 免責聲明       ✅ 由 Disclaimer.astro 自動插入，無需手動撰寫
□ 圖片 alt       所有圖片都有中文描述性 alt 文字
```

---

## 七、SEO Title 寫法參考

| 文章類型 | 建議格式 | 範例 |
|---|---|---|
| 疾病說明 | `[病症]：[核心問題]完整解析 \| 周孟翰醫師` | `攝護腺肥大：排尿阻塞與治療方式完整解析 \| 周孟翰醫師` |
| 治療比較 | `[治療A] vs [治療B]：[比較重點] \| 周孟翰醫師` | `UroLift vs Rezūm：微創手術如何選擇 \| 周孟翰醫師` |
| 症狀說明 | `[症狀]是什麼原因？[解決方向] \| 周孟翰醫師` | `頻尿夜尿是什麼原因？攝護腺肥大完整說明 \| 周孟翰醫師` |
| 預防衛教 | `[疾病]如何預防？[關鍵建議] \| 周孟翰醫師` | `HPV 感染如何預防？疫苗接種時機完整說明 \| 周孟翰醫師` |




建議 2：加入 <link rel="preload"> 給首圖
問題： Hero 區的醫師照片是 LCP（Largest Contentful Paint）元素，但沒有 preload 指示。

建議： 在 <head> 加入：


<link rel="preload" as="image" href={doctorProfile.src} />
建議 3：OG 圖片尺寸 meta 補充
問題： Open Graph 圖片未宣告尺寸，部分平台會重新下載圖片確認尺寸。

建議補充：


<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
建議 4：<link rel="sitemap"> 加入 <head>
雖然 robots.txt 已有 Sitemap 宣告，但在 <head> 內也加上有助於部分爬蟲發現：


<link rel="sitemap" href="/sitemap-index.xml" />