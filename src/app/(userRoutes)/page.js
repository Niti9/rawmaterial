import React from "react";
// import ProjectSummary from "./ProjectSummary";
import { metaTags } from "@/app/Constants";
import HomePage from "./homepage/HomePage";

const { summary } = metaTags;

export const metadata = {
  ...summary
};

const Home = () => {
  return <HomePage />;
};

export default Home;
