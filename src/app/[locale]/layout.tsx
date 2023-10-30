import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Nunito } from "next/font/google";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { getTranslator } from "next-intl/server";
import { notFound } from "next/navigation";

const nunito = Nunito({ subsets: ["latin"] });

export default async function RootLayout ({
  params,
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  const { locale } = params;
  const t = await getTranslator("en", "index");
  let messages: Record<string, string>;

  try {
    messages = (
      (await import(`../../../messages/${locale}.json`)) as {
        default: Record<string, string>;
      }
    ).default;
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </head>
      <body className={`${nunito}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
