import type { ImageName } from "./images";

/**
 * Services. Each one gets its own page at /services/<slug>/.
 * Content is based on the company profile, written in plain language.
 */
export type Service = {
  slug: string;
  title: string;
  /** One line used in lists, cards and the menu. */
  short: string;
  /** Opening paragraph on the service page. */
  intro: string;
  /** Longer explanation, one string per paragraph. */
  body: string[];
  /** What the service covers. */
  includes: string[];
  /** How it works, in order. */
  steps: { title: string; body: string }[];
  /** Who this service is mainly for. */
  audience: "employers" | "job-seekers" | "both";
  seo: { title: string; description: string };
  /** Photo for the service page, its thumbnail in lists and its schema. */
  photo: { name: ImageName; alt: string; focus?: string };
};

export const services: Service[] = [
  {
    slug: "recruitment",
    title: "Recruitment",
    short: "We find and check the right workers for your job.",
    intro:
      "Tell us how many workers you need and for which jobs. We look for people all over Nepal, check each one, and send you a list of the best. You talk to them and choose who you want.",
    body: [
      "First, we learn about the job. We ask you what skills and experience the work needs, what the working conditions are, and what kind of person does well in your company.",
      "We have contacts all over Nepal, not only in the cities. So we can find many workers for many types of jobs at the same time, and still pick the right person for each job.",
    ],
    includes: [
      "Skilled, semi-skilled and general workers",
      "Many workers at once for big projects",
      "Each worker checked against your job needs",
      "A list of the best people, ready for interview",
      "Approval from the Department of Foreign Employment",
    ],
    steps: [
      { title: "Tell us what you need", body: "Send a demand letter with the jobs, number of workers, salary and benefits." },
      {
        title: "We find and check",
        body: "We look for workers, check their papers and experience, and remove people who do not fit.",
      },
      { title: "You interview", body: "You or someone from your company meets the workers, in Nepal or online." },
      { title: "We do the rest", body: "Medical check, visa, approval and travel, until your workers arrive." },
    ],
    audience: "employers",
    photo: {
      name: "interview-handshake",
      alt: "An employer and a new worker shaking hands across a desk after a job interview",
      focus: "60% 40%",
    },
    seo: {
      title: "Hire Nepali Workers for Gulf Companies",
      description:
        "Hire skilled, semi-skilled and general workers from Nepal. Henna Enterprises finds and checks workers for your job. Licensed agency in Kathmandu.",
    },
  },
  {
    slug: "skill-testing-and-certification",
    title: "Skill tests",
    short: "Workers show their skills before you hire them.",
    intro:
      "It is hard to hire someone you have never met. So we set up interviews and work tests, with your team or for you, and write down the results. Then you know what each person can do.",
    body: [
      "A CV does not tell you everything. A mason should lay bricks, a cook should cook and a driver should drive. In our tests, workers do real tasks so you can see their skills with your own eyes.",
      "If you cannot come to Nepal, we can run the tests for you in the way you want. We send you the results before you make your final choice.",
    ],
    includes: [
      "Work tests for each job",
      "Interviews face to face or online",
      "Tests run by you or by our team",
      "Clear results for every worker",
    ],
    steps: [
      { title: "Plan the test", body: "We agree with you what each worker must show." },
      { title: "Get ready", body: "We prepare the place, tools and materials." },
      { title: "Run the test", body: "Workers do the tasks while you or our team check their work." },
      { title: "Share results", body: "You get the results and choose your workers." },
    ],
    audience: "employers",
    photo: {
      name: "skill-inspection",
      alt: "A worker in a hard hat and safety vest checking steel rebar on a building site",
      focus: "50% 50%",
    },
    seo: {
      title: "Skill Tests for Nepali Workers",
      description:
        "Work tests and interviews for Nepali workers before you hire them. Run by your team or by Henna Enterprises for you.",
    },
  },
  {
    slug: "visa-and-ticketing",
    title: "Visa, ticket & travel",
    short: "We do the paperwork and send workers to you on time.",
    intro:
      "We take care of the medical check, the visa and the flight. Workers leave Nepal with all their papers ready, and you know the day they will arrive.",
    body: [
      "After you choose your workers, there is still work to do. They need a medical check at an approved clinic. Their papers must reach you for the visa. Their labour approval must be done in Nepal.",
      "We do each of these steps and keep you updated. When everything is ready, we book the flights and tell you the arrival date, so you can get ready for your new workers.",
    ],
    includes: [
      "Medical check at government-approved clinics",
      "Collecting passports and papers",
      "Visa work with the embassy",
      "Labour approval in Nepal",
      "Air tickets and travel plan",
    ],
    steps: [
      { title: "Medical check", body: "Chosen workers get a medical check at an approved clinic." },
      { title: "Papers to you", body: "We send passports, photos and certificates for the visa." },
      { title: "Approval in Nepal", body: "We get the labour approval for each worker." },
      { title: "Flights booked", body: "We book tickets and tell you the arrival date." },
    ],
    audience: "both",
    photo: {
      name: "airport-terminal",
      alt: "Travellers with luggage walking through a sunlit airport terminal",
      focus: "50% 60%",
    },
    seo: {
      title: "Visa & Air Tickets for Nepali Workers",
      description:
        "Medical check, visa, labour approval and air tickets for Nepali workers going abroad. Done from start to end by Henna Enterprises.",
    },
  },
  {
    slug: "hospitality-internships",
    title: "Hotel internships",
    short: "Hotel internships abroad for students and new graduates.",
    intro:
      "We place students and new graduates in hotel internships abroad. Before they go, we teach them about the work, the culture and the people they will meet, so they can settle in fast.",
    body: [
      "Our Managing Director worked in hotels across the Middle East before he started recruiting. So we know hotel work very well.",
      "Every hotel and every country is different. Interns who know what to expect learn faster and enjoy their time more. That is why we help them get ready before they travel.",
    ],
    includes: [
      "Front desk, kitchen and service jobs",
      "Placement with partner hotels",
      "Help to learn the culture before travel",
      "Support during the internship",
    ],
    steps: [
      { title: "Apply", body: "Tell us what you studied and what you want to do." },
      { title: "Match", body: "We find a hotel that suits you." },
      { title: "Get ready", body: "You learn about the job, the culture and the country." },
      { title: "Start", body: "We arrange your travel and stay in touch during your internship." },
    ],
    audience: "both",
    photo: { name: "hotel-reception", alt: "The reception desk and lobby of a modern hotel", focus: "50% 55%" },
    seo: {
      title: "Hotel Internships Abroad for Students",
      description:
        "Hotel internships abroad for Nepali students and new graduates, with training before travel. Arranged by Henna Enterprises.",
    },
  },
  {
    slug: "pre-departure-orientation",
    title: "Training before travel",
    short: "Every worker knows what to expect before they fly.",
    intro:
      "Before workers leave, we sit with each of them. We explain their contract, the company rules, and the laws and customs of the country they are going to. When workers know what to expect, there are fewer problems later.",
    body: [
      "Many problems abroad happen because people did not understand something: their pay, their working hours, their housing or the local rules. A clear and honest training stops most of these problems.",
      "We explain the contract in simple Nepali and answer every question. Every worker leaves knowing who to call if something goes wrong.",
    ],
    includes: [
      "Contract explained in simple Nepali",
      "Company rules",
      "Laws and customs of the country",
      "Who to call if something goes wrong",
    ],
    steps: [
      { title: "Contract", body: "We go through salary, working hours, food, housing and benefits." },
      { title: "Workplace", body: "We explain the company rules and what a normal day is like." },
      { title: "Country", body: "We explain local laws, customs and how to stay safe." },
      { title: "Help", body: "Every worker leaves with our phone number." },
    ],
    audience: "job-seekers",
    photo: {
      name: "training-briefing",
      alt: "A trainer explaining information to a group sitting around a table with laptops",
      focus: "30% 40%",
    },
    seo: {
      title: "Pre-Departure Training for Workers",
      description:
        "Before they fly, every Henna Enterprises worker learns about their contract, the company rules and the laws of the country they are going to.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
