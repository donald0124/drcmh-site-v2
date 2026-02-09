import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, X } from 'lucide-react';

export default function SearchWidget() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // 記錄是否已經初始化過 Pagefind
  const isInitialized = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 監聽 isMobileOpen 的變化：只有當「第一次打開」時，才執行初始化
  useEffect(() => {
    if (isMobileOpen && !isInitialized.current) {
      // 使用 setTimeout 稍微延遲，確保 CSS 動畫 (visible) 已經讓元素出現在畫面上
      // 這樣 Pagefind 才能正確計算高度與寬度
      const timer = setTimeout(() => {
        initPagefind();
      }, 100); 

      return () => clearTimeout(timer);
    }
  }, [isMobileOpen]);

  const initPagefind = () => {
    // 再次檢查是否已經初始化，防止重複執行
    if (isInitialized.current) return;

    try {
      // 1. 確保程式庫已載入
      if (typeof window.PagefindUI === 'undefined') {
        console.warn("[SearchWidget] PagefindUI not loaded yet.");
        return;
      }

      // 2. 初始化手機版 (一定要先確認元素存在)
      const mobileEl = document.getElementById('mobile-search');
      if (mobileEl) {
        mobileEl.innerHTML = ''; // 清空舊內容
        new window.PagefindUI({
          element: "#mobile-search",
          showSubResults: true,
          showImages: false,
          resetStyles: false,
          translations: { placeholder: "輸入關鍵字搜尋..." }
        });
        // 標記為已完成，下次打開不用再初始化
        isInitialized.current = true;
        console.log("[SearchWidget] Mobile search initialized!");
      }

      // 3. 初始化桌機版 (順便處理，如果桌機版也在畫面上的話)
      const desktopEl = document.getElementById('desktop-search');
      if (desktopEl && desktopEl.innerHTML === '') {
        new window.PagefindUI({
          element: "#desktop-search",
          showSubResults: false,
          showImages: false,
          resetStyles: false,
          translations: { placeholder: "搜尋..." }
        });
      }

    } catch (e) {
      console.error("[SearchWidget] Init failed:", e);
    }
  };

  return (
    <>
      {/* 1. 桌機版 (Desktop) */}
      {/* 桌機版因為一直顯示，我們可以在 mount 後延遲載入，或是滑鼠移過去再載入 */}
      {/* 這裡為了簡單，我們讓它維持原樣，但加上 client:idle 讓它晚點載入 */}
      <div className="hidden lg:block relative z-50">
        <div className="w-64 transition-all duration-300">
          <div id="desktop-search"></div>
        </div>
      </div>

      {/* 2. 手機版 (Mobile) */}
      <div className="lg:hidden">
        {/* 觸發按鈕 */}
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`p-2 transition-colors rounded-full relative z-[60] ${
            isMobileOpen ? 'bg-gray-100 text-primary' : 'text-text hover:bg-gray-100'
          }`}
          aria-label="搜尋"
        >
          {isMobileOpen ? <X size={24} /> : <Search size={24} />}
        </button>

        {/* Portal 懸浮視窗 */}
        {mounted && createPortal(
          <div className={`fixed inset-0 z-[100] transition-all duration-300 ${
             isMobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}>
            
            {/* 遮罩 - 點擊關閉 */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
              onClick={() => setIsMobileOpen(false)}
            ></div>

            {/* 搜尋面板 */}
            <div 
              className={`absolute left-0 top-[80px] w-full bg-white shadow-lg border-t border-gray-100 overflow-hidden transition-transform duration-300 ease-in-out ${
                isMobileOpen ? 'translate-y-0' : '-translate-y-10'
              }`}
            >
              <div className="p-4 container mx-auto">
                {/* 重要：這裡加上 min-h-[60px] 
                  這是為了避免 Pagefind 還沒載入前，高度塌陷成 0，導致畫面看起來怪怪的
                */}
                <div id="mobile-search" className="custom-pagefind-mobile min-h-[60px]"></div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </>
  );
}