import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Junaid Tafader",
  description: "Software Engineer & Data Scientist based in New York City",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
