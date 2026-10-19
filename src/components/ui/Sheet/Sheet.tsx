"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "./Sheet.module.css";

/**
 * Sheet: a panel that slides in from the edge (shadcn/ui pattern on Radix Dialog).
 * Radix handles the hard parts: focus is trapped inside while open and returned
 * afterwards, Escape closes it, the page behind is locked and hidden from screen readers.
 */
export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetTitle = Dialog.Title;
export const SheetDescription = Dialog.Description;

type ContentProps = React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
  /** Label for the built-in close button. */
  closeLabel?: string;
  /**
   * Close without the slide-out, e.g. when a link inside starts a page change, so the
   * sheet is gone before the page transition begins instead of sliding over it.
   */
  instantClose?: boolean;
};

export function SheetContent({ className, children, closeLabel = "Close", instantClose, ...props }: ContentProps) {
  const instant = instantClose ? "" : undefined;
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} data-instant={instant} />
      <Dialog.Content className={cn(styles.content, className)} data-instant={instant} {...props}>
        {children}
        <Dialog.Close className={styles.close} aria-label={closeLabel}>
          <X size={20} aria-hidden />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
