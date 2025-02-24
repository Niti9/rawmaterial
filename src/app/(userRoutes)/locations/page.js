import { metaTags } from "@/app/Constants";
import React from "react";
import Locations from "./Locations";
const { locations } = metaTags;

export const metadata = {
  ...locations
};

const Page = () => {
  return <Locations />;
};

export default Page;
