import React, { useEffect } from 'react';

export default function SearchWidget() {
  
  // 只負責初始化桌機版
  useEffect(() => {
    // 簡單檢查一下就好，因為桌機版環境很單純
    const initDesktop = () => {
      const desktopContainer = document.getElementById('desktop-search');
      if (window.PagefindUI && desktopContainer) {
        desktopContainer.innerHTML = '';
        new window.PagefindUI({
          element: "#desktop-search",
          showSubResults: false,
          showImages: false,
          resetStyles: false,
          translations: { placeholder: "搜尋..." }
        });
      }
    };

    // 稍微延遲一點點確保資源載入
    setTimeout(initDesktop, 200);
  }, []);

  return (
    /* 只保留桌機版 UI */
    <div className="hidden lg:block relative z-50">
      <div className="w-64 transition-all duration-300">
        <div id="desktop-search"></div>
      </div>
    </div>
  );
}