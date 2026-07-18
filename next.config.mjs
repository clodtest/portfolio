/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Higgsfield-generated photography is served straight from its CDN for
    // now. TODO: download these into /public/images (see
    // public/images/HIGGSFIELD_PROMPTS.md for the asset list) and drop this
    // remote pattern once the files are vendored into the repo.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd8j0ntlcm91z4.cloudfront.net',
      },
    ],
    // Remaining listing images are local SVG placeholders. Safe to remove
    // once all placeholders are replaced with generated photos.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
