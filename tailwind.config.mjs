/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				bg: '#F9F8F6',           // 溫暖米白
				primary: '#2C3E50',      // 鐵灰深藍
				accent: '#C5A065',       // 質感金棕
				text: '#64748B',         // 柔和岩灰
				highlight: '#F0EBE3',    // 淺卡其
				surface: '#FFFFFF',      // 純白
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