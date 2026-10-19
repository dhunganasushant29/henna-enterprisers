"use client";

import { useEffect, useState } from "react";
import type { RadixTooltip as RadixTooltipType } from "./RadixTooltip";

type Props = {
  label: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactElement;
};

/**
 * Tooltip (shadcn/ui pattern on Radix Tooltip): a small label on hover and keyboard focus,
 * for icon-only buttons. The trigger must still have its own aria-label.
 * <Tooltip label="Back to top"><button aria-label="Back to top">…</button></Tooltip>
 *
 * Radix (with its positioning engine) is kept out of the first page load: it is fetched
 * once the browser is idle after loading. Until then the button works normally, just
 * without the label. Loading it on hover instead would swap the button mid-click.
 */
export function Tooltip({ label, side = "left", children }: Props) {
  const [Radix, setRadix] = useState<typeof RadixTooltipType | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      import("./RadixTooltip").then((m) => {
        if (!cancelled) setRadix(() => m.RadixTooltip);
      });
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => void load(), { timeout: 4000 });
    return () => {
      cancelled = true;
      cancelIdle(id);
    };
  }, []);

  return Radix ? (
    <Radix label={label} side={side}>
      {children}
    </Radix>
  ) : (
    children
  );
}
