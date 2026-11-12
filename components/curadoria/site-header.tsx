"use client";
import { Menu, Play, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import type { HeaderData } from "./types";

/** Destaca no menu a seção visível na tela (apenas para links do tipo "#secao"). */
function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState<string>(hrefs[0] ?? "");
  const key = hrefs.join("|");

  useEffect(() => {
    const ids = hrefs.filter((h) => h.startsWith("#")).map((h) => h.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}

export function SiteHeader({ header }: { header: HeaderData }) {
  const [open, setOpen] = useState(false);
  const nav = (header.nav ?? []).filter(Boolean);
  const active = useActiveSection(nav.map((n) => n?.href ?? ""));

  return (
    <header className="sticky top-0 z-40 bg-wine-800 text-white shadow-md shadow-black/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        {/* Marca */}
        <a href="#inicio" className="flex shrink-0 items-center gap-3">
          <span className="grid h-9 w-11 place-items-center rounded-md bg-white">
            <Play aria-hidden className="h-4 w-4 fill-wine-800 text-wine-800" />
          </span>
          <span className="text-sm font-semibold leading-tight sm:text-[15px]">
            <span className="block" data-tina-field={tinaField(header, "siteName")}>
              {header.siteName}
            </span>
            <span className="block" data-tina-field={tinaField(header, "siteTagline")}>
              {header.siteTagline}
            </span>
          </span>
        </a>

        {/* Menu desktop */}
        <nav
          aria-label="Menu principal"
          className="hidden items-center gap-1 lg:flex"
          data-tina-field={tinaField(header, "nav")}
        >
          {nav.map((item, i) => {
            const isActive = item?.href === active;
            return (
              <a
                key={`${item?.href}-${i}`}
                href={item?.href ?? "#"}
                data-tina-field={tinaField(item!, "label")}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-3 py-2 text-[15px] transition-colors hover:text-gold ${
                  isActive
                    ? "font-semibold after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-white"
                    : "text-white/90"
                }`}
              >
                {item?.label}
              </a>
            );
          })}
          <a
            href="#videos"
            aria-label="Ir para os vídeos"
            className="ml-3 rounded-full p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </a>
        </nav>

        {/* Botão menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="rounded-md p-2 hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav aria-label="Menu principal" className="border-t border-white/10 bg-wine-900 lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {nav.map((item, i) => (
              <li key={`${item?.href}-m-${i}`}>
                <a
                  href={item?.href ?? "#"}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-3 text-base hover:bg-white/10 ${
                    item?.href === active ? "font-semibold text-gold" : ""
                  }`}
                >
                  {item?.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Hero({ header }: { header: HeaderData }) {
  return (
    <section
      id="inicio"
      className="relative isolate scroll-mt-16 overflow-hidden bg-wine-950"
      data-tina-field={tinaField(header, "backgroundImage")}
    >
      {header.backgroundImage && (
        <img
          src={header.backgroundImage}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}
      {/* Escurecimento para garantir a leitura do texto */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-wine-950/20"
      />

      <div className="mx-auto flex min-h-[320px] max-w-6xl items-stretch px-4 sm:px-6 md:min-h-[360px]">
        <div className="flex max-w-2xl flex-col justify-center py-14 md:py-16">
          <h1
            data-tina-field={tinaField(header, "title")}
            className="text-balance font-serif text-4xl font-bold leading-[1.12] text-white sm:text-5xl lg:text-[3.35rem]"
          >
            {header.title}
          </h1>
          {header.subtitle && (
            <p
              data-tina-field={tinaField(header, "subtitle")}
              className="mt-5 text-lg text-white/90 sm:text-xl"
            >
              {header.subtitle}
            </p>
          )}
          <span aria-hidden className="mt-6 block h-1 w-24 rounded-full bg-gold" />
        </div>

        {header.portrait && (
          <div
            className="relative ml-auto hidden w-[38%] max-w-md self-end md:block"
            data-tina-field={tinaField(header, "portrait")}
          >
            <img
              src={header.portrait}
              alt=""
              className="max-h-[360px] w-full object-cover object-top [mask-image:linear-gradient(to_right,transparent,black_25%)]"
            />
          </div>
        )}
      </div>
    </section>
  );
}

