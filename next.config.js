const nextConfig = {
  async headers () {
    return [
      {
        // matching all API routes
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ]
      }
    ];
  },
  compiler: { removeConsole: { exclude: ["error"] } },
  // Disable SWC minification to fix Windows compatibility issues
  swcMinify: false,
};

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const config = {
  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/html",
    ],
  },
};

module.exports = withNextIntl({
  ...nextConfig,
  ...config,
});
