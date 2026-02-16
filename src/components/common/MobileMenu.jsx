import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Calendar } from 'lucide-react';

// 🟢 1. 修改這裡：接收 menuItems prop
const MobileMenu = ({ menuItems, socialLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 🟢 2. 設定預設選單 (Fallback)
  // 包含了最新的架構：最新消息、影音專區
  const items = menuItems || [
    { label: '關於醫師', href: '/#about' },
    { label: '最新消息', href: '/news' },
    { label: '主治專長', href: '/#expertise' },
    { label: '影音專區', href: '/video' },
    { label: '衛教專欄', href: '/blog' },
    { label: '門診資訊', href: '/#clinic' },
  ];

  // 確保只在客戶端渲染
  useEffect(() => {
    setMounted(true);
  }, []);

  // 鎖定背景捲動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* 漢堡按鈕 */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-primary hover:bg-black/5 rounded-full transition-colors"
        aria-label="開啟選單"
      >
        <Menu size={28} />
      </button>

      {/* 選單內容 (Portal) */}
      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-[9999] transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
        >
          {/* 黑色遮罩 */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* 側邊抽屜 (Drawer) */}
          <div
            className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#F9F8F6] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
              <span className="font-serif text-xl font-bold text-primary">Dr. Chou</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
                aria-label="關閉選單"
              >
                <X size={28} />
              </button>
            </div>

            {/* Body */}
            <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-4">
              {/* 🟢 3. 使用 items 進行渲染 */}
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xl font-serif font-medium text-text hover:text-primary hover:pl-2 transition-all border-b border-gray-100 pb-3 block"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* CTA Button */}
              <div className="mt-8">
                <a
                  href="/#clinic"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-accent transition-all active:scale-95"
                >
                  <Calendar size={20} />
                  立即預約掛號
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-6 mt-10">
                {socialLinks?.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-text shadow-sm border border-gray-100 transition-all active:scale-95 text-[#1877F2]"
                    title="Facebook"
                  >
                    <i className="fa-brands fa-facebook text-2xl"></i>
                  </a>
                )}
                {socialLinks?.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-text shadow-sm border border-gray-100 transition-all active:scale-95 text-[#E4405F]"
                    title="Instagram"
                  >
                    <i className="fa-brands fa-instagram text-2xl"></i>
                  </a>
                )}
                {socialLinks?.line && (
                  <a
                    href={socialLinks.line}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-text shadow-sm border border-gray-100 transition-all active:scale-95 text-[#00C300]"
                    title="LINE"
                  >
                    <i className="fa-brands fa-line text-2xl"></i>
                  </a>
                )}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 text-center text-xs text-gray-400 border-t border-gray-200 bg-gray-50">
              &copy; {new Date().getFullYear()} Dr. Chou Urology Clinic
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default MobileMenu;