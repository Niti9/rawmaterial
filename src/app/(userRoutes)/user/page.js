import { metaTags } from "@/app/Constants";
import React from "react";
import User from "./User";
const { user } = metaTags;

export const metadata = {
  ...user
};

const Page = () => {
  return <User />;
};

export default Page;
