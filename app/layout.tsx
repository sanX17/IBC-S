import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/providers/lenis-provider";

const flexing = localFont({
  src: "../public/fonts/flexing-bold.otf",
  variable: "--font-flexing",
  weight: "400",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Indian Biotope Championship",
  description:
    "Indian Biotope Championship - A platform for nature-inspired aquascaping competition.",
  metadataBase: new URL("https://indian-biotope-championship.vercel.app"),
  openGraph: {
    title: "Indian Biotope Championship",
    description:
      "Indian Biotope Championship - A platform for nature-inspired aquascaping competition.",
    url: "/",
    siteName: "IBC",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "IBC Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/icon1.png",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ ["--font-sans" as string]: "Arial, Helvetica, sans-serif" }}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="IBC" />

        {/* PNG */}
        <link rel="icon" type="image/png" sizes="16x16" href="/icon1.png" />

        {/* SVG */}
        <link rel="icon" type="image/svg+xml" href="/icon0.svg" />
      </head>
      <body className={`${flexing.variable} antialiased scrollbar`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
