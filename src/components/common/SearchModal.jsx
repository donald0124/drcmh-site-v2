import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, X } from 'lucide-react';

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // 當 Modal 開啟時，初始化 Pagefind UI
      setTimeout(() => {
        try {
          if (window.PagefindUI) {
            const container = document.getElementById('search-container');
            if (container) container.innerHTML = '';

            new window.PagefindUI({
              element: "#search-container",
              showSubResults: true,
              showImages: false,
              translations: {
                placeholder: "搜尋衛教文章、最新消息...",
                clear_search: "清除",
                load_more: "載入更多結果",
                search_label: "站內搜尋",
                filters_label: "篩選",
                zero_results: "沒有找到關於 [SEARCH_TERM] 的結果",
                many_results: "找到 [COUNT] 筆關於 [SEARCH_TERM] 的結果",
                one_result: "找到 [COUNT] 筆關於 [SEARCH_TERM] 的結果",
              }
            });
          }
        } catch (e) {
          console.error("Pagefind init failed:", e);
        }
      }, 100);

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* 搜尋框容器 - 手機版改為幾乎滿版浮動視窗 */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20 flex flex-col max-h-[90vh] h-[85vh] sm:h-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80 sticky top-0 z-10 shrink-0">
          <h3 className="font-serif font-bold text-lg text-primary flex items-center gap-2">
            <Search size={18} />
            站內搜尋
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-gray-400 hover:text-text transition-colors rounded-full hover:bg-gray-200"
            aria-label="關閉搜尋"
          >
            <X size={24} />
          </button>
        </div>

        {/* Pagefind UI 掛載點 */}
        <div className="p-6 overflow-y-auto custom-scrollbar bg-white flex-1">
          <div id="search-container"></div>
        </div>

      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-text hover:text-primary transition-colors rounded-full hover:bg-gray-100 flex-shrink-0"
        aria-label="開啟搜尋"
      >
        <Search size={20} />
      </button>

      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
}
