import { metaTags } from "@/app/Constants";
import React from "react";
import Clients from "./Clients";
const { client } = metaTags;

export const metadata = {
  ...client
};

const Page = () => {
  return <Clients />;
};

export default Page;
