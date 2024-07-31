"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";

export function LoadMore({ onLoadMore }: { onLoadMore: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const entry = useIntersectionObserver(ref, {
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible) {
      onLoadMore();
    }
  }, [isVisible, onLoadMore]);

  return (
    <div ref={ref} className="flex justify-center py-4 w-full">
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
    </div>
  );
}
