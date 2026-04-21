import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MateRooms - Turkey's Verified Flatmate Platform",
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
        {children}
      </body>
    </html>
  );
}
