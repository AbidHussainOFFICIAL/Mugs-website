import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
    // i.postimg.cc has known SSL certificate reliability issues (noted in
    // the project handoff), and Next's built-in image optimizer fetches
    // and re-encodes remote images on the server — so a cert hiccup there
    // becomes a broken image on the site. `unoptimized: true` serves the
    // original URLs directly instead, trading responsive/resized images
    // for reliability until the catalog moves to real image hosting.
    unoptimized: true,
  },
};

export default nextConfig;