"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-WXH6D3K8XH", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
