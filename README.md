# Henna Enterprises website

Static, SEO-ready marketing site for Henna Enterprises Manpower Consultants Pvt. Ltd.
Next.js 16 (App Router, static export) · TypeScript · CSS Modules (no global CSS, no Tailwind).

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # static site in ./out (upload this folder to any host)
npm run check    # types + lint + formatting
npm run format   # auto-format with Prettier
npm run images   # rebuild responsive photos + blur placeholders from assets/photos
npm run map      # rebuild the dotted region map
```

## Folder structure

Every component lives in its own folder: `Name/Name.tsx`, `Name/Name.module.css` and `Name/index.ts`
(plus any helpers it alone uses). Every page has its own `page.module.css` next to `page.tsx`.

```
assets/photos/            Original photos (source for `npm run images`)
public/                   Static files: brand logos, client logos, generated images, map
scripts/                  Build-time generators (images, logos, map, dark logo)
src/
  app/                    Routes. Each page: page.tsx + page.module.css
    page.tsx, about/, services/, services/[slug]/, industries/, employers/, job-seekers/, contact/, not-found.tsx
    layout.tsx            Fonts, metadata, header/footer, page transition, Organization schema
    layout.module.css     Design tokens + reset (scoped to <html> as .root) and page-transition styles
    sitemap.ts robots.ts manifest.ts opengraph-image.png
  components/
    ui/                   Small building blocks: ButtonLink Label Section SectionHeader TextLink Halftone Stars Photo
                          CountUp JsonLd WhatsAppIcon, and shadcn-style Radix primitives: Sheet, Tooltip
    layout/               Site chrome: Header (+ MobileMenu), Footer (+ OfficeTime), Logo, MobileActionBar,
                          BackToTop, PageTransition
    sections/             Blocks reused across pages: PageHero HeroCard BoardingPass CtaBand ContactForm Faq FactsRow
                          Globe RouteMap LogoMarquee MapEmbed OfficeList ProcessJourney ProcessSteps ServiceIndex ...
    home/                 Home-only sections: HomeHero AudienceSplit ServiceExplorer StartJourney MdMessage
  data/                   Content, one file per topic + generated images.ts and map.ts
  lib/                    site.ts (business facts), seo.ts, image-loader.ts, cn.ts
  styles/                 Shared CSS modules for `composes`: text, layout, motion
```

## Styling conventions

- **No global stylesheet.** Every page and component imports its own `*.module.css`, so class names are scoped and each page only loads the CSS it uses.
- **Design tokens** (colours, radius, shadows, fonts) are CSS variables on the `.root` class in `src/app/layout.module.css`, which sits on `<html>`. The reset and base text styles are there too, inside `@layer base`, so any component class always wins over them.
- **Shared styles** are reused with `composes`, not copied: type styles from `@/styles/text.module.css` (`display`, `h1`–`h3`, `lead`, `label`, `caption`, `underline`, `srOnly`), `container` and `deferRender` from `@/styles/layout.module.css`, and the scroll `reveal` from `@/styles/motion.module.css`. For example, `.title { composes: h2 from "@/styles/text.module.css"; margin-top: 1rem; }`.
- **Icons** are lucide (the icon set shadcn/ui uses). They get their size from the `size` prop and their colour from a module class.
- **shadcn/ui pattern without Tailwind.** `Sheet` (Radix Dialog) and `Tooltip` (Radix Tooltip) are owned in `components/ui` like shadcn components, but styled with CSS modules and animated from Radix's `data-state` / `data-side` attributes. Add new primitives the same way.
- **Animate only `transform` and `opacity`** so motion stays on the GPU, and wrap motion in `@media (prefers-reduced-motion: no-preference)`. Avoid `backdrop-filter` on fixed or sticky bars (it is redrawn on every scroll frame).
- **CSS module names inside view-transition selectors are renamed**, so the page transition uses a class (`styles.pageChange`) passed to React's `<ViewTransition>`, not a fixed name.

## Motion and smoothness

- **Scrolling** is the browser's own (no scroll-hijacking library); anchor links and back-to-top use CSS `scroll-behavior: smooth`, off for reduced motion.
- **Page transitions:** React `<ViewTransition>` (`components/layout/PageTransition`), keyed by URL so only real page changes animate: the old page fades out, the new one fades up; header and footer stay still.
- **Scroll reveals and progress effects** are CSS scroll-driven animations, no JavaScript.
- **Floating buttons and header shadow** use one IntersectionObserver each on an invisible marker, never a scroll listener.

## Performance

- Fully static HTML; small client islands only (header, menu, floating buttons, clocks, count-up, form).
- Mobile menu, tooltips and the EmailJS SDK are code-split and downloaded only when needed.
- Photos: responsive WebP sizes, blurred placeholders, native lazy loading, fixed dimensions (no layout shift).
- Client logos are pre-made grey files (no CSS filter on the moving marquee).
- Off-screen sections use `content-visibility: auto`.

## Deploying (GitHub Pages)

Every push to `main` builds the site and publishes it with GitHub Actions (`.github/workflows/deploy.yml`):
**https://dhunganasushant29.github.io/henna-enterprisers/**

- The site lives in a sub-folder there, so the workflow builds with `NEXT_PUBLIC_BASE_PATH=/henna-enterprisers`
  and `NEXT_PUBLIC_SITE_URL=https://dhunganasushant29.github.io/henna-enterprisers`. Files in `public/` are referenced
  through `asset()` and full URLs through `absoluteUrl()` from `src/lib/site.ts`, so they follow these settings.
- Contact form keys go in **Settings → Secrets and variables → Actions** as `NEXT_PUBLIC_EMAILJS_SERVICE_ID`,
  `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.
- **Custom domain later:** in the workflow set `NEXT_PUBLIC_BASE_PATH` to `""` and `NEXT_PUBLIC_SITE_URL` to the domain,
  then add the domain under **Settings → Pages**.
- Locally, `npm run build` without those variables builds for a domain root.

## Editing content

| What                                                       | File                                                |
| ---------------------------------------------------------- | --------------------------------------------------- |
| Phone, email, addresses, licence                           | `src/lib/site.ts`                                   |
| Services / industries / steps / documents / clients / FAQs | `src/data/*.ts`                                     |
| Page title and description                                 | `metadata` at the top of each `src/app/**/page.tsx` |

## Contact form (EmailJS)

The form on the Contact page lets visitors choose how to send their message:

- **Email:** sent to your Gmail through [EmailJS](https://www.emailjs.com). No server is needed.
- **WhatsApp:** opens WhatsApp with the message already written to the Managing Director's number.

Phones start on WhatsApp and computers on Email; the site remembers each visitor's choice. If an email fails, the form offers to send it on WhatsApp instead.

After adding or changing keys in `.env.local`, restart `npm run dev` (or run `npm run build` again).

1. **Email Services** → _Add New Service_ → **Gmail** → connect the Gmail account that should receive messages. Copy the **Service ID**.
2. **Email Templates** → _Create New Template_:
   - **To Email:** your Gmail address
   - **Subject:** `{{subject}}`
   - **Reply To:** `{{reply_to}}`
   - **Content:**

     ```
     New message from the website

     I want to: {{purpose}}
     Name: {{name}}
     Phone: {{phone}}
     Email: {{email}}
     Company: {{company}}
     Workers needed: {{workers}}
     Their work: {{work}}
     Country: {{country}}

     Message:
     {{message}}
     ```

   Save and copy the **Template ID**.

3. **Account → General** → copy the **Public Key**.
4. Create `.env.local` in the project folder (copy `.env.example`) and fill in the three values, then run `npm run build`.
5. In **Account → Security**, add your website domain to the allowed list so others cannot use your keys.

If the keys are missing, the form shows "Sorry, the message did not send" and logs the reason in the browser console.

## Before going live

- Confirm office hours (only "opens 10 AM" is known) in `src/lib/site.ts`.
- Confirm the WhatsApp number (currently the MD's mobile).
- Submit `https://www.hennaconsultants.com/sitemap.xml` in Google Search Console.
