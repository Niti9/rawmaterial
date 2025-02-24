import { metaTags } from "@/app/Constants";
import React from "react";
import Request from "./Request";
const { request } = metaTags;

export const metadata = {
  ...request
};
const Page = () => {
  return <Request />;
};
export default Page;
