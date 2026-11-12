import { defineConfig } from "tinacms";
import type { Collection } from "tinacms";
import nextConfig from '../next.config'

import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";
import Tag from "./collection/tag";

/* -------------------------------------------------------------------------- */
/*  PÁGINA INICIAL — Curadoria Digital                                        */
/*  Documento único (content/home/index.json) editado via Visual Editing.     */
/* -------------------------------------------------------------------------- */

const ICON_OPTIONS = [
  { value: "alvo", label: "🎯 Alvo (problema / foco)" },
  { value: "camadas", label: "📚 Camadas (objetivo)" },
  { value: "pessoas", label: "👥 Pessoas (critérios / público)" },
  { value: "livro", label: "📖 Livro" },
  { value: "lupa", label: "🔍 Lupa" },
  { value: "balanca", label: "⚖️ Balança" },
  { value: "monumento", label: "🏛️ Monumento" },
  { value: "pergaminho", label: "📜 Pergaminho" },
];

const isYouTubeUrl = (value?: string) =>
  !value ||
  /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/.+/i.test(
    value.trim()
  );

const Home: Collection = {
  name: "home",
  label: "Página Inicial",
  path: "content/home",
  format: "json",
  ui: {
    // Abre a página "/" no modo de edição visual
    router: () => "/",
    // Documento único: a usuária não pode criar nem apagar a home por engano
    allowedActions: { create: false, delete: false },
  },
  fields: [
    /* ------------------------------ CABEÇALHO ----------------------------- */
    {
      type: "object",
      name: "header",
      label: "Cabeçalho (banner superior)",
      fields: [
        {
          type: "string",
          name: "siteName",
          label: "Nome do site — linha 1",
          description: "Ex.: Curadoria Digital",
        },
        {
          type: "string",
          name: "siteTagline",
          label: "Nome do site — linha 2",
          description: "Ex.: Débora Aladim",
        },
        {
          type: "object",
          name: "nav",
          label: "Menu superior",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.label || "Novo item de menu" }),
            defaultItem: { label: "Novo item", href: "#inicio" },
          },
          fields: [
            { type: "string", name: "label", label: "Texto do menu" },
            {
              type: "string",
              name: "href",
              label: "Destino",
              description:
                "Seções da página: #inicio, #curadoria, #videos, #sintese, #referencias — ou um endereço completo (https://...).",
            },
          ],
        },
        {
          type: "string",
          name: "title",
          label: "Título principal",
          isTitle: true,
          required: true,
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "subtitle",
          label: "Subtítulo",
          ui: { component: "textarea" },
        },
        {
          type: "image",
          name: "backgroundImage",
          label: "Imagem de fundo do banner",
          description: "Imagem horizontal (ex.: biblioteca). Ela recebe um escurecimento automático.",
        },
        {
          type: "image",
          name: "portrait",
          label: "Foto em destaque (lado direito)",
          description: "Opcional. Ideal: foto com fundo neutro, formato vertical ou quadrado.",
        },
      ],
    },

    /* ------------------------------ CONTEXTO ------------------------------ */
    {
      type: "object",
      name: "context",
      label: "Contexto da pesquisa (cartões)",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || "Novo cartão" }),
        defaultItem: { icon: "alvo", title: "Novo bloco", text: "Escreva aqui o texto." },
      },
      fields: [
        {
          type: "string",
          name: "icon",
          label: "Ícone",
          options: ICON_OPTIONS,
        },
        { type: "string", name: "title", label: "Título", required: true },
        {
          type: "string",
          name: "text",
          label: "Texto",
          ui: { component: "textarea" },
        },
      ],
    },

    /* -------------------------------- VÍDEOS ------------------------------ */
    {
      type: "string",
      name: "videosTitle",
      label: "Título da seção de vídeos",
      description: "Ex.: Os vídeos selecionados",
    },
    {
      type: "string",
      name: "videoButtonLabel",
      label: "Texto do botão dos vídeos",
      description: "Ex.: Ver análise",
    },
    {
      type: "object",
      name: "videos",
      label: "Vídeos da curadoria",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || "Novo vídeo" }),
        defaultItem: { title: "Novo vídeo", subtitle: "00:00" },
      },
      fields: [
        {
          type: "image",
          name: "cover",
          label: "Imagem de capa",
          description:
            "Opcional: se ficar vazia, a capa oficial do YouTube é usada automaticamente.",
        },
        { type: "string", name: "title", label: "Título do vídeo", required: true },
        {
          type: "string",
          name: "subtitle",
          label: "Subtítulo (ex.: duração)",
          description: "Aparece no canto da capa. Ex.: 18:45",
        },
        {
          type: "string",
          name: "youtubeUrl",
          label: "Link do YouTube",
          description: "Cole o endereço do vídeo. Ex.: https://www.youtube.com/watch?v=XXXXXXXXXXX",
          ui: {
            validate: (value: string) =>
              isYouTubeUrl(value) ? undefined : "Cole um link válido do YouTube.",
          },
        },
        {
          type: "rich-text",
          name: "analysis",
          label: "Texto da análise",
        },
      ],
    },

    /* ------------------------------- SÍNTESE ------------------------------ */
    {
      type: "object",
      name: "synthesis",
      label: "Síntese comparativa",
      fields: [
        { type: "string", name: "title", label: "Título" },
        {
          type: "string",
          name: "summary",
          label: "Resumo / pergunta (aparece no quadro)",
          ui: { component: "textarea" },
        },
        {
          type: "rich-text",
          name: "text",
          label: "Texto completo da síntese",
          description: "Exibido quando o visitante clica no botão do quadro.",
        },
        {
          type: "string",
          name: "buttonLabel",
          label: "Texto do botão",
          description: "Ex.: Acessar síntese",
        },
      ],
    },

    /* ----------------------------- REFERÊNCIAS ---------------------------- */
    {
      type: "object",
      name: "references",
      label: "Referências",
      fields: [
        { type: "string", name: "title", label: "Título" },
        { type: "rich-text", name: "text", label: "Lista de referências" },
      ],
    },
  ],
};

const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.WORKERS_CI_BRANCH! || // Cloudflare Workers Builds branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
    basePath: nextConfig.basePath?.replace(/^\//, '') || '', // The base path of the app (could be /blog)
  },
  schema: {
    // "Home" primeiro: é a primeira coleção que a usuária vê no painel
    collections: [Home, Page, Post, Author, Tag, Global],
  },
});

export default config;
