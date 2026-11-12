import React from "react";
import client from "@/tina/__generated__/client";
import HomeClient from "@/components/curadoria/home-client";

export const revalidate = 300;

export default async function Home() {
  // Busca o documento único da coleção "home" (content/home/index.json)
  const res = await client.queries.home({ relativePath: "index.json" });

  // data + query + variables são repassados ao client component,
  // que usa o hook useTina para habilitar a edição visual em tempo real.
  return <HomeClient data={res.data} query={res.query} variables={res.variables} />;
}
