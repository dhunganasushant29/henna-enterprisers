/** Industries from the company profile, with typical roles for each. */
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarDays,
  ConciergeBell,
  FerrisWheel,
  HardHat,
  HeartPulse,
  Landmark,
  Laptop,
  Palmtree,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Truck,
} from "lucide-react";

export type Industry = { icon: LucideIcon; name: string; roles: string[] };

/** URL-friendly id for an industry, used as its anchor on the Industries page (#construction). */
export const industrySlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const industries: Industry[] = [
  { icon: HardHat, name: "Construction", roles: ["Mason", "Carpenter", "Steel fixer", "Helper"] },
  { icon: ConciergeBell, name: "Hotels & Restaurants", roles: ["Waiter", "Cook", "Room cleaner", "Barista"] },
  { icon: ShieldCheck, name: "Security", roles: ["Security guard", "Supervisor", "CCTV operator"] },
  { icon: Building2, name: "Cleaning & Maintenance", roles: ["Cleaner", "Technician", "Repair worker"] },
  { icon: Truck, name: "Transport & Warehouses", roles: ["Driver", "Warehouse helper", "Forklift driver"] },
  { icon: HeartPulse, name: "Healthcare", roles: ["Caregiver", "Nurse helper", "Hospital cleaner"] },
  { icon: ShoppingBag, name: "Shops & Supermarkets", roles: ["Sales staff", "Cashier", "Shelf helper"] },
  { icon: Palmtree, name: "Tourism", roles: ["Tour staff", "Resort staff", "Guest helper"] },
  { icon: Laptop, name: "IT & Office", roles: ["Computer support", "Data entry", "Office staff"] },
  { icon: Sprout, name: "Farming", roles: ["Farm worker", "Gardener", "Poultry worker"] },
  { icon: Landmark, name: "Government", roles: ["City workers", "Support staff"] },
  { icon: FerrisWheel, name: "Theme Parks", roles: ["Ride operator", "Park staff", "Food service"] },
  { icon: CalendarDays, name: "Events", roles: ["Event staff", "Guest helper", "Setup team"] },
];
