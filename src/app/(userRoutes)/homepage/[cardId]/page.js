import { metaTags } from "@/app/Constants";
import React from "react";
import DashboardCards from "./DashboardCards";

const { homepage } = metaTags;

export const metadata = {
  ...homepage
};

export default async function Page({ params }) {
  const cardId = (await params).cardId;

  return <DashboardCards cardId={cardId} />;
}
