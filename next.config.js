/** @type {import('next').NextConfig} */

const nextConfig = { compiler: { removeConsole: { exclude: ["error"] } } };
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

module.exports = withNextIntl(nextConfig);
