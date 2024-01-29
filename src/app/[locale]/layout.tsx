import "./globals.css";
import AuthProvider from "./auth-context";
import { ContextProvider } from "@/context/ContextStore";
import { NextIntlClientProvider } from "next-intl";
import { Nunito } from "next/font/google";
import React from "react";
import ReactQueryProvider from "./react-query-context";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { getTranslator } from "next-intl/server";
import { notFound } from "next/navigation";
import options from "@/app/api/auth/[...nextauth]/options";

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
  const session = await getServerSession(options);
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

        <ReactQueryProvider>
          <AuthProvider session={session}>
            <Toaster />
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ContextProvider>
                {children}
              </ContextProvider>
            </NextIntlClientProvider>
          </AuthProvider>
        </ReactQueryProvider>

      </body>
    </html>
  );
}
