import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts/fonts';
import './globals.css';
import Header from '@/components/header';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: 'Império Urbano - O Game',
  description: 'Jogo no estilo banco imobiliário, ou monopólio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`antialiased ${fontVariables}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
