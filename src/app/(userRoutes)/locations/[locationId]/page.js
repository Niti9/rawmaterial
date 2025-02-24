import React from "react";
import { metaTags } from "@/app/Constants";
import LocationDetails from "./LocationDetails";

const { locationDetails } = metaTags;

export const metadata = {
  ...locationDetails
};

export default async function Page({ params }) {
  const locationId = (await params).locationId;

  return <LocationDetails locationId={locationId} />;
}
