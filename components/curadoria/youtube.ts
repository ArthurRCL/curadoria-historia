/**
 * Extrai o ID (11 caracteres) de qualquer formato comum de link do YouTube:
 * youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, /shorts/ID, /live/ID
 */
export function getYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /[?&]v=([\w-]{11})/,
    /youtube(?:-nocookie)?\.com\/(?:embed|shorts|live|v)\/([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/** Capa automática do YouTube, usada quando a usuária não envia uma imagem própria. */
export function getYouTubeThumbnail(url?: string | null): string | null {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

/** URL de incorporação (modo de privacidade aprimorada). */
export function getYouTubeEmbedUrl(url?: string | null, autoplay = false): string | null {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0${autoplay ? "&autoplay=1" : ""}`;
}

