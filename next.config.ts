import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone with server.js and only the traced dependencies,
  // which is what the production image runs. See apps/website/Dockerfile for
  // the static/ and public/ copies the trace deliberately leaves out.
  output: "standalone",
};

export default nextConfig;
