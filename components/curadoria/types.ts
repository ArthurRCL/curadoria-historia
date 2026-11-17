import type { HomeQuery } from "@/tina/__generated__/types";

/** Documento completo da página inicial, como devolvido pelo TinaCMS. */
export type HomeData = HomeQuery["home"];

type ListItem<T> = NonNullable<NonNullable<T> extends (infer U)[] ? U : never>;

export type HeaderData = NonNullable<HomeData["header"]>;
export type NavItem = ListItem<HeaderData["nav"]>;
export type ContextItem = ListItem<HomeData["context"]>;
export type VideoItem = ListItem<HomeData["videos"]>;
export type SynthesisData = NonNullable<HomeData["synthesis"]>;
export type ReferencesData = NonNullable<HomeData["references"]>;
export type SelectionCriteriaData = NonNullable<HomeData["selectionCriteria"]>;
export type CreditsData = NonNullable<HomeData["credits"]>;

