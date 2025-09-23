import type { Metadata } from "next";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "Império Urbano - O Game",
  description: "Jogo no estilo banco imobiliário, ou monopólio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
