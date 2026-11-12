import {
  BookOpen,
  Landmark,
  Layers,
  type LucideIcon,
  Scale,
  ScrollText,
  Search,
  Target,
  Users,
} from "lucide-react";

/** Mapeia o valor salvo no Tina (campo "Ícone") para o ícone vetorial. */
const ICONS: Record<string, LucideIcon> = {
  alvo: Target,
  camadas: Layers,
  pessoas: Users,
  livro: BookOpen,
  lupa: Search,
  balanca: Scale,
  monumento: Landmark,
  pergaminho: ScrollText,
};

export function ContextIcon({ name, className }: { name?: string | null; className?: string }) {
  const Icon = (name && ICONS[name]) || Target;
  return <Icon aria-hidden className={className} strokeWidth={1.5} />;
}

