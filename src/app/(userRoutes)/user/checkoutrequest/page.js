import { metaTags } from "@/app/Constants";
import React from "react";
import CheckoutRequest from "./CheckoutRequest";

const { checkoutrequest } = metaTags;

export const metadata = {
  ...checkoutrequest
};

const Page = () => {
  return <CheckoutRequest />;
};

export default Page;
