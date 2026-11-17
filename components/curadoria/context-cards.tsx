import { Clapperboard } from "lucide-react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ContextIcon } from "./icons";
import type { HomeData, SelectionCriteriaData } from "./types";

export function ContextCards({ home }: { home: HomeData }) {
  const items = (home.context ?? []).filter(Boolean);
  if (!items.length) return null;

  return (
    <section id="curadoria" className="scroll-mt-16 px-4 pt-10 sm:px-6">
      <div
        data-tina-field={tinaField(home, "context")}
        className="mx-auto flex max-w-6xl flex-col divide-y divide-wine-900/15 rounded-2xl bg-sand shadow-sm ring-1 ring-wine-900/10 md:flex-row md:divide-x md:divide-y-0"
      >
        {items.map((item, i) => (
          <article
            key={i}
            data-tina-field={tinaField(home, "context", i)}
            className="flex flex-1 gap-4 p-6 lg:p-7"
          >
            <span
              className="shrink-0 pt-0.5 text-wine-700"
              data-tina-field={tinaField(item!, "icon")}
            >
              <ContextIcon name={item?.icon} className="h-9 w-9" />
            </span>
            <div>
              <h2
                data-tina-field={tinaField(item!, "title")}
                className="text-[17px] font-bold leading-snug text-wine-900"
              >
                {item?.title}
              </h2>
              {item?.text && (
                <p
                  data-tina-field={tinaField(item, "text")}
                  className="mt-1.5 whitespace-pre-line text-justify text-sm leading-relaxed text-neutral-700 hyphens-auto"
                >
                  {item.text}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


/** Critérios de seleção dos vídeos — mesmo cartão bege dos blocos de contexto. */
export function SelectionCriteria({ criteria }: { criteria: SelectionCriteriaData }) {
  return (
    <section id="criterios" className="scroll-mt-16 px-4 pt-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 rounded-2xl bg-sand p-6 shadow-sm ring-1 ring-wine-900/10 md:flex-row md:items-center md:gap-8 lg:p-7">
        <div className="flex items-center gap-4 md:w-72 md:shrink-0 md:self-stretch">
          <Clapperboard aria-hidden className="h-9 w-9 shrink-0 text-wine-700" strokeWidth={1.5} />
          <h2
            data-tina-field={tinaField(criteria, "title")}
            className="font-serif text-2xl font-bold leading-tight text-wine-800"
          >
            {criteria.title || "Critérios de seleção dos vídeos"}
          </h2>
          <span aria-hidden className="ml-auto hidden w-px self-stretch bg-wine-900/15 md:block" />
        </div>

        <div
          data-tina-field={tinaField(criteria, "text")}
          className="prose prose-sm prose-neutral max-w-none flex-1 text-justify hyphens-auto marker:text-wine-700 prose-p:my-1.5 prose-li:my-1 prose-strong:text-wine-900 [&_ul]:list-[square]"
        >
          <TinaMarkdown content={criteria.text} />
        </div>
      </div>
    </section>
  );
}
