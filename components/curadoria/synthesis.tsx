"use client";
import { BookOpen, ChevronDown, Scale } from "lucide-react";
import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { ReferencesData, SynthesisData } from "./types";

export function Synthesis({ synthesis }: { synthesis: SynthesisData }) {
  const [open, setOpen] = useState(false);
  const label = synthesis.buttonLabel || "Acessar síntese";

  return (
    <section id="sintese" className="scroll-mt-16 px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-wine-900/15 bg-white/80 shadow-sm">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-8 md:p-8">
          {/* Ícone + divisória vertical */}
          <div className="flex items-center gap-8 md:self-stretch">
            <Scale aria-hidden className="h-12 w-12 shrink-0 text-wine-700" strokeWidth={1.5} />
            <span aria-hidden className="hidden w-px self-stretch bg-wine-900/20 md:block" />
          </div>

          <div className="flex-1">
            <h2
              data-tina-field={tinaField(synthesis, "title")}
              className="font-serif text-2xl font-bold text-wine-800"
            >
              {synthesis.title}
            </h2>
            {synthesis.summary && (
              <p
                data-tina-field={tinaField(synthesis, "summary")}
                className="mt-1.5 leading-relaxed text-neutral-700"
              >
                {synthesis.summary}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sintese-texto"
            data-tina-field={tinaField(synthesis, "buttonLabel")}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-md bg-wine-700 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-wine-800 md:self-center"
          >
            {open ? "Fechar síntese" : label}
            <ChevronDown
              aria-hidden
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Texto longo — expande/recolhe suavemente */}
        <div
          id="sintese-texto"
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div
              data-tina-field={tinaField(synthesis, "text")}
              className="prose prose-neutral max-w-none border-t border-wine-900/10 px-6 py-6 prose-headings:font-serif prose-headings:text-wine-900 prose-a:text-wine-700 md:px-8"
            >
              <TinaMarkdown content={synthesis.text} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function References({ references }: { references: ReferencesData }) {
  return (
    <section id="referencias" className="scroll-mt-16 bg-sand px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="flex items-center gap-3 font-serif text-xl font-bold text-wine-800">
          <BookOpen aria-hidden className="h-6 w-6 text-wine-700" strokeWidth={1.5} />
          <span data-tina-field={tinaField(references, "title")}>
            {references.title || "Referências"}
          </span>
        </h2>
        <div
          data-tina-field={tinaField(references, "text")}
          className="prose prose-sm prose-neutral mt-4 max-w-none prose-a:text-wine-700"
        >
          <TinaMarkdown content={references.text} />
        </div>
      </div>
    </section>
  );
}

