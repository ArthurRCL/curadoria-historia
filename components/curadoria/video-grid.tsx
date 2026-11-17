"use client";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { HomeData, VideoItem } from "./types";
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from "./youtube";

/* --------------------------------- Grade --------------------------------- */

export function VideoGrid({ home }: { home: HomeData }) {
  const videos = (home.videos ?? []).filter(Boolean) as VideoItem[];
  const [selected, setSelected] = useState<number | null>(null);
  const buttonLabel = home.videoButtonLabel || "Ver análise";

  // Lê o vídeo pelo índice para que o modal reflita edições em tempo real
  const current = selected !== null ? videos[selected] : null;

  return (
    <section id="videos" className="scroll-mt-16 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2
          data-tina-field={tinaField(home, "videosTitle")}
          className="font-serif text-3xl font-bold text-wine-800"
        >
          {home.videosTitle || "Os vídeos selecionados"}
        </h2>
        <span aria-hidden className="mt-3 block h-1 w-20 rounded-full bg-gold" />

        <ul
          data-tina-field={tinaField(home, "videos")}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {videos.map((video, i) => (
            <li key={i} data-tina-field={tinaField(home, "videos", i)}>
              <VideoCard
                video={video}
                index={i}
                buttonLabel={buttonLabel}
                buttonField={tinaField(home, "videoButtonLabel")}
                onOpen={() => setSelected(i)}
              />
            </li>
          ))}
        </ul>
      </div>

      {current && (
        <VideoAnalysisDialog video={current} index={selected!} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

/* --------------------------------- Card ---------------------------------- */

function VideoCard({
  video,
  index,
  buttonLabel,
  buttonField,
  onOpen,
}: {
  video: VideoItem;
  index: number;
  buttonLabel: string;
  buttonField: string;
  onOpen: () => void;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Abrir análise: ${video.title ?? ""}`}
        className="group relative block aspect-video w-full overflow-hidden bg-wine-900"
        data-tina-field={tinaField(video, "cover")}
      >
        <Thumbnail video={video} />
        <PlayBadge />
        {video.subtitle && (
          <span
            data-tina-field={tinaField(video, "subtitle")}
            className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white"
          >
            {video.subtitle}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-4">
        <h3
          data-tina-field={tinaField(video, "title")}
          className="text-[15px] font-semibold leading-snug text-neutral-900"
        >
          {index + 1}. {video.title}
        </h3>
        <div className="mt-auto flex justify-center pt-4">
          <button
            type="button"
            onClick={onOpen}
            data-tina-field={buttonField}
            className="rounded-md bg-wine-700 px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-wine-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-700"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

function Thumbnail({ video }: { video: VideoItem }) {
  const src = video.cover || getYouTubeThumbnail(video.youtubeUrl);

  if (src) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  // Capa provisória enquanto não há imagem nem link do YouTube
  return (
    <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-wine-700 via-wine-900 to-black p-4 text-center font-serif text-lg font-bold uppercase leading-tight text-white/90">
      {video.title}
    </span>
  );
}

function PlayBadge() {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-1/2 grid h-8 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-[#FF0000] shadow-lg transition-transform group-hover:scale-110"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

/* ------------------------------ Modal análise ----------------------------- */

function VideoAnalysisDialog({
  video,
  index,
  onClose,
}: {
  video: VideoItem;
  index: number;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const embed = getYouTubeEmbedUrl(video.youtubeUrl);
  const cover = video.cover || getYouTubeThumbnail(video.youtubeUrl);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-dialog-title"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="aspect-video w-full bg-black" data-tina-field={tinaField(video, "youtubeUrl")}>
          {embed ? (
            <iframe
              src={embed}
              title={video.title ?? "Vídeo"}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : cover ? (
            <img src={cover} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-sm text-white/70">
              Adicione o link do YouTube para exibir o vídeo aqui.
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          {video.subtitle && (
            <p className="text-sm font-medium uppercase tracking-wide text-wine-600">
              Vídeo {index + 1} · {video.subtitle}
            </p>
          )}
          <h3
            id="video-dialog-title"
            data-tina-field={tinaField(video, "title")}
            className="mt-1 font-serif text-2xl font-bold text-wine-900"
          >
            {video.title}
          </h3>
          <span aria-hidden className="mt-3 block h-1 w-16 rounded-full bg-gold" />

          <div
            data-tina-field={tinaField(video, "analysis")}
            className="prose prose-neutral mt-6 max-w-none text-justify hyphens-auto prose-headings:font-serif prose-headings:text-wine-900 prose-a:text-wine-700"
          >
            <TinaMarkdown content={video.analysis} />
          </div>
        </div>
      </div>
    </div>
  );
}

