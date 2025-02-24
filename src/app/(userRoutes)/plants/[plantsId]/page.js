import React from "react";
import { metaTags } from "@/app/Constants";
import PlantDetails from "./PlantDetails";

const { plantDetails } = metaTags;

export const metadata = {
  ...plantDetails
};

export default async function Page({ params }) {
  const plantsId = (await params).plantsId;

  return <PlantDetails plantsId={plantsId} />;
}
