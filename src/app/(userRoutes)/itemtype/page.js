import { metaTags } from "@/app/Constants";
import React from "react";
import ItemType from "./ItemType";
const { items } = metaTags;

export const metadata = {
  ...items
};

const Page = () => {
  return <ItemType />;
};

export default Page;
