"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/site";
import { DESTINATIONS, FOCUS, HOME, type Place } from "./places";
import styles from "./Globe.module.css";

/* ------------------------------------------------------------------
   Still, dotted globe centred on Nepal and the Gulf, drawn on a 2D
   canvas with an orthographic projection (no 3D library).

   The globe itself does not move, so the earth is rendered once into
   an offscreen canvas. Each frame only redraws the routes, pulses and
   markers on top of that cached image.
------------------------------------------------------------------- */

const RAD = Math.PI / 180;
/** Radius of the round frame as a share of the canvas. The canvas is larger than its box (see CSS). */
const RADIUS = 0.33;
/**
 * How far the earth is zoomed in inside the frame. Above 1 the sphere is larger than the
 * frame, so Nepal, the Gulf and India fill the view instead of a whole hemisphere.
 */
const ZOOM = 1.6;
/** How long the routes take to draw out after the globe appears. */
const REVEAL_MS = 2200;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

type Vec = [number, number, number];
const toVec = (lat: number, lon: number): Vec => [
  Math.cos(lat * RAD) * Math.sin(lon * RAD),
  Math.sin(lat * RAD),
  Math.cos(lat * RAD) * Math.cos(lon * RAD),
];

/** Great-circle interpolation between two unit vectors. */
function slerp(a: Vec, b: Vec, t: number): Vec {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return a;
  const s = Math.sin(omega);
  const k1 = Math.sin((1 - t) * omega) / s;
  const k2 = Math.sin(t * omega) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

// Fixed view: rotate the world so FOCUS faces the viewer.
const CL = Math.cos(FOCUS.lon * RAD);
const SL = Math.sin(FOCUS.lon * RAD);
const CT = Math.cos(FOCUS.lat * RAD);
const ST = Math.sin(FOCUS.lat * RAD);
function project(v: Vec) {
  const x1 = v[0] * CL - v[2] * SL;
  const z1 = v[0] * SL + v[2] * CL;
  return { x: x1, y: v[1] * CT - z1 * ST, z: v[1] * ST + z1 * CT };
}

const COLORS: Record<number, readonly [number, number, number]> = {
  0: [255, 255, 255], // land
  1: [255, 74, 85], // Nepal
  2: [255, 128, 136], // office countries
  3: [255, 196, 196], // client countries
};

/** Each label's preferred side of its marker; if that spot is taken, the next free side is used. */
const LABEL_SIDE: Record<string, "above" | "left" | "right"> = {
  Kathmandu: "above",
  Kuwait: "above",
  "Al Jubail": "left",
  Makkah: "left",
  Sharjah: "right",
  Mumbai: "right",
};

export function Globe({ label }: { label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font = getComputedStyle(document.body).fontFamily;

    const home = toVec(HOME.lat, HOME.lon);
    const routes = DESTINATIONS.map((d) => {
      const to = toVec(d.lat, d.lon);
      const lift = 0.07 + 0.32 * Math.acos(home[0] * to[0] + home[1] * to[1] + home[2] * to[2]); // longer routes fly higher
      const samples: Vec[] = [];
      for (let i = 0; i <= 64; i++) {
        const t = i / 64;
        const v = slerp(home, to, t);
        const h = 1 + lift * Math.sin(Math.PI * t);
        samples.push([v[0] * h, v[1] * h, v[2] * h]);
      }
      return { place: d, to, samples };
    });

    let points: Int16Array | null = null;
    let earth: HTMLCanvasElement | null = null; // cached globe image
    let size = 0;
    let dpr = 1;
    let revealStart = 0;

    /** Draws the sphere and land dots once into an offscreen canvas. */
    function renderEarth() {
      if (!points || !size) return;
      const W = Math.round(size * dpr);
      earth = document.createElement("canvas");
      earth.width = W;
      earth.height = W;
      const e = earth.getContext("2d")!;
      const c = W / 2;
      const R = W * RADIUS;

      const glow = e.createRadialGradient(c, c, R * 0.9, c, c, R * 1.18);
      glow.addColorStop(0, "rgba(200,32,43,0.22)");
      glow.addColorStop(1, "rgba(200,32,43,0)");
      e.fillStyle = glow;
      e.beginPath();
      e.arc(c, c, R * 1.18, 0, Math.PI * 2);
      e.fill();

      const body = e.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      body.addColorStop(0, "#222733");
      body.addColorStop(1, "#13161d");
      e.fillStyle = body;
      e.beginPath();
      e.arc(c, c, R, 0, Math.PI * 2);
      e.fill();

      // The zoomed earth is drawn inside the round frame only
      e.save();
      e.beginPath();
      e.arc(c, c, R, 0, Math.PI * 2);
      e.clip();
      const RG = R * ZOOM;

      // Dot size follows the globe, but never drops below ~0.6 CSS px, so small
      // (phone-sized) globes still show the highlighted countries clearly.
      const dot = Math.max(0.6 * dpr, (RG / 300) * 1.05);
      for (let i = 0; i < points.length; i += 3) {
        const p = project(toVec(points[i] / 100, points[i + 1] / 100));
        if (p.z <= 0.02) continue;
        const f = points[i + 2];
        const col = COLORS[f] ?? COLORS[0];
        const a = f ? 0.6 + 0.4 * p.z : 0.1 + 0.42 * p.z;
        e.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${a.toFixed(3)})`;
        const r = f === 1 ? dot * 1.75 : f === 2 ? dot * 1.45 : f ? dot * 1.3 : dot;
        e.fillRect(c + p.x * RG - r, c - p.y * RG - r, r * 2, r * 2);
      }

      // Shade toward the rim so the zoomed view still reads as a curved globe
      const shade = e.createRadialGradient(c, c, R * 0.62, c, c, R);
      shade.addColorStop(0, "rgba(14,16,22,0)");
      shade.addColorStop(1, "rgba(14,16,22,0.78)");
      e.fillStyle = shade;
      e.fillRect(c - R, c - R, R * 2, R * 2);
      e.restore();

      e.strokeStyle = "rgba(255,255,255,0.08)";
      e.lineWidth = dpr;
      e.beginPath();
      e.arc(c, c, R, 0, Math.PI * 2);
      e.stroke();
    }

    function draw(now: number) {
      if (!ctx || !earth) return;
      const W = canvas!.width;
      const c = W / 2;
      const frame = W * RADIUS;
      const R = frame * ZOOM; // projected positions use the zoomed earth
      ctx.clearRect(0, 0, W, W);
      ctx.drawImage(earth, 0, 0);
      ctx.save();
      ctx.beginPath();
      ctx.arc(c, c, frame, 0, Math.PI * 2);
      ctx.clip();

      const reveal = reduceMotion ? 1 : clamp01((now - revealStart) / REVEAL_MS);

      // Routes draw out one after another, then stay
      routes.forEach((route, idx) => {
        const office = route.place.kind === "office";
        const grow = ease(clamp01((reveal - idx * 0.12) / 0.5));
        if (grow <= 0) return;
        ctx.lineWidth = (office ? 2.2 : 1.5) * dpr;
        ctx.setLineDash(office ? [] : [4 * dpr, 5 * dpr]);
        ctx.strokeStyle = office ? "rgba(255,92,102,0.95)" : "rgba(255,170,175,0.75)";
        ctx.beginPath();
        const last = Math.floor(grow * (route.samples.length - 1));
        for (let i = 0; i <= last; i++) {
          const p = project(route.samples[i]);
          const x = c + p.x * R;
          const y = c - p.y * R;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // A light pulse travelling from Kathmandu along each office route
        if (office && grow >= 1 && !reduceMotion) {
          const t = (now / 1800 + idx * 0.33) % 1;
          const p = project(route.samples[Math.floor(t * (route.samples.length - 1))]);
          const x = c + p.x * R;
          const y = c - p.y * R;
          const g = ctx.createRadialGradient(x, y, 0, x, y, 7 * dpr);
          g.addColorStop(0, "rgba(255,255,255,0.95)");
          g.addColorStop(1, "rgba(255,74,85,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 7 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore(); // routes stay inside the frame; markers and labels may sit over its edge

      // Markers and labels. Both scale with the globe (k), so on a phone-sized globe the
      // name tags do not swamp the small Gulf region; labels that would overlap are skipped.
      const k = Math.min(1, Math.max(0.7, size / 620));
      const labelAlpha = reduceMotion ? 1 : clamp01((reveal - 0.35) / 0.4);
      const pulse = reduceMotion ? 0.5 : (now % 2200) / 2200;
      const placed: { x: number; y: number; w: number; h: number }[] = [];
      const overlaps = (r: { x: number; y: number; w: number; h: number }) =>
        r.x < 0 ||
        r.y < 0 ||
        r.x + r.w > W ||
        r.y + r.h > W ||
        placed.some(
          (o) => r.x < o.x + o.w + 3 * dpr && r.x + r.w + 3 * dpr > o.x && r.y < o.y + o.h + 3 * dpr && r.y + r.h + 3 * dpr > o.y,
        );

      const marker = (place: Place, v: Vec) => {
        const p = project(v);
        const x = c + p.x * R;
        const y = c - p.y * R;
        const isHome = place.kind === "home";
        const color = place.kind === "client" ? "255,230,230" : "255,74,85";
        const m = dpr * k;

        ctx.fillStyle = `rgba(${color},${(1 - pulse) * 0.45})`;
        ctx.beginPath();
        ctx.arc(x, y, (isHome ? 6 : 4) * m + pulse * 12 * m, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isHome ? "#fff" : `rgb(${color})`;
        ctx.strokeStyle = isHome ? "#ff4a55" : "#12141a";
        ctx.lineWidth = (isHome ? 3 : 2) * m;
        ctx.beginPath();
        ctx.arc(x, y, (isHome ? 5 : 3.5) * m, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        return { x, y, isHome, box: { x: x - 6 * m, y: y - 6 * m, w: 12 * m, h: 12 * m } };
      };

      const label = (place: Place, at: { x: number; y: number; isHome: boolean }) => {
        const a = at.isHome ? 1 : labelAlpha;
        if (a <= 0.01) return;
        const text = at.isHome ? `${place.name} · Head office` : place.name;
        const fontPx = Math.max(10, 11.5 * k) * dpr;
        ctx.font = `600 ${fontPx}px ${font}`;
        const tw = ctx.measureText(text).width;
        const padX = 7 * dpr * k + 1 * dpr;
        const h = fontPx + 10 * dpr * k;
        const w = tw + padX * 2;
        const gap = 10 * dpr * k;
        const spots = {
          above: { x: at.x - w / 2, y: at.y - h - gap },
          below: { x: at.x - w / 2, y: at.y + gap },
          left: { x: at.x - w - gap, y: at.y - h / 2 },
          right: { x: at.x + gap, y: at.y - h / 2 },
          aboveLeft: { x: at.x - w - gap * 0.4, y: at.y - h - gap * 0.4 },
          belowLeft: { x: at.x - w - gap * 0.4, y: at.y + gap * 0.4 },
          aboveRight: { x: at.x + gap * 0.4, y: at.y - h - gap * 0.4 },
          belowRight: { x: at.x + gap * 0.4, y: at.y + gap * 0.4 },
        };
        const preferred = LABEL_SIDE[place.name] ?? "right";
        const order = [
          preferred,
          "right",
          "left",
          "above",
          "below",
          "belowLeft",
          "aboveLeft",
          "belowRight",
          "aboveRight",
        ] as const;
        const spot = order.map((side) => ({ ...spots[side], w, h })).find((r) => !overlaps(r));
        if (!spot) return; // no room: the marker and route still show
        placed.push(spot);
        ctx.globalAlpha = a;
        ctx.fillStyle = at.isHome ? "rgba(200,32,43,0.95)" : "rgba(18,20,26,0.85)";
        ctx.strokeStyle = at.isHome ? "rgba(255,138,143,0.6)" : "rgba(255,255,255,0.14)";
        ctx.lineWidth = dpr;
        ctx.beginPath();
        ctx.roundRect(spot.x, spot.y, w, h, 3 * dpr);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.textBaseline = "middle";
        ctx.fillText(text, spot.x + padX, spot.y + h / 2 + 0.5 * dpr);
        ctx.globalAlpha = 1;
      };

      // Draw every marker first, then labels by importance. Office labels only have to
      // avoid the head office and office pins; client pins and labels fit in around them.
      const homeAt = marker(HOME, home);
      const spots = routes.map((r) => ({ place: r.place, at: marker(r.place, r.to) }));
      const offices = spots.filter((s) => s.place.kind === "office");
      const clients = spots.filter((s) => s.place.kind !== "office");
      placed.push(homeAt.box, ...offices.map((s) => s.at.box));
      label(HOME, homeAt);
      offices.forEach((s) => label(s.place, s.at));
      placed.push(...clients.map((s) => s.at.box));
      clients.forEach((s) => label(s.place, s.at));
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      renderEarth();
      draw(performance.now()); // resizing clears the canvas, so repaint straight away
    };

    // ---- animation loop: only the routes, pulses and markers move ----
    let raf = 0;
    let running = false;
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduceMotion || !earth) return;
      running = true;
      if (!revealStart) revealStart = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    const onVisibility = () => (document.hidden ? stop() : visible && start());
    const ro = new ResizeObserver(resize);

    // Wait until the page has loaded and the browser is idle, so the globe
    // never competes with the headline and first paint.
    let cancelled = false;
    const whenIdle = () =>
      new Promise<void>((resolve) => {
        const idle = () =>
          "requestIdleCallback" in window
            ? window.requestIdleCallback(() => resolve(), { timeout: 2500 })
            : setTimeout(resolve, 600);
        if (document.readyState === "complete") idle();
        else window.addEventListener("load", idle, { once: true });
      });

    whenIdle()
      .then(() => (cancelled ? Promise.reject(new Error("unmounted")) : fetch(asset("/globe/points.bin"))))
      .then((r) => r.arrayBuffer())
      .then((buf) => {
        if (cancelled) return;
        points = new Int16Array(buf);
        wrap.dataset.ready = "true";
        resize();
        if (visible && !document.hidden) start();
      })
      .catch(() => {
        /* The poster stays visible if the data cannot load. */
      });

    ro.observe(wrap);
    io.observe(wrap);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap} role="img" aria-label={label}>
      <div aria-hidden className={styles.poster} />
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
    </div>
  );
}
