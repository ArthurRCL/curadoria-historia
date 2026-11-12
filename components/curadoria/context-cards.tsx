import { tinaField } from "tinacms/dist/react";
import { ContextIcon } from "./icons";
import type { HomeData } from "./types";

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
                  className="mt-1.5 text-sm leading-relaxed text-neutral-700"
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

