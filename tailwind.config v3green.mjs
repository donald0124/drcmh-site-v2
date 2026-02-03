/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // 背景：極淡的暖灰白 (Warm Stone)，比冷死人的純白更有溫度，像高級紙張的質感
                bg: '#FAFAF9',           
                // 主色：深湖水綠 (Deep Teal)，沈穩、專業、讓人冷靜，很有「高級診所」的氛圍
                primary: '#0F766E',      
                // 點綴色：赤陶橘 (Terracotta)，綠色的對比色。
                // 用於「預約」、「通知」等需要注意的地方，非常清楚且不刺眼
                accent: '#EA580C',       
                // 文字：深岩灰 (Zinc)，現代 UI 常用的字色，乾淨俐落
                text: '#3F3F46',         
                // 高亮/裝飾：淺薄荷綠，用於卡片背景或次要區塊，讓畫面保持清爽
                highlight: '#F0FDFA',    
                // 表面：純白，用於卡片本體
                surface: '#FFFFFF',      
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