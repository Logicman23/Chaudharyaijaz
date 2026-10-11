"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders `children` only once the placeholder nears the viewport.
 * Third-party embeds (Facebook, X) each pull ~300–600 KB of JS; deferring them
 * keeps them off the critical path so the hero and LCP image load first.
 */
export function LazyMount({
  children,
  placeholder,
  rootMargin = "400px",
  className,
}: {
  children: ReactNode;
  placeholder: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : placeholder}
    </div>
  );
}
