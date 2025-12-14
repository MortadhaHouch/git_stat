import { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      }
    ],
    // Add this to disable image optimization for these domains if needed
    // or if you're still having issues
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // If you're still seeing IP resolution issues, you can disable it
    // for specific domains
    domains: ['i.postimg.cc', 'github.com', 'avatars.githubusercontent.com', 'assets.aceternity.com'],
  },
  // Add this to disable strict IP resolution
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'your-production-domain.com'],
    },
  },
  // Add this to handle IP resolution issues
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
    ]
  }
}
export default nextConfig;