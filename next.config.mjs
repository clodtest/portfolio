/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local SVG placeholders stand in for Higgsfield-generated photography
    // (see public/images/HIGGSFIELD_PROMPTS.md). Safe to remove once all
    // placeholders are replaced with .jpg assets.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
