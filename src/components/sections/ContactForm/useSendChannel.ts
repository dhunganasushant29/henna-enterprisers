"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Channel = "email" | "whatsapp";

const KEY = "henna-contact-channel";
const EVENT = "henna-contact-channel-change";

/** In-memory copy, used when the browser blocks storage (e.g. some private modes). */
let memory: Channel | null = null;

/** Saved choice first; otherwise WhatsApp on touch phones and email on computers. */
function read(): Channel {
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "email" || saved === "whatsapp") return saved;
  } catch {
    /* storage can be blocked; fall back to memory or the device default */
  }
  if (memory) return memory;
  return window.matchMedia("(pointer: coarse)").matches ? "whatsapp" : "email";
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * How the visitor prefers to send the form. Kept outside React state so the static HTML
 * (always "email") hydrates cleanly and the device default / saved choice applies right after.
 */
export function useSendChannel() {
  const channel = useSyncExternalStore<Channel>(subscribe, read, () => "email");
  const setChannel = useCallback((next: Channel) => {
    memory = next;
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* ignore: the in-memory copy keeps the choice for this visit */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [channel, setChannel] as const;
}
