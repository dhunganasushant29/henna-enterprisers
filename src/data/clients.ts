/** Client companies from the company profile. `file` points to /public/clients/<file>.webp. */
export type Client = { name: string; file?: string; w?: number; h?: number };

export const clients: Client[] = [
  { name: "Marriott Jabal Omar Makkah", file: "marriott-jabal-omar", w: 145, h: 116 },
  { name: "Hyatt Regency", file: "hyatt-regency", w: 111, h: 122 },
  { name: "Mövenpick Hotels & Resorts", file: "movenpick", w: 145, h: 61 },
  { name: "Kuwait Oil Company", file: "kuwait-oil-company", w: 131, h: 160 },
  { name: "BESIX Group", file: "besix-group", w: 264, h: 64 },
  { name: "Watania Steel", file: "watania-steel", w: 177, h: 49 },
  { name: "Jaddarah Workforce Services", file: "jaddarah", w: 156, h: 127 },
  { name: "Al Bawani", file: "al-bawani", w: 108, h: 128 },
  { name: "Asia Prime General Contracting", file: "asia-prime-contracting", w: 213, h: 80 },
  { name: "3C Metal", file: "3c-metal", w: 194, h: 85 },
  { name: "EFS Facilities Services", file: "efs-facilities-services", w: 160, h: 62 },
  { name: "Stallion HR Solutions", file: "stallion-hr-solutions", w: 251, h: 63 },
  { name: "Egy Build Construction", file: "egy-build", w: 235, h: 79 },
  { name: "Safari", file: "safari", w: 148, h: 76 },
  { name: "Al Awtan Contracting", file: "al-awtan-contracting", w: 239, h: 69 },
  { name: "Tamkeen Recruitment", file: "tamkeen-recruitment", w: 134, h: 121 },
  { name: "Top Star Security", file: "top-star-security", w: 247, h: 110 },
  { name: "Saeed Raddad Group", file: "saeed-raddad-group", w: 201, h: 102 },
  { name: "Saudi Binladin Group" },
  { name: "Radisson Hotels" },
];
