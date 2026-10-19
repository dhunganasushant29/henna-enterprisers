/** The official recruitment procedure and the paperwork employers provide. */
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  FileSignature,
  FileText,
  Handshake,
  Plane,
  ScrollText,
  Stamp,
  Stethoscope,
  UserCheck,
  Wrench,
} from "lucide-react";

/** Who carries out a step, from the employer's point of view. */
export type StepOwner = "you" | "henna" | "together";

export type Step = { icon: LucideIcon; title: string; body: string; owner?: StepOwner };

export const hiringSteps: Step[] = [
  {
    icon: FileText,
    title: "You send a demand letter",
    owner: "you",
    body: "Tell us the jobs, how many workers you need, the salary and the benefits. We check it and get approval from the Department of Foreign Employment.",
  },
  {
    icon: UserCheck,
    title: "We find the best workers",
    owner: "henna",
    body: "Our team checks every worker against your needs and calls the best ones for a final interview.",
  },
  {
    icon: Wrench,
    title: "Interview & skill test",
    owner: "together",
    body: "You or someone from your company talks to the workers. If needed, they also do a work test. Then you choose who you want.",
  },
  {
    icon: Stethoscope,
    title: "Medical check",
    owner: "henna",
    body: "Chosen workers get a full medical check at a government-approved clinic. Only healthy workers go forward.",
  },
  {
    icon: Stamp,
    title: "Papers & visa",
    owner: "together",
    body: "We send passports, photos, medical reports and certificates to you for the visa. Then we get the labour approval in Nepal.",
  },
  {
    icon: Plane,
    title: "Training & travel",
    owner: "henna",
    body: "Workers learn about their contract and your country's rules. We book the tickets and tell you the arrival date.",
  },
];

export const employerDocuments: Step[] = [
  {
    icon: FileText,
    title: "Demand Letter",
    body: "How many workers you need for each job, the monthly salary, how long the contract is, working hours, food, housing, medical insurance, air ticket and other benefits.",
  },
  {
    icon: ScrollText,
    title: "Power of Attorney",
    body: "Gives us permission to hire for you in Nepal. We can then set up interviews and work tests, sign the needed papers, and arrange visas and travel.",
  },
  {
    icon: BadgeCheck,
    title: "Letter of Guarantee",
    body: "A letter to the Department of Labour, Nepal. It promises that you will give the salary and benefits written in the demand letter, in the country written in it.",
  },
  {
    icon: FileSignature,
    title: "Employment Contract",
    body: "A sample job contract, made in the format given by the Nepal Embassy in your country.",
  },
  {
    icon: Handshake,
    title: "Agreement with Henna",
    body: "A simple agreement between your company and Henna Enterprises about how we will work together.",
  },
];
