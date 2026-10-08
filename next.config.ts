import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out,
  // which can be hosted anywhere (Cloudflare, Vercel, GitHub Pages…).
  output: "export",
  // The default image optimizer needs a server; with a static export the
  // images are served as they are.
  images: { unoptimized: true },
};

export default nextConfig;
