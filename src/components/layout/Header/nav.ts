import { services } from "@/data";
import { nav } from "@/lib/site";

export const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href) || pathname === href.replace(/\/$/, "");

export const serviceLinks = services.map((s) => ({ href: `/services/${s.slug}/`, label: s.title, short: s.short }));

export const mobileNav = [{ href: "/", label: "Home" }, ...nav, { href: "/contact/", label: "Contact" }];
