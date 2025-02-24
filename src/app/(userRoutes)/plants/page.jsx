import { metaTags } from "@/app/Constants";
import React from "react";
import Plants from "./Plants";

const { plants } = metaTags;

export const metadata = {
  ...plants
};

const Page = () => {
  return <Plants />;
};

export default Page;
