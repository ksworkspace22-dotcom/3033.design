import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3033 — Design × Robotics",
  description:
    "A small hardware & robotics studio in Bengaluru and Ahmedabad. Sketch to field, in months not quarters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
