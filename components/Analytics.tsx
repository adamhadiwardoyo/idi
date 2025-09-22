"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", "G-WXH6D3K8XH", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
