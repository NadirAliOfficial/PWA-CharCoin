const nextConfig = {
  images: {
    unoptimized: true, 
  },  
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during `next build`
  },  
  reactStrictMode: false,
  trailingSlash: true,
  output: 'export',
  webpack: (config: { resolve: { fallback: { fs: boolean; net: boolean; tls: boolean; }; }; }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;
