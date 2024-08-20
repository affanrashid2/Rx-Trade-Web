/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "rxtrade.api.unavailable.today",
        // hostname: "2e49-202-47-34-141.ngrok-free.app",
        hostname: "s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add a new rule to handle video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/videos/",
          outputPath: "static/videos/",
          name: "[name].[hash].[ext]",
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
