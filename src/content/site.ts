// Site-wide copy. Edit freely — every page reads from here.
// The six services (one per face of the cube) live in ./services.ts.

export const site = {
  name: "Dcube",
  /** The person behind the studio. */
  owner: {
    name: "Ramon Bugariu",
    role: "Web Designer & Web Developer",
  },
  /** Public URL (social previews, canonical links). NEXT_PUBLIC_SITE_URL overrides it, e.g. for a custom domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dcubev1.ramonbugariu.workers.dev",
  /** Default meta description. */
  tagline:
    "Dcube is the studio of Ramon Bugariu — web design, branding and marketing, every face of your brand from one idea.",
  year: 2026,

  hero: {
    headline: "Every face of your brand.",
    text: "Websites, identities and campaigns — designed as one, by one studio.",
    primary: "Get in touch",
    secondary: "See the work",
  },
  work: {
    headline: "Selected work.",
    text: "Identities and online shops, from the first sketch to the last pixel.",
  },
  services: {
    headline: "Six faces. One cube.",
    text: "Web, branding and marketing — three axes, two faces each. Most brands need several of them; they work best when they come from one idea.",
  },
  /** Eyebrow + statement of the About section, in Ramon's own voice. */
  aboutLabel: "About me",
  about:
    "I'm Ramon, a web designer and developer. Dcube is my studio — I build brands, websites and the content around them, from the first sketch to launch day. One person, one idea, carried all the way through.",
  contact: {
    headline: "Have a project in mind?",
    text: "Tell me what you're building.",
    action: "Get in touch",
    // Public email, once the domain exists. While empty, the mailto buttons and links are hidden.
    email: "" as string,
    // Add more profiles here, e.g. { label: "LinkedIn", href: "https://www.linkedin.com/in/…" }.
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ramon-bugariu-025b4b142/" },
      { label: "Behance", href: "https://www.behance.net/ramonbugariu" },
      { label: "GitHub", href: "https://github.com/genesis99949" },
    ] as { label: string; href: string }[],
  },
} as const;
