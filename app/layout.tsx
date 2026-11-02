import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://idees-utiles-emmanuel.fayeemmanuel08alt.chatgpt.site"),
  title: "Et si vos journées devenaient plus simples ?",
  description: "Au travail, à la maison ou ailleurs : racontez-moi ce qui vous complique la vie. Votre avis compte, et cela prend 2 min.",
  openGraph: {
    title: "Et si vos journées devenaient plus simples ?",
    description: "Racontez-moi ce qui vous complique la vie. Votre avis compte.",
    type: "website",
    images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "Et si vos journées devenaient plus simples ?" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
