import type { Metadata } from "next";
import { I18nProvider } from "@/i18n/I18nProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "MateRooms - Türkiye's Verified Flatmate Platform",
  description: "Find trusted flatmates with verified identity and secure payments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-light text-dark">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
