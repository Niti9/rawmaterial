import React from "react";
import { metaTags } from "@/app/Constants";
import ClientDetail from "./ClientDetail";

const { clientDetails } = metaTags;

export const metadata = {
  ...clientDetails
};

export default async function Page({ params }) {
  const clientId = (await params).clientId;

  return <ClientDetail clientId={clientId} />;
}
