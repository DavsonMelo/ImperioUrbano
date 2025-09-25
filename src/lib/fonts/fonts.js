import { Bebas_Neue, Anton, Orbitron, Rajdhani, Press_Start_2P } from "next/font/google";

// Configuração da fonte Bokor
export const bebasFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

// Configuração da fonte Inter
export const antonFont = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

// Configuração da fonte Roboto
export const orbitronFont = Orbitron({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-orbitron",
});

// Configuração da fonte Poppins
export const rajdhaniFont = Rajdhani({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rajdhani",
});

// Configuração da fonte Open Sans
export const pressStartFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
});

// Combine todas as variáveis de fonte
export const fontVariables = `
  ${bebasFont.variable} 
  ${antonFont.variable} 
  ${orbitronFont.variable} 
  ${rajdhaniFont.variable} 
  ${pressStartFont.variable}
`.trim();