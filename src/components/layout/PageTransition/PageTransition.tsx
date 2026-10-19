"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

/**
 * Animates page changes only. Keyed by the URL, so on navigation the old page plays its
 * exit animation and the new one its enter animation. Everything else (first load, reload,
 * lazy parts of a page arriving) is `default="none"`, so the page never fades twice.
 * The animation classes come from the root layout's CSS module (they must sit on <html>).
 */
export function PageTransition({ enter, exit, children }: { enter: string; exit: string; children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter={enter} exit={exit} default="none">
      {children}
    </ViewTransition>
  );
}
