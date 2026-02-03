/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // 背景：極淡的冷灰藍，能突顯卡片的白，比純白背景更有層次
                bg: '#F0F4F8',           

                // 主色：AlleyPin 風格的醫學藍，沈穩且專業 (用於按鈕、主要 Icon)
                primary: '#2A8BC8',      

                // 點綴色 (修正後的黃)：改為「琥珀金」，對比度高，看得清楚且有質感
                accent: '#D99A46',       

                // 文字：深岩灰，閱讀舒適，比純黑更有質感
                text: '#334155',         

                // 表面：卡片或區塊的純白背景
                surface: '#FFFFFF',      

                // 裝飾/背景色：
                // 1. 淺藍背景 (用於參考圖中藍色水彩底圖)
                'highlight-blue': '#E0F2FE',
                
                // 2. 淺金背景 (用於參考圖中黃色水彩底圖，僅作底色，不寫字)
                'highlight-gold': '#FFFBEB',
            },
            fontFamily: {
                serif: ['"Noto Serif TC"', 'serif'], 
                sans: ['"Noto Sans TC"', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '1.5rem',
                screens: {
                    '2xl': '1280px',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};