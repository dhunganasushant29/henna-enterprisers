"use client";

import * as Primitive from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.css";

/**
 * The Radix part of <Tooltip>, loaded on first hover or focus. A small label shown on hover and on
 * keyboard focus, for icon-only buttons. Usage:
 * <Tooltip label="Back to top"><button aria-label="Back to top">…</button></Tooltip>
 */
export function RadixTooltip({
  label,
  side = "left",
  children,
}: {
  label: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactElement;
}) {
  return (
    <Primitive.Provider delayDuration={200} skipDelayDuration={300}>
      <Primitive.Root>
        <Primitive.Trigger asChild>{children}</Primitive.Trigger>
        <Primitive.Portal>
          <Primitive.Content side={side} sideOffset={10} className={styles.content}>
            {label}
            <Primitive.Arrow className={styles.arrow} width={10} height={5} />
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    </Primitive.Provider>
  );
}
