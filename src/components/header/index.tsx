"use client"

import { useTheme } from "next-themes";
import Logo from './logo/Logo';
import Nav from './nav/Nav';
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Evita renderizar diferente no server e no client
    return null;
  }


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-400 transition-colors duration-300 ease-in
        ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="container flex items-center mx-auto max-w-5xl px-4 h-20 justify-between">
        <Logo />
        <div className="flex items-center gap-14">
          <Nav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}