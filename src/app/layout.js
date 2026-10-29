import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { profile } from "@/data/portfolio";
export const metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: "Somnath Chattaraj — Software Engineer",
    template: "%s | Somnath Chattaraj",
  },
  description:
    "Software engineer in Kolkata. Former Google software engineering intern, building thoughtful interfaces, reliable backend systems, and workflow automation. B.E. IT at Jadavpur University.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Somnath Chattaraj — Software Engineer",
    description:
      "Thoughtful interfaces. Dependable systems. Explore my experience at Google and independent engineering projects.",
    url: profile.site,
    siteName: profile.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Somnath Chattaraj — Thoughtful interfaces. Dependable systems.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somnath Chattaraj — Software Engineer",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
