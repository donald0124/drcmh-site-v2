import { useEffect, useRef, useState } from 'react';

const FB_PAGE_URL = 'https://www.facebook.com/61585915711402/';

function buildSrc(width) {
  return `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FB_PAGE_URL)}&tabs=timeline&width=${width}&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
}

export default function FacebookFeed() {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timer;
    const observer = new ResizeObserver(([entry]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // FB minimum is 180px
        setWidth(Math.max(180, Math.floor(entry.contentRect.width)));
      }, 150);
    });

    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {width !== null && (
        <iframe
          src={buildSrc(width)}
          width={width}
          height="600"
          style={{ border: 'none', overflow: 'hidden', display: 'block' }}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook 粉絲專頁動態"
        />
      )}
    </div>
  );
}
