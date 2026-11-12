"use client";
import { useTina } from "tinacms/dist/react";
import type { HomeQuery, HomeQueryVariables } from "@/tina/__generated__/types";
import { ContextCards } from "./context-cards";
import { Hero, SiteHeader } from "./site-header";
import { References, Synthesis } from "./synthesis";
import { VideoGrid } from "./video-grid";

export interface HomeClientProps {
  data: HomeQuery;
  query: string;
  variables: HomeQueryVariables;
}

/**
 * Página inicial da curadoria.
 * O hook useTina recebe os dados do servidor e, quando o painel do Tina
 * (/admin) está aberto, passa a devolver o conteúdo editado em tempo real.
 * Os atributos data-tina-field (gerados por tinaField) tornam cada texto,
 * imagem e vídeo clicável para edição visual.
 */
export default function HomeClient(props: HomeClientProps) {
  const { data } = useTina(props);
  const home = data.home;

  return (
    <div className="min-h-screen bg-paper text-neutral-900">
      {home.header && <SiteHeader header={home.header} />}
      <main>
        {home.header && <Hero header={home.header} />}
        <ContextCards home={home} />
        <VideoGrid home={home} />
        {home.synthesis && <Synthesis synthesis={home.synthesis} />}
        {home.references && <References references={home.references} />}
      </main>
      <footer className="bg-wine-900 px-4 py-6 text-center text-sm text-white/80 sm:px-6">
        {home.header?.siteName}
        {home.header?.siteTagline ? ` · ${home.header.siteTagline}` : ""} — © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

