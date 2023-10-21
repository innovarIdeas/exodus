import { getRequestConfig } from "next-intl/server";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export default getRequestConfig(async ({ locale }) => ({ messages: (await import(`./messages/${locale}.json`) as {default: Record<string, string>}).default }));
