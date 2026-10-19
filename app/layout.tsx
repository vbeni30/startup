import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://2ndform.vercel.app"),
  title: "Second Form — A better next chapter for your website",
  description:
    "Thoughtful website redesigns for businesses ready for their next chapter. Explore a before-and-after concept from Second Form.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Second Form",
    title: "Second Form — A better next chapter for your website",
    description: "Thoughtful website redesigns for businesses ready for their next chapter.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Second Form — A better next chapter for your website",
    description: "Thoughtful website redesigns for businesses ready for their next chapter.",
    images: ["/opengraph-image"],
  },
  robots: { index: false, follow: false },
  icons: { icon: { url: "/assets/favicon.svg", type: "image/svg+xml" } },
};

export const viewport: Viewport = {
  themeColor: "#f4f2eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/dm-sans-regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
