import React from "react";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Merriweather, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

// Serifada elegante para os títulos (classe Tailwind: font-serif)
const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Curadoria Digital | Débora Aladim",
  description: "História para o público ou História Pública? Uma curadoria digital comentada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={cn(fontSans.variable, nunito.variable, lato.variable, merriweather.variable)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
